// MyNFTs.js
import React, { useState, useEffect } from "react";
import { getMyNFTs } from "./frontend/Hooks/NFT_Marketplace";

const MyNFTs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myNFTsData = await getMyNFTs();
        setData(myNFTsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
