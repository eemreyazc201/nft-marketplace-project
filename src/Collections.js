// Collections.js
import React, { useState } from "react";
import "./Collections.css";
import { Link } from "react-router-dom";

function Collections() {
  const [visibleBoxes, setVisibleBoxes] = useState(0);
  const totalBoxes = 6;
  const boxesToShow = 3;

  const handleArrowClick = (direction) => {
    const step = 1;

    const newVisibleBoxes =
      direction === "left"
        ? Math.max(0, visibleBoxes - step)
        : Math.min(totalBoxes - boxesToShow, visibleBoxes + step);

    setVisibleBoxes(newVisibleBoxes);
  };

  const renderBoxes = () => {
    const boxes = [];

    for (let i = 0; i < totalBoxes; i++) {
      const content = getContentForBox(i);

      boxes.push(
        <div
          key={i}
          className={`box ${i >= visibleBoxes && i < visibleBoxes + boxesToShow ? "" : "hidden"}`}
        >
          {content}
        </div>
      );
    }

    return boxes;
  };

  const getContentForBox = (boxIndex) => {
    switch (boxIndex) {
        case 0:
            return (
              <div className="box-content">
                <img src="images/nft3.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px', marginLeft: '5px' }}></img>
                <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.4 ETH</p>
                <Link to={`./CollectionDetail1`}>
                  <button style={{ borderRadius: '10px', marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center' }}>Discover</button>
                </Link>
              </div>
          );
      case 1:
        return (
            <div className="box-content">
              <img src="images/nftberli4.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px',marginLeft: '5px'  }}></img>
              <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.4 ETH</p>
             <button  style={{borderRadius: '10px', marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center'}}>Discover</button>
            </div>
          );
      case 2:
        return (
          <div className="box-content">
            <img src="images/nft2.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px',marginLeft: '5px'  }}></img>
            <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.4 ETH</p>
           <button  style={{ borderRadius: '10px',marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center'}}>Discover</button>
          </div>
        );
      case 3:
        return (
            <div className="box-content">
              <img src="images/nft5.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px',marginLeft: '5px'  }}></img>
              <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.4 ETH</p>
             <button  style={{ borderRadius: '10px',marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center'}}>Discover</button>
            </div>
          );
      case 4:
        return (
            <div className="box-content">
              <img src="images/nft6.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px',marginLeft: '5px'  }}></img>
              <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.4 ETH</p>
             <button  style={{ borderRadius: '10px',marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center'}}>Discover</button>
            </div>
          );
      case 5:
        return (
            <div className="box-content">
              <img src="images/nft7.png" alt="NFT3" style={{ marginTop: '-10px', width: '200px', height: '100px',marginLeft: '5px'  }}></img>
              <p>&nbsp;&nbsp;'City'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: 0.5 ETH</p>
             <button style={{ borderRadius: '10px',fontColor: 'green', marginLeft: '65px', marginTop: '-50px', border: '2px solid #FF9900', alignItems: 'center'}}>Discover</button>
            </div>
          );
      default:
        return (
          <div className="box-content">
            <img src="path/to/default-image.jpg" alt="Default" />
            <p>Default Information</p>
            <p>Price: $50</p>
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="header">Popular Collections</h2>
      <div className="carousel-container">
        <div className="arrow left" onClick={() => handleArrowClick("left")}></div>
        <div className="rectangle">{renderBoxes()}</div>
        <div className="arrow right" onClick={() => handleArrowClick("right")}></div>
      </div>
      <div className="additional-boxes-container">
        <div className="additional-box additional-box1">
          <img className ="image2" src="images/nft7.png" alt="Additional Box 1" />
          <p>Additional Box 1 Information</p>
          <p>Price: $75</p>
        </div>
        <div className="additional-box additional-box2">
          <img className ="image3" src="images/nft6.png" alt="Additional Box 2" />
          <p>Additional Box 2 Information</p>
          <p>Price: $90</p>
        </div>
        <div className="additional-box additional-box3">
          <img className ="image4" src="images/nftberil2.png" alt="Additional Box 3"/>
          <p>Additional Box 3 Information</p>
          <p>Price: $70</p>
        </div>
        <div className="additional-box additional-box4">
          <img className ="image5"  src="images/nft4.png" alt="Additional Box 4"  />
          <p>Additional Box 4 Information</p>
          <p>Price: $100</p>
        </div>
        <div className="additional-box additional-box5">
          <img className ="image6" src="images/nft1.png" alt="Additional Box 5" />
          <p>Additional Box 5 Information</p>
          <p>Price: $110</p>
        </div>
      </div>
    </div>
  );
}

export default Collections;
