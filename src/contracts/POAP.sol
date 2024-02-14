// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ITUPOAP is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint private NFTcounter;
    uint price_perPoap =  0.01 ether;

    constructor() ERC721("ITUPOAP", "BEP") Ownable(msg.sender) {}

    struct Poap {
        string name;
        string description;
    }

    mapping (uint => Poap) public Items;

   function safeMint(string memory _tokenURI, string memory _name, string memory _description) public payable {
        uint256 tokenID = NFTcounter; NFTcounter++;

        for(uint i = 0; i < (msg.value/price_perPoap); i++) { 
                _safeMint(msg.sender, tokenID);
                _setTokenURI(tokenID, _tokenURI);
                Items[tokenID] = Poap(_name, _description);
        }   
    }
}