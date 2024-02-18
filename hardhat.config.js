require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",

  settings: {
    optimizer: {
      enabled: true,
      // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
      runs: 200,
    },
  },

  paths: {
    artifacts: "./src/backend/artifacts",
    cache: "./src/backend/cache",
    sources: "./src/backend/contracts",
  },

  defaultNetwork: "sepolia", // buraya sepolia gelecek

  namedAccounts: {
    // By default, it will take the first Hardhat account as the deployer  
    deployer: {
      default: 0
    }
  },

  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        enabled: true,
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  // configuration for harhdat-verify plugin
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // configuration for etherscan-verify from hardhat-deploy plugin
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
  sourcify: {
    enabled: false,
  },
};