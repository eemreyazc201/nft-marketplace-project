import React, { useState, useRef } from "react";
import "./mint.css";

const Mint = () => {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleMintButtonClick = () => {
    console.log("Minting NFT with the following data:", {
      nftName,
      nftDescription,
      price,
      file,
    });

    setNftName("");
    setNftDescription("");
    setPrice("");
    setFile(null);

    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mint-container">
      {/* ... (navbar code) */}
      <section className="hero is-fullheight">
        <div className="container">
          <h2 className="mint-title">Mint Your NFT</h2>

          <div className="mint-form">
            <label htmlFor="nftName">NFT Name:</label>
            <input
              type="text"
              id="nftName"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />

            <label htmlFor="nftDescription">NFT Description:</label>
            <textarea
              id="nftDescription"
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
            />

            <label htmlFor="price">Price (ETH):</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="file">Upload File:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <button onClick={handleMintButtonClick} className="mint-button">
              Mint
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mint;
