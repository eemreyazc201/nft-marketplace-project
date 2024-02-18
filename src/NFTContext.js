// NFTContext.js
import { createContext, useContext, useState } from "react";

const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
  const [mintedNFT, setMintedNFT] = useState(null);

  const setNewMintedNFT = (nftData) => {
    setMintedNFT(nftData);
  };

  return (
    <NFTContext.Provider value={{ mintedNFT, setNewMintedNFT }}>
      {children}
    </NFTContext.Provider>
  );
};

export const useNFTContext = () => {
  return useContext(NFTContext);
};
