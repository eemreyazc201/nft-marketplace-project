import React from "react";
import "./App.css";
import '@rainbow-me/rainbowkit/styles.css'; 

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider, lightTheme, midnightTheme } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, zora, sepolia } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { getMyNFTs } from './hooks/NFT_Marketplace';

function App() {

  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName : "My RainbowKit App",
    projectId : process.env.REACT_APP_PROJECT_ID,
    chains : [ mainnet, polygon, optimism, arbitrum, base, zora, sepolia ],
    ssr : true
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <ConnectButton />
            <p>{JSON.stringify(getMyNFTs())}</p>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
