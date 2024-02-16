import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Mint from "./Mint";
import Footer from "./Footer"; // Import the Footer component
import { Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <section className="hero is-fullheight">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/mint-nft" exact element={<Mint />} />
        </Routes>
      </section>
      <Footer /> {/* Use the Footer component here */}
    </Router>
  );
}

export default App;
