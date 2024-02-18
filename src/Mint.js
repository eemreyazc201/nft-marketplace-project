import React, { useState } from 'react';
import './mint.css';

const MintPage = () => {
  const [isSingleNFT, setIsSingleNFT] = useState(true);
  const [information, setInformation] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('Collection 1');

  const handleSwitchChange = () => {
    setIsSingleNFT((prev) => !prev);
    // Reset file input and price when switching between single NFT and collection
    setFile('');
    setPrice('');
    // Reset selected collection when switching to Single NFT
    setSelectedCollection('Collection 1');
  };

  const handleRemoveClick = () => {
    setInformation('');
    setFile('');
    setPrice('');
    setDescription('');
    setSelectedCollection('Collection 1');
  };

  const handleMintClick = () => {
    // Implement minting logic here
    console.log('Minting...');
  };

  return (
    <div className="mint-container">
      <header className="mint-header">
        <h1>Create a single NFT or a Collection!</h1>
        <div className="switch-container">
          <label className="switch-label">Single NFT</label>
          <label className="switch">
            <input type="checkbox" checked={isSingleNFT} onChange={handleSwitchChange} />
            <span className="slider round"></span>
          </label>
          <label className="switch-label">Collection</label>
        </div>
      </header>
      <div className="input-container">
        <label>Information:</label>
        <input type="text" value={information} onChange={(e) => setInformation(e.target.value)} />
        {isSingleNFT ? (
          <>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </>
        ) : (
          <>
            <label>Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            <label>Select Collection:</label>
            <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
              <option value="Collection 1">Collection 1</option>
              <option value="Collection 2">Collection 2</option>
              <option value="Collection 3">Collection 3</option>
              <option value="Collection 4">Collection 4</option>
            </select>
           
            <label>Choose File:</label>
            <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
            {/* Include the Collection Selection for Collection */}
           
          </>
        )}
      </div>
      <div className="button-container">
        <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
        <button className="mint-button" onClick={handleMintClick}>Mint</button>
      </div>
    </div>
  );
};

export default MintPage;
