// App.js

import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Homepage from "./Homepage"; // Import the Homepage component

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [disconnecting, setDisconnecting] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkConnectedWallet();
    listenForWalletChanges();
  }, [walletAddress, disconnecting, connecting]);

  const connectWallet = () => {
    if (disconnecting) {
      // If disconnecting, don't initiate another connection
      return;
    }

    if (walletAddress) {
      // If already connected, initiate disconnect
      disconnectWallet();
    } else {
      // If not connected, initiate connection
      setConnecting(true);

      if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
        console.error("Please install MetaMask");
        setConnecting(false);
        return;
      }

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setWalletAddress(accounts[0]);
          fetchWalletBalance(accounts[0]);
          setConnecting(false);
        })
        .catch((err) => {
          console.error(err.message);
          setConnecting(false);
        });
    }
  };

  const disconnectWallet = () => {
    if (typeof window.ethereum !== "undefined") {
      const shouldDisconnect = window.confirm("We are having some issues with the disconnect feature at the moment. Please disconnect from the site manually, on MetaMask.");

      if (shouldDisconnect) {
        setDisconnecting(true);

        window.ethereum
          .request({ method: 'eth_accounts' }) // Get accounts to ensure MetaMask is connected
          .then(() => {
            return window.ethereum.request({ method: 'eth_requestAccounts' });
          })
          .then(() => {
            // Disconnect by clearing accounts and reloading the page
            window.ethereum._state.accounts = [];
            window.location.reload();
          })
          .catch((err) => {
            console.error(err.message);
            setDisconnecting(false);
          });
      }
    }
  };

  const checkConnectedWallet = () => {
    if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
      console.error("Please install MetaMask");
      return;
    }

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          fetchWalletBalance(accounts[0]);
        } else {
          setWalletAddress("");
          setWalletBalance("");
          console.log("Connect to MetaMask using the Connect button");
        }
      })
      .catch((err) => console.error(err.message));
  };

  const fetchWalletBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.utils.formatEther(balance);
      setWalletBalance(ethBalance);
    } catch (err) {
      console.error(err.message);
    }
  };

  const listenForWalletChanges = () => {
    if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
      console.error("Please install MetaMask");
      return;
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        fetchWalletBalance(accounts[0]);
      } else {
        setWalletAddress("");
        setWalletBalance("");
      }
    });
  };

  return (
    <div>
      <nav className="navbar bg-black">
        <div className="container flex justify-between items-center">
          <div className="navbar-brand">
            <a href="https://www.itublockchain.com/" target="_blank" rel="noopener noreferrer">
              <h1 className="navbar-item is-size-4 mb-0">ITU BLOCKCHAIN</h1>
            </a>
          </div>
          <div id="navbarMenu" className="navbar-menu items-center">
            <div className="navbar-start">
              <a href="#store" className="navbar-item">Store</a>
              <a href="#my-nfts" className="navbar-item">My NFTs</a>
              <a href="#mint-nft" className="navbar-item">Mint NFT</a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <span className="font-bold text-white">
                  {walletAddress
                    ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                    : connecting
                    ? "Connecting..."
                    : ""}
                </span>
              </div>
              {walletAddress && (
                <div className="navbar-item">
                  <span className="font-bold">Balance: {walletBalance} ETH</span>
                </div>
              )}
              <button
                className={`button bg-white connect-wallet ${walletAddress || connecting ? "connected" : ""}`}
                onClick={connectWallet}
                style={{ marginTop: "0.5rem" }}
              >
                <span className="text-link font-bold">
                  {walletAddress ? "Disconnect" : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <Homepage /> {/* Add the Homepage component here */}
        {/* ... (rest of your code) */}
      </section>
    </div>
  );
}

export default App;
