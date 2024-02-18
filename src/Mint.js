import React, { useState, useEffect } from 'react';
import './mint.css';
import { getURI_fromIPFS } from './pinata' //Akif ekledi, karışıklık olmaması için isim ekliyorum.
import { getMyNFTs, createNFT, createCollection } from "./frontend/Hooks/NFT_Marketplace";

const MintPage = () => {
  const [information, setInformation] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');

  const handleRemoveClick = () => {
    setInformation('');
    setFile('');
    setPrice('');
    setDescription('');
    setSelectedCollection('');
  };

  const handleMintClick = () => {
    // Implement minting logic here
    console.log('Minting...');
  };

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myNFTsData = await getMyNFTs();
        setCollections(myNFTsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMintSingleNFTClick = async () => {
    // Implement minting logic for a single NFT here
    const tokenURI = await getURI_fromIPFS(file);
    await createNFT(tokenURI, information, description, selectedCollection);
  };

  const handleMintCollectionClick = async () => {
    // Implement minting logic for a collection here
    await createCollection(information, description);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mint-container">
      <div className="mint-section">
        <header className="mint-header">
          <h1>Mint a Single NFT</h1>
        </header>
        <div className="input-container">
          <label>Information:</label>
          <input type="text" value={information} onChange={(e) => setInformation(e.target.value)} />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>Choose File:</label>
          <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
        </div>
        <div className="button-container">
          <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
          <button className="mint-button" onClick={handleMintSingleNFTClick}>Mint Single NFT</button>
        </div>
      </div>

      <div className="mint-section">
        <header className="mint-header">
          <h1>Create a Collection</h1>
        </header>
        <div className="input-container">
          <label>Information:</label>
          <input type="text" value={information} onChange={(e) => setInformation(e.target.value)} />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="button-container">
          <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
          <button className="mint-button" onClick={handleMintCollectionClick}>Create Collection</button>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
