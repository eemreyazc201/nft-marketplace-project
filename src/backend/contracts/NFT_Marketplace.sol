// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT_Marketplace is ERC721, ERC721URIStorage, Ownable {
    uint public NFTCounter = 1;
    uint public collectionCounter = 1;
    uint private feePercent = 5;

    function setFeePercent (uint _feePercent) public onlyOwner {
        feePercent = _feePercent;
    }

    constructor () ERC721 ("BEE_NFT", "BEENFT") Ownable (msg.sender) {}

    struct NFT {
        string name;
        string description;
        uint collectionID;
        bool isListed;

        address payable owner;
        address payable highestBidder;
        uint highestBid;
        uint startingPrice;
        uint deadline;
    }

    struct Collection {
        uint collectionId;
        uint bundle_price;
        string name;
        string description;
        address payable owner;
        uint [] NFTs; // keeps tokenIDs
        bool isListed;
    }

    mapping (uint => NFT) public NFTs;
    mapping (uint => Collection) public Collections;

    event CreateCollection (string name, string description, address owner);
    event CreateNFT (string name, string description, uint collectionID, address owner, string tokenURI);
    event ChangeCollectionOfNFT (string name, uint tokenID, uint collectionID);
    event CollectionSale (string name, uint collectionID, uint price, address owner);
    event BuyCollection (string name, uint collectionID, uint price, address buyer);
    event ListNFT (string name, uint collectionID, uint price, address owner);
    event Bid (uint tokenID, uint offer, address bidder);
    event FinishAuction (uint tokenID, uint price, address buyer);
    event CancelAuction (uint tokenID, address owner);

    function createNFT (string memory _tokenURI, string memory _name, string memory _description, uint _collectionID) public {
        require(_collectionID < collectionCounter, "There is no collection you select");
        uint256 tokenID = NFTCounter; NFTCounter++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        NFTs[tokenID] = NFT (_name, _description, _collectionID, false, payable(msg.sender), payable(address(0)), 0, 0, 0);
        Collections[_collectionID].NFTs.push(tokenID);
        emit CreateNFT (_name, _description, _collectionID, msg.sender, _tokenURI);
    }

    function createCollection (string memory _name, string memory _description) public {
        uint collectionID = collectionCounter; collectionCounter++;
        uint [] memory temp;
        Collections[collectionID] = Collection (collectionID, 0, _name, _description, payable(msg.sender), temp, false);
        emit CreateCollection (_name, _description, msg.sender);
    }

    function setCollection (uint _collectionID, uint _tokenID) public {
        require(msg.sender == Collections[_collectionID].owner, "You are not the owner of this collection");
        require(msg.sender == NFTs[_tokenID].owner, "You are not the owner of this NFT");
        NFTs[_tokenID].collectionID = _collectionID;
        emit ChangeCollectionOfNFT (NFTs[_tokenID].name, _tokenID, _collectionID);
    }

    function setCollectionPrice (uint _collectionID, uint _price) public {
        require(msg.sender == Collections[_collectionID].owner, "You are not the owner of this collection");
        Collections[_collectionID].isListed = true;
        Collections[_collectionID].bundle_price = _price;
        emit CollectionSale (Collections[_collectionID].name, _collectionID, _price, msg.sender);
    }

    function buyCollection (uint _collectionID) public payable {
        require(msg.value == Collections[_collectionID].bundle_price, "The price is not correct");
        require(Collections[_collectionID].NFTs.length > 0, "The collection is empty");
        require(msg.sender != Collections[_collectionID].owner, "You are the owner of this collection");
        require(Collections[_collectionID].isListed, "The collection is not listed");
        Collections[_collectionID].owner.transfer(msg.value-(msg.value*feePercent/100));
        Collections[_collectionID].owner = payable(msg.sender);
        Collections[_collectionID].bundle_price = 0;
        for (uint i = 0; i < Collections[_collectionID].NFTs.length; i++) {               
            IERC721 token = IERC721(address(this));
            token.transferFrom(Collections[_collectionID].owner, msg.sender, Collections[_collectionID].NFTs[i]);
            NFTs[Collections[_collectionID].NFTs[i]].owner = payable(msg.sender);
        }
        emit BuyCollection (Collections[_collectionID].name, _collectionID, msg.value, msg.sender);
    }

    function sellNFT (uint _tokenID, uint _startingPrice, uint _deadline) public {
        IERC721 token = IERC721(address(this));
        require(token.ownerOf(_tokenID) == msg.sender, "You are not the owner of this NFT");
        token.transferFrom(msg.sender, address(this), _tokenID);
        NFTs[_tokenID].isListed = true;
        NFTs[_tokenID].startingPrice = _startingPrice;
        NFTs[_tokenID].deadline = _deadline;
        emit ListNFT (NFTs[_tokenID].name, NFTs[_tokenID].collectionID, _startingPrice, msg.sender);
    }

    function bid (uint _tokenID) public payable {
        require(NFTs[_tokenID].isListed == true, "This NFT is not listed");
        require(msg.sender != NFTs[_tokenID].owner, "You cannot bid on your own NFT");
        require(msg.value > NFTs[_tokenID].highestBid, "Your bid is lower than the highest bid");
        require(block.timestamp < NFTs[_tokenID].deadline, "The auction has ended");
        require(msg.value > NFTs[_tokenID].startingPrice, "Your bid is lower than the starting price");
        require(msg.sender != NFTs[_tokenID].highestBidder, "You are already the highest bidder");

        NFTs[_tokenID].highestBidder.transfer(NFTs[_tokenID].highestBid);
        NFTs[_tokenID].highestBidder = payable(msg.sender);
        NFTs[_tokenID].highestBid = msg.value;

        emit Bid (_tokenID, msg.value, msg.sender);
    }

    function finishAuction (uint _tokenID) public {
        IERC721 token = IERC721(address(this));
        require(NFTs[_tokenID].isListed == true, "This NFT is not listed");
        require(block.timestamp < NFTs[_tokenID].deadline, "The auction already finished");
        token.transferFrom(address(this), NFTs[_tokenID].highestBidder, _tokenID);
        NFTs[_tokenID].owner.transfer(NFTs[_tokenID].highestBid*(1 - feePercent/100));
        NFTs[_tokenID].isListed = false;
        NFTs[_tokenID].owner = NFTs[_tokenID].highestBidder;
        NFTs[_tokenID].highestBidder = payable(address(0));
        NFTs[_tokenID].highestBid = 0;
        NFTs[_tokenID].startingPrice = 0;
        NFTs[_tokenID].deadline = 0;
        NFTs[_tokenID].collectionID = 0;
        for (uint i=1; i < Collections[NFTs[_tokenID].collectionID].NFTs.length; i++) {
            if (Collections[NFTs[_tokenID].collectionID].NFTs[i] == _tokenID) {
                Collections[NFTs[_tokenID].collectionID].NFTs[i] = Collections[NFTs[_tokenID].collectionID].NFTs[Collections[NFTs[_tokenID].collectionID].NFTs.length - 1];
                Collections[NFTs[_tokenID].collectionID].NFTs.pop();
            }
        }

        emit FinishAuction (_tokenID, NFTs[_tokenID].highestBid, NFTs[_tokenID].highestBidder);
    }

    function cancelAuction (uint _tokenID) public {
        IERC721 token = IERC721(address(this));
        require(NFTs[_tokenID].owner == msg.sender, "You are not the owner of this NFT");
        require(NFTs[_tokenID].isListed == true, "This NFT is not listed");
        require(block.timestamp < NFTs[_tokenID].deadline, "The auction already finished");
        NFTs[_tokenID].isListed = false;
        NFTs[_tokenID].highestBidder.transfer(NFTs[_tokenID].highestBid);
        NFTs[_tokenID].highestBidder = payable(address(0));
        NFTs[_tokenID].highestBid = 0;
        NFTs[_tokenID].startingPrice = 0;
        NFTs[_tokenID].deadline = 0;
        token.transferFrom(address(this), msg.sender, _tokenID);
        emit CancelAuction (_tokenID, msg.sender);
    }

    function tokenURI (uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface (bytes4 interfaceId) public view override (ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}