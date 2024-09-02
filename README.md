# Procyon DeFi Liquidity Pool Application

This application allows users to interact with the Stellar blockchain to generate keypairs, fund accounts, create liquidity pools, and withdraw from these pools using the Stellar SDK.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Generating a Keypair](#generating-a-keypair)
  - [Funding an Account](#funding-an-account)
  - [Creating a Liquidity Pool](#creating-a-liquidity-pool)
  - [Withdrawing from a Liquidity Pool](#withdrawing-from-a-liquidity-pool)
- [Log Section](#log-section)
- [Proof of Transactions](#proof-of-transactions)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14.x or later)
- npm or yarn

## Installation

To set up the application locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/procyon-defi-liquidity-pool.git
   cd procyon-defi-liquidity-pool
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the Application:**

   To start the application locally:

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

Once the application is running, you can use the interface to interact with the Stellar blockchain. The following sections provide a step-by-step guide on how to use each feature.

### Generating a Keypair

1. Navigate to the Generate Keypair section.
2. Click on the "Generate Keypair" button.
3. This will generate a new Stellar keypair (public and private keys).
4. The public key will be displayed in the log section.

### Funding an Account

1. Ensure you have generated a keypair. If not, follow the [Generating a Keypair](#generating-a-keypair) steps.
2. Click on the "Fund Account" button.
3. This will fund the generated Stellar account using the Friendbot service.
4. A confirmation message will be displayed in the log section once the account is funded.

### Creating a Liquidity Pool

1. Ensure you have generated a keypair and funded the account. If not, follow the steps for [Generating a Keypair](#generating-a-keypair) and [Funding an Account](#funding-an-account).
2. Enter the Asset Name, Token A Amount, and Token B Amount in the respective fields.
3. The asset name should be the one you wish to trade with.
4. Token amounts are the respective amounts you want to deposit into the liquidity pool.
5. Click on the "Create Liquidity Pool" button.
6. This will create a liquidity pool on the Stellar blockchain.
7. A transaction link will be provided in the log section to view the details on Stellar Expert.

### Withdrawing from a Liquidity Pool

1. Ensure you have generated a keypair, funded the account, and created a liquidity pool. If not, follow the steps for [Generating a Keypair](#generating-a-keypair), [Funding an Account](#funding-an-account), and [Creating a Liquidity Pool](#creating-a-liquidity-pool).
2. Enter the Withdraw Amount in the respective field.
3. This amount indicates how much you want to withdraw from the liquidity pool.
4. Click on the "Withdraw from Pool" button.
5. This will withdraw the specified amount from the liquidity pool.
6. A transaction link will be provided in the log section to view the details on Stellar Expert.

## Log Section

The log section at the bottom of the interface provides real-time updates on the operations performed, such as:

- Keypair generation
- Account funding
- Liquidity pool creation
- Withdrawals

This section will help you track the progress of your transactions and operations.

## Proof of Transactions

### Liquidity Pool Creation

- Transaction Hash: `2276d262c6720fc86f831f32266f9a6273fc6f4244a644491808be9403689d02`

  Preview: [Liquidity Pool Creation](https://stellar.expert/explorer/public/tx/2276d262c6720fc86f831f32266f9a6273fc6f4244a644491808be9403689d02)

### Withdrawal from Liquidity Pool

- Transaction Hash: `231ae728ec565ab2b7017b29b515baa8f81456140600d9433cd6243901a68aeb`

  Preview: [Withdrawal from Liquidity Pool](https://stellar.expert/explorer/public/tx/231ae728ec565ab2b7017b29b515baa8f81456140600d9433cd6243901a68aeb)

## Troubleshooting

- **Keypair Not Generated:** Ensure you click on the "Generate Keypair" button before attempting to fund an account or create a liquidity pool.
- **Transaction Failed:** If a transaction fails, check the log section for detailed error messages. Ensure all required fields are filled correctly.
- **Connection Issues:** Make sure your internet connection is stable. If the server is down, you may need to retry later.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
# Procyon-DeFi-Liquidity
