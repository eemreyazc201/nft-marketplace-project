// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faInstagram, faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: 'url(/images/footer.png)'}}>
      <div className="brand">
        <span>ITUBLOCKCHAIN</span>
     
      </div>
      <div className="social-icons">
        <a href="https://twitter.com/ITUblockchain" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://discord.gg/S4rVkkzp" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="https://www.instagram.com/itublockchain/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com/@ITUBlockchain" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://github.com/itublockchain" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

