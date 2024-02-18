import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  // Define a function to handle the click event for NFTs
  const handleNFTClick = (nftName) => {
    // You can perform any action here, for example, navigate to a detailed view of the NFT
    console.log(`Clicked on ${nftName}`);
  };
  

  return (
    <div className="container mt-6 flex justify-end"style={{marginLeft: '-35px'}}>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      <div>
        <h2 className="is-size-2 has-text-centered" style={{ color: '#FFBB56', fontFamily: 'Inter, sans-serif',marginRight: '-400px'}}>
          <em> <b>START YOUR <font COLOR="#FF9900"> NFT</font></b>  </em>
        </h2>
        <h2 className="solo is-size-2 has-text-centered" style={{ color: '#FFBB56', fontFamily: 'Inter, sans-serif', fontWeight:'bolder',}}>
          <em> <b>JOURNEY HERE</b></em>
        </h2>
        <h2 className="is-size-6 has-text-centered" style={{ color: '#A66C15', fontFamily: 'Inter, sans-serif', marginLeft: '-290px'}}>
          <em> <b>Find the NFT you want in our 
            </b></em>
        </h2>
        <h2 className="solid is-size-6 has-text-centered" style={{ color: '#A66C15', fontFamily: 'Inter, sans-serif', marginLeft: '-330px'}}>
          <em> <b>Marketplace and own it!</b></em>
        </h2>
        <h2 className="solid is-size-6 has-text-centered" style={{ color: '#A66C15', fontFamily: 'Inter, sans-serif', marginLeft: '-405px'}}>
          <em> <b>Or create one!</b></em>
        </h2>
        <div className="buttons-container" style={{}}>
          {/* Use Link to navigate to the Collections page */}
          <Link to="/collections" className="create-button">
            <span>Explore</span>
          </Link>
          {/* Use Link to navigate to the Mint NFT page */}
          <Link to="/mint-nft" className="upload-button">
            <span>Create</span>
          </Link>
        </div>

        <img src="/images/nftpicture.png" alt="NFT Picture" className="lower-left-image"></img>
      </div>
      <div className="w-2/3">
        <div className="columns is-multiline">
          {/* NFT 1 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 1 Name")} className="image-container relative">
              <img src="images/nftberli1.png" alt="NFT 1" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 1 Name</p>
                  <p>$100</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 2 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 2 Name")} className="image-container relative">
              <img src="/images/nft2.png" alt="NFT 2" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 2 Name</p>
                  <p>$150</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 3 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 3 Name")} className="image-container relative">
              <img src="/images/nft3.png" alt="NFT 3" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 3 Name</p>
                  <p>$120</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 4 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 4 Name")} className="image-container relative">
              <img src="/images/nft4.png" alt="NFT 4" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 4 Name</p>
                  <p>$200</p>
                </div>
              </div>
            </a>
          </div>

          {/* Continue the pattern for other NFTs */}
          {/* NFT 5 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 5 Name")} className="image-container relative">
              <img src="/images/nft5.png" alt="NFT 5" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 5 Name</p>
                  <p>$180</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 6 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 6 Name")} className="image-container relative">
              <img src="/images/nft6.png" alt="NFT 6" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 6 Name</p>
                  <p>$250</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 7 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 7 Name")} className="image-container relative">
              <img src="/images/nft7.png" alt="NFT 7" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 7 Name</p>
                  <p>$300</p>
                </div>
              </div>
            </a>
          </div>

          {/* NFT 8 */}
          <div className="column is-half">
            <a href="#" onClick={() => handleNFTClick("NFT 8 Name")} className="image-container relative">
              <img src="/images/bg-1.png" alt="NFT 8" className="image" />
              <div className="overlay">
                <div className="text-center">
                  <p>NFT 8 Name</p>
                  <p>$180</p>
                </div>
              </div>
            </a>
          </div>
          
          {/* Continue adding NFTs as needed */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
