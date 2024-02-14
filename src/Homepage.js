import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="container mt-6">
      <h2 className="is-size-2 has-text-centered mb-4">Top Picks</h2>
      <div className="columns is-multiline is-centered">
        {/* NFT 1 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft2.png" alt="NFT 1" className="image" />
            <div className="info">
              <p className="nft-name">Snowy</p>
              <p className="price">Price: 0.2 ETH</p>
              <p className="highest-bid">Highest Bid 0.5 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>

        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft3.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">Village</p>
              <p className="price">Price: 0.2 ETH</p>
              <p className="highest-bid">Highest Bid: 0.3 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>
        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft4.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">City</p>
              <p className="price">Price: 0.8 ETH</p>
              <p className="highest-bid">Highest Bid: 1 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>
        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft5.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">City-Led</p>
              <p className="price">Price: 0.2 ETH</p>
              <p className="highest-bid">Highest Bid: 0.4 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>

        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft6.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">BlacknWhite</p>
              <p className="price">Price: 0.3 ETH</p>
              <p className="highest-bid">Highest Bid: 0.6 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>

        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft7.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">Pride</p>
              <p className="price">Price: 0.4 ETH</p>
              <p className="highest-bid">Highest Bid: 0.3 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>

        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft11.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">NFT Name 2</p>
              <p className="price">Price: 0.4 ETH</p>
              <p className="highest-bid">Highest Bid: 0.1 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>

        {/* NFT 2 */}
        <div className="column is-one-quarter">
          <div className="image-container">
            <img src="/images/nft3.png" alt="NFT 2" className="image" />
            <div className="info">
              <p className="nft-name">Village Desert </p>
              <p className="price">Price: 0.9 ETH</p>
              <p className="highest-bid">Highest Bid: 0.9 ETH</p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>
        {/* NFT 2 */}

        {/* Continue the pattern for NFT 3, NFT 4, etc. */}
      </div>
    </div>
  );
};

export default Homepage;
