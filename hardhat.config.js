require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = "dca69df7e07e190f291d8a03f903c701c987025e24c12015b0d27521cacecd6f";
const ALCHEMY_API_KEY = "nMv0zIx01zhL2MLPMFtybc3hrZPhLe2X";
const ETHERSCAN_API_KEY = "AGA9WFB74T2D84V8QG6GK43HD797SUQ3H7";

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
    artifacts: "./artifacts",
    caches: ".cache",
    sources: "./src/contracts/abc",
  },

  defaultNetwork: "localhost",

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
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        enabled: true,
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },

  // configuration for harhdat-verify plugin
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // configuration for etherscan-verify from hardhat-deploy plugin
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  },
  sourcify: {
    enabled: false,
  },
};