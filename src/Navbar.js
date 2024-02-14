import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { sepolia, goerli, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient for WAGMIv2
const queryClient = new QueryClient();

// @ts-expect-error 1. Get projectId
const projectId = process.env.REACT_APP_PROJECT_ID;
console.log(process.env.REACT_APP_PROJECT_ID);
if (!projectId) {
  throw new Error("REACT_PROJECT_ID is not set");
}

// 2. Create wagmiConfig
const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet, sepolia, goerli],
  projectId,
  metadata: {
    name: "Web3Modal React Example",
    description: "Web3Modal React Example",
    url: "",
    icons: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: "dark",
  themeVariables: {},
});

export default function Navbar() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {
          <nav className="navbar bg-black">
            <div className="container flex justify-between items-center">
              <div className="navbar-brand">
                <a
                  href="https://www.itublockchain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="navbar-item is-size-4 mb-0">ITU BLOCKCHAIN</h1>
                </a>
                <div id="navbarMenu" className="navbar-menu items-center">
                  <div className="navbar-start">
                    <a href="/" className="navbar-item">
                      Home
                    </a>
                    <a href="store" className="navbar-item">
                      Store
                    </a>
                    <a href="my-nfts" className="navbar-item">
                      My NFTs
                    </a>
                    <a href="mint-nft" className="navbar-item">
                      Mint NFT
                    </a>
                  </div>
                </div>
              </div>
              <w3m-button />
            </div>
          </nav>
        }
      </QueryClientProvider>
    </WagmiProvider>
  );
}
