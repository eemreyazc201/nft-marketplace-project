import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, zora, sepolia } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();
const projectId = process.env.REACT_APP_PROJECT_ID;

if (!projectId) {
  throw new Error("REACT_PROJECT_ID is not set");
}

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, zora, sepolia],
  ssr: true,
});

export default function Navbar() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={{
          lightMode: lightTheme({...lightTheme.accentColors.orange, overlayBlur: 'small'}),
          darkMode: midnightTheme({...midnightTheme.accentColors.orange, overlayBlur: 'small'}),
        }}>
          <nav style={{ backgroundColor: '#F0F0F0', borderBottom: '2px solid #FF9900', height: '50px', fontWeight: 'bolder' }} className="navbar">
            <div className="container flex justify-between items-center" style={{ alignItems: 'center', marginTop: '2px' }}>
              <div className="navbar-brand">
                <a
                  href="https://www.itublockchain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="navbar-item is-size-5 mb-0" style={{ color: '#FF9900' }}>ITU BLOCKCHAIN</h1>
                </a>
              </div>
              <div className="navbar-menu items-center">
                <div className="navbar-end" style={{ marginRight: '10px'}}>
                  <a href="/" className="navbar-item" style={{ color: '#FF9900', fontSize: '20px' }}>
                    Home
                  </a>
                  <a href="collections" className="navbar-item" style={{ color: '#FF9900', fontSize: '20px' }}>
                    Collections
                  </a>
                
                  <a href="mint-nft" className="navbar-item" style={{ color: '#FF9900', fontSize: '20px' }}>
                    Mint NFT
                  </a>
                </div>
              </div>
              <ConnectButton style={{ backgroundColor: '#FF9900', color: 'white' }} />
            </div>
          </nav>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
