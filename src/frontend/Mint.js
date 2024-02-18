import React, { useState } from 'react';
import './Mint.css'; // Import your CSS file for Mint component styling
import { createNFT } from './Hooks/NFT_Marketplace';

const Mint = () => {
  const [isSingle, setIsSingle] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleSwitchChange = () => {
    setIsSingle(!isSingle);
    // Reset fields when switching between single and collection
    setTitle('');
    setDescription('');
    setPrice('');
    setPhotos([]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    // Handle single or multiple photo upload based on isSingle state
    const uploadedPhotos = Array.from(e.target.files);
    setPhotos(uploadedPhotos);
  };

  const handleRemove = () => {
    // Clear all fields and uploaded photos
    setTitle('');
    setDescription('');
    setPrice('');
    setPhotos([]);
  };

  const handleMint = () => {
    // Placeholder for minting logic
    console.log('Minting...');
  };

  return (
    <div>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
    <div className="mint-container">
      <h1>Create an NFT</h1>
      <h1>or a collecion</h1>
      </div>

      
      {/* Styled switch for choosing between single and collection */}
      <div className="switch-container">
        <span className="switch-labels">Single</span>
        <label className={`switch ${isSingle ? '' : 'active'}`} onClick={handleSwitchChange}>
          <span className="slider"></span>
        </label>
        <span className="switch-labels">Collection</span>
      </div>
      
      {/* Photo uploading section */}
      <div>
        <h2 className = "upload">Upload Photo(s)</h2>
        <input type="file" multiple={isSingle ? false : true} onChange={handlePhotoUpload} />
      </div>

      {/* Input sections for title, description, and price */}
      <div>
        <h2>NFT Details</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
      </div>

      {/* Buttons for Remove and Mint */}
      <div>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleMint}>Mint</button>
      </div>
    </div>
  );
};

export default Mint;
