// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Mint from "./Mint";
import Collections from "./Collections";
import CollectionDetail1 from "./CollectionDetail1";
import Footer from "./Footer";
import MyNFTs from "./myNFTs"; // Import the MyNFTs component
import { NFTProvider } from "./NFTContext";

function App() {
  return (
    <Router>
      <Navbar />
      <NFTProvider>
        <section className="hero is-fullheight">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/mint-nft" element={<Mint />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:collectionId" element={<CollectionDetail1 />} />
            <Route path="/my-nfts" element={<MyNFTs />} /> {/* Add route for MyNFTs */}
          </Routes>
        </section>
      </NFTProvider>
      <Footer />
    </Router>
  );
}

export default App;
