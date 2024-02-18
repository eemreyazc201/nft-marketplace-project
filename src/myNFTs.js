// MyNFTs.js
import React from "react";
import { getMyNFTs } from "./frontend/Hooks/NFT_Marketplace";

const MyNFTs = () => {

  const data = getMyNFTs();

  return (
    <div>
      {data.map((collection) => (
          <div key={collection.collectionID}>
            <h2>{collection.collectionName}</h2>
            <p>{collection.collectionDescription}</p>
            <p>
              {collection.isCollectionListed && `Bundle Price: ${collection.bundlePrice}`}
            </p>
            <div>
              {collection.elements.map((element) => (
                <div key={element.tokenID}>
                  <h3>{element.NFTName}</h3>
                  <p>{element.NFTDescription}</p>
                  <p>
                    {element.isNFTListed && `Starting Price: ${element.startingPrice}`}
                  </p>
                  <p>
                    {element.highestBid !== 0 && `Highest Bid: ${element.highestBid}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
      ))}
    </div>
  );

};

export default MyNFTs;
