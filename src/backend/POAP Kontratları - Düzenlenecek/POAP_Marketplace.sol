// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract POAP_Marketplace is ERC721, ERC721URIStorage, ERC721Burnable, ERC20, ERC20Burnable, Ownable {
    uint private poapCounter = 1;
    uint private collectionCounter = 1;
    uint private feePercent = 5;
    uint private beeExchangeRate = 1000; // 1000 BEE = 1 ETH

    function setFeePercent (uint _feePercent) public onlyOwner {
        feePercent = _feePercent;
    }

    function setFeePercent (uint _beeExchangeRate) public onlyOwner {
        beeExchangeRate = _beeExchangeRate;
    }

    constructor () ERC721 ("BEE_POAP", "BEEPOAP") ERC20 ("BEE_TOKEN", "BEE") Ownable (msg.sender) {}

    struct Collection {
        string name;
        string description;
        uint collectionID;
        uint amount;
        address creator;
        uint poapValue; // in terms of Wei
        address payable [] participants;
    }

    mapping (uint => Collection) public POAPs;

    event Create (string name, string description, uint collectionID, uint amount, address creator, uint poapValue, string tokenURI);
    event Claim (uint tokenID, uint collectionID, address participant);
    event Convert (uint amountOfBEE, address owner);
    event Buy (uint price);


    function createPOAP (string memory _tokenURI, string memory _name, string memory _description, uint _amount) public payable {
        require(_amount > 0, "Invalid amount");
        require(msg.value > tx.gasprice * gasleft(), "Very low value per PAOP"); // check if the value is enough to cover the gas fee
        
        uint poapValue = ((msg.value * ((100-feePercent)/100)) / _amount);
        Collection memory newCollection = Collection(_name, _description, collectionCounter, _amount, msg.sender, poapValue); 
        emit Create (_name, _description, collectionCounter, _amount, msg.sender, poapValue, _tokenURI);
        collectionCounter++;

        for (uint i = 0; i < _amount; i++) {
            _safeMint(msg.sender, poapCounter); 
            _setTokenURI(poapCounter, _tokenURI);
            POAPs[poapCounter] = newCollection;
            poapCounter++;
        }
    }

    function claim (uint _tokenID) public {
        for (uint i = 0; i < POAPs[_tokenID].participants.length; i++) {
            if (POAPs[_tokenID].participants[i] == msg.sender) {
                require(false, "You already own a POAP"); return;
            }
        } 
        
        safeTransferFrom(ownerOf(_tokenID), msg.sender, _tokenID); 
        POAPs[_tokenID].participants.push(payable(msg.sender));
        emit Claim (_tokenID, POAPs[_tokenID].collectionID, msg.sender);
    }

    function convertToToken (uint _tokenID) public {
        require(ownerOf(_tokenID) == msg.sender, "You are not the owner of this POAP");
        emit Convert ((POAPs[_tokenID].poapValue/1000000000000000000) * 1000, msg.sender);
        _mint(msg.sender, (POAPs[_tokenID].poapValue/1000000000000000000) * 1000);
        _burn(_tokenID); 
        delete POAPs[_tokenID];
    }

    function buyingEtherWithBEE (uint _amountOfBEE) public {
        require(balanceOf(msg.sender) >= _amountOfBEE, "Insufficient BEE balance");
        _burn(msg.sender, _amountOfBEE);
        payable(msg.sender).transfer((_amountOfBEE/beeExchangeRate) * 1000000000000000000);
        emit Buy (_amountOfBEE);
    }

    function shoppingWithBEE (uint _priceOfProduct) public {
        require(balanceOf(msg.sender) >= _priceOfProduct, "Insufficient BEE balance");
        _burn(msg.sender, _priceOfProduct);
        emit Buy (_priceOfProduct);
    }

    function tokenURI (uint256 tokenId) public view override (ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface (bytes4 interfaceId) public view override (ERC721, ERC721URIStorage) returns (string memory) {
        return super.supportsInterface(interfaceId);
    }
}    