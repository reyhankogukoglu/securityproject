# Blockchain Banking System

This project implements a secure blockchain-based banking system leveraging Ethereum and smart contracts to enhance security and transparency.
<br>
<br>

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed.

### Installation and Running the System

The system requires setting up the Hardhat environment, deploying the smart contracts, and starting the application. You will need to open three terminals for the different parts of the system.

#### Setting Up the Hardhat Environment

In the first terminal:

1. Navigate to the `hardhat` directory:

```
cd path-to-your/hardhat
```

2. Install the dependencies:

```
npm install
```

3. Compile the smart contracts:

```
npx hardhat compile
```

4. Start the local Ethereum node:

```
npx hardhat node
```

#### Deploying the Smart Contracts

In the second terminal, with the local node still running:

1. Navigate to the `hardhat` directory:

```
cd path-to-your/hardhat
```

2. Deploy the smart contracts to the local network:

```
npx hardhat run --network localhost scripts/deploy.js
```

#### Starting the Application

In the third terminal:

1. Navigate to the `your-app-name` directory:

```
cd path-to-your/your-app-name
```

2. Install the dependencies:

```
npm install
```

3. Start the application:

```
npm run start
```

The application should now be running and accessible through a web browser at `http://localhost:3000`.
