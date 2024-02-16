import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="container mt-6 flex justify-end">
      <div>
        <h2 className="is-size-2 has-text-centered" style={{ color: '#FF9900' }}>
          START YOUR NFT JOURNEY HERE
        </h2>
      </div>
      <div className="w-2/3">
        <h2 className="is-size-2 has-text-centered mb-4">Top Picks</h2>
        <div className="columns is-multiline">
          {/* Row 1 */}
          <div className="column is-half custom-margin-right">
            {/* NFT 1 */}
            <div className="image-container relative">
              <img src="/images/nft1.png" alt="NFT 1" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 1 Name</p>
                  <p>$100</p>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            {/* NFT 2 */}
            <div className="image-container relative">
              <img src="/images/nft2.png" alt="NFT 2" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 2 Name</p>
                  <p>$150</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="column is-half">
            {/* NFT 3 */}
            <div className="image-container relative">
              <img src="/images/nft3.png" alt="NFT 3" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 3 Name</p>
                  <p>$120</p>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            {/* NFT 4 */}
            <div className="image-container relative">
              <img src="/images/nft4.png" alt="NFT 4" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 4 Name</p>
                  <p>$200</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue the pattern for other NFTs */}
          {/* Row 3 */}
          <div className="column is-half">
            {/* NFT 5 */}
            <div className="image-container relative">
              <img src="/images/nft5.png" alt="NFT 5" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 5 Name</p>
                  <p>$180</p>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            {/* NFT 6 */}
            <div className="image-container relative">
              <img src="/images/nft6.png" alt="NFT 6" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 6 Name</p>
                  <p>$250</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="column is-half">
            {/* NFT 7 */}
            <div className="image-container relative">
              <img src="/images/nft7.png" alt="NFT 7" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 7 Name</p>
                  <p>$300</p>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            {/* NFT 8 */}
            <div className="image-container relative">
              <img src="/images/nft11.png" alt="NFT 8" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 8 Name</p>
                  <p>$180</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue adding NFTs as needed */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;