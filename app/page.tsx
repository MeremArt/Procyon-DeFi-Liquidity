"use client";
import React, { useState } from "react";
import { Container, CircularProgress, Link, Divider } from "@mui/material";
import {
  Keypair,
  SorobanRpc,
  TransactionBuilder,
  Asset,
  Operation,
  LiquidityPoolAsset,
  getLiquidityPoolId,
  BASE_FEE,
  Networks,
} from "@stellar/stellar-sdk";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");

const App: React.FC = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [log, setLog] = useState<string>("");
  const [liquidityPoolId, setLiquidityPoolId] = useState<string>("");
  const [assetName, setAssetName] = useState<string>("");
  const [tokenAAmount, setTokenAAmount] = useState<string>("");
  const [tokenBAmount, setTokenBAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [loading, setLoading] = useState({
    generateKeypair: false,
    fundAccount: false,
    createLiquidityPool: false,
    withdrawFromPool: false,
  });

  const addLog = (message: string) => {
    setLog((prevLog) => prevLog + message + "\n");
  };

  const generateKeypair = () => {
    setLoading((prev) => ({ ...prev, generateKeypair: true }));
    const newKeypair = Keypair.random();
    setKeypair(newKeypair);
    addLog(`Generated new keypair. Public key: ${newKeypair.publicKey()}`);
    setLoading((prev) => ({ ...prev, generateKeypair: false }));
  };

  const fundAccount = async () => {
    if (!keypair) {
      addLog("Please generate a keypair first.");
      return;
    }

    setLoading((prev) => ({ ...prev, fundAccount: true }));
    const friendbotUrl = `https://friendbot.stellar.org?addr=${keypair.publicKey()}`;
    try {
      const response = await fetch(friendbotUrl);
      if (response.ok) {
        addLog(`Account ${keypair.publicKey()} successfully funded.`);
      } else {
        addLog(`Something went wrong funding account: ${keypair.publicKey()}.`);
      }
    } catch (error: any) {
      addLog(`Error funding account ${keypair.publicKey()}: ${error.message}`);
    }
    setLoading((prev) => ({ ...prev, fundAccount: false }));
  };

  const createLiquidityPool = async () => {
    if (!keypair || !assetName || !tokenAAmount || !tokenBAmount) {
      addLog(
        "Please ensure you have a keypair, asset name, and token amounts."
      );
      return;
    }

    setLoading((prev) => ({ ...prev, createLiquidityPool: true }));
    try {
      const account = await server.getAccount(keypair.publicKey());
      const customAsset = new Asset(assetName, keypair.publicKey());
      const lpAsset = new LiquidityPoolAsset(Asset.native(), customAsset, 30);
      const lpId = getLiquidityPoolId("constant_product", lpAsset).toString(
        "hex"
      );
      setLiquidityPoolId(lpId);

      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(Operation.changeTrust({ asset: lpAsset }))
        .addOperation(
          Operation.liquidityPoolDeposit({
            liquidityPoolId: lpId,
            maxAmountA: tokenAAmount,
            maxAmountB: tokenBAmount,
            minPrice: { n: 1, d: 1 },
            maxPrice: { n: 1, d: 1 },
          })
        )
        .setTimeout(30)
        .build();

      transaction.sign(keypair);
      const result = await server.sendTransaction(transaction);
      addLog(
        `Liquidity Pool created. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
    } catch (error: any) {
      addLog(`Error creating Liquidity Pool: ${error.message}`);
    }
    setLoading((prev) => ({ ...prev, createLiquidityPool: false }));
  };

  const withdrawFromPool = async () => {
    if (!keypair || !liquidityPoolId || !withdrawAmount) {
      addLog(
        "Please ensure you have a keypair, liquidity pool ID, and withdrawal amount."
      );
      return;
    }

    setLoading((prev) => ({ ...prev, withdrawFromPool: true }));
    try {
      const account = await server.getAccount(keypair.publicKey());
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.liquidityPoolWithdraw({
            liquidityPoolId: liquidityPoolId,
            amount: withdrawAmount,
            minAmountA: "0",
            minAmountB: "0",
          })
        )
        .setTimeout(30)
        .build();

      transaction.sign(keypair);
      const result = await server.sendTransaction(transaction);
      addLog(
        `Withdrawal successful. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`
      );
    } catch (error: any) {
      addLog(`Error withdrawing from Liquidity Pool: ${error.message}`);
    }
    setLoading((prev) => ({ ...prev, withdrawFromPool: false }));
  };

  return (
    <div className="min-h-screen bg-[#252A34] flex flex-col justify-center items-center p-4">
      <header className="bg-[#08D9D6] w-58 rounded-lg text-center py-4 px-4">
        <h1 className="text-[#252A34] font-bold text-lg">
          Procyon DeFi Liquidity Pool
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-6xl">
        <div className=" p-4 rounded-lg border-4 border-[#08D9D6] ">
          <button
            className="bg-[#14FFEC] hover:bg-teal-800 mt-8 text-white w-full py-2 rounded-lg"
            onClick={generateKeypair}
            disabled={loading.generateKeypair}
          >
            {loading.generateKeypair ? (
              <CircularProgress size={24} />
            ) : (
              "Generate Keypair"
            )}
          </button>

          <button
            className="bg-[#00712D]  mt-8 mb-2 hover:bg-red-700 text-white w-full py-2 rounded-lg"
            onClick={fundAccount}
            disabled={loading.fundAccount}
          >
            {loading.fundAccount ? (
              <CircularProgress size={24} />
            ) : (
              "Fund Account"
            )}
          </button>
        </div>

        <div className="bg-[#FF6B6B] p-4 rounded-lg shadow-md">
          <h2 className="text-xs mb-4 text-black font-bold">
            Create Liquidity Pool
          </h2>
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded text-black"
            placeholder="Asset Name"
            onChange={(e) => setAssetName(e.target.value)}
          />
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded text-black"
            placeholder="Token A Amount"
            onChange={(e) => setTokenAAmount(e.target.value)}
          />
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded text-black"
            placeholder="Token B Amount"
            onChange={(e) => setTokenBAmount(e.target.value)}
          />
          <button
            className="btn text-white w-full py-2 rounded-lg"
            onClick={createLiquidityPool}
            disabled={loading.createLiquidityPool}
          >
            {loading.createLiquidityPool ? (
              <CircularProgress size={24} />
            ) : (
              "Create Liquidity Pool"
            )}
          </button>

          {liquidityPoolId && (
            <p className="mt-4 text-sm">Liquidity Pool ID: {liquidityPoolId}</p>
          )}
        </div>

        <div className="border-4 border-[#08D9D6] p-4 rounded-lg shadow-md">
          <h2 className="text-xs mb-4">Withdraw from Pool</h2>
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded text-black"
            placeholder="Withdrawal Amount"
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button
            className="bg-[#800000] hover:bg-blue-800 text-white w-full py-2 rounded-lg"
            onClick={withdrawFromPool}
            disabled={loading.withdrawFromPool}
          >
            {loading.withdrawFromPool ? (
              <CircularProgress size={24} />
            ) : (
              "Withdraw from Pool"
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#08D9D6] p-4 rounded-lg shadow-md w-full max-w-6xl mt-8">
        <h2 className="text-xl mb-4 text-black font-bold">Log</h2>
        <Divider />
        <pre className="mt-4 max-h-48 overflow-y-auto text-black">{log}</pre>
      </div>
    </div>
  );
};

export default App;
