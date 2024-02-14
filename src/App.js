import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Mint from "./Mint";
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
    </Router>
  );
}

export default App;
