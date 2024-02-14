// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ITU_Marketplace is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint private NFTcounter = 1;
    uint private collectionCounter = 1;
    uint private feePercent = 5;

    constructor() ERC721("ITU_Marketplace", "BEE") Ownable(msg.sender) {}

    struct Item {
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

    mapping (uint => Item) public Items;
    mapping (uint => Collection) public Collections;

    function createCollection (uint _NFTAmount, string memory _name, string memory _description) public {
        uint collectionID = collectionCounter; collectionCounter++;
        Collections[collectionID] = Collection (collectionID, 0, _NFTAmount, _name, _description, msg.sender, new uint [], false);
    }

    function buyCollection (uint _collectionID) public payable {
        require(msg.value == Collections[_collectionID].bundle_price, "The price is not correct");
        require(Collections[_collectionID].NFTs.length > 0, "The collection is empty");
        require(msg.sender != Collections[_collectionID].owner, "You are the owner of this collection");
        require(Collections[_collectionID].isListed, "The collection is not listed");
        Collections[_collectionID].owner.transfer(msg.value-(msg.value*feePercent/100));
        Collections[_collectionID].owner = payable(msg.sender);
        Collections[_collectionID].bundle_price = 0;
        for (uint tokenID = 1; tokenID < Collections[_collectionID].NFTs.length; tokenID++) {               
            IERC721 token = IERC721(address(this));
            token.transferFrom(Collections[_collectionID].owner, msg.sender, tokenID);
            Items[tokenID].owner = payable(msg.sender);
        }
    }

    function setCollectionPrice (uint _collectionID, uint _price) public {
        require(msg.sender == Collections[_collectionID].owner, "You are not the owner of this collection");
        Collections[_collectionID].bundle_price = _price;
    }

    function setCollection (uint _collectionID, uint _tokenID) public {
        require(msg.sender == Collections[_collectionID].owner, "You are not the owner of this collection");
        require(msg.sender == Items[_tokenID].owner, "You are not the owner of this NFT");
        Items[_tokenID].collectionID = _collectionID;
    }

    function setFeePercent (uint _feePercent) public onlyOwner {
        feePercent = _feePercent;
    }

    function safeMint (string memory _tokenURI, string memory _name, string memory _description, uint _collectionID) public {
        uint256 tokenID = NFTCounter; NFTcounter++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        Items[tokenID] = Item (_name, _description, _collectionID, false, payable(msg.sender), payable(address(0)), 0, 0, 0, 0);
        Collections[_collectionID].NFTs.push(tokenID);
    }

    function sellNFT (uint _tokenID, uint _startingPrice, uint _deadline) public {
        IERC721 token = IERC721(address(this));
        require(token.ownerOf(_tokenID) == msg.sender, "You are not the owner of this NFT");
        token.transferFrom(msg.sender, address(this), _tokenID);
        Items[_tokenID].isListed = true;
        Items[_tokenID].startingPrice = _startingPrice;
        Items[_tokenID].deadline = _deadline;
    }

    function finishAuction (uint _tokenID) public {
        IERC721 token = IERC721(address(this));
        require(Items[_tokenID].isListed == true, "This NFT is not listed");
        require(block.timestamp < Items[_tokenID].deadline, "The auction already finished");
        token.transferFrom(address(this), Items[_tokenID].highestBidder, _tokenID);
        Items[_tokenID].owner.transfer(Items[_tokenID].highestBid*(1 - feePercent/100));
        Items[_tokenID].isListed = false;
        Items[_tokenID].owner = Items[_tokenID].highestBidder;
        Items[_tokenID].highestBidder = payable(address(0));
        Items[_tokenID].highestBid = 0;
        Items[_tokenID].startingPrice = 0;
        Items[_tokenID].deadline = 0;
        Items[_tokenID].collectionID = 0;
        for (uint i=1; i < Collections[Items[_tokenID].collectionID].NFTs.length; i++) {
            if (Collections[Items[_tokenID].collectionID].NFTs[i] == _tokenID) {
                Collections[Items[_tokenID].collectionID].NFTs[index] = Collections[Items[_tokenID].collectionID].NFTs[Collections[Items[_tokenID].collectionID].NFTs.length - 1];
                Collections[Items[_tokenID].collectionID].NFTs.pop();
            }
        }
    }

    function cancelAuction (uint _tokenID) public {
        IERC721 token = IERC721(address(this));
        require(token.ownerOf(_tokenID) == msg.sender, "You are not the owner of this NFT");
        require(Items[_tokenID].isListed == true, "This NFT is not listed");
        require(block.timestamp < Items[_tokenID].deadline, "The auction already finished");
        Items[_tokenID].isListed = false;
        Items[_tokenID].highestBidder.transfer(Items[_tokenID].highestBid);
        Items[_tokenID].highestBidder = payable(address(0));
        Items[_tokenID].highestBid = 0;
        Items[_tokenID].startingPrice = 0;
        Items[_tokenID].deadline = 0;
        token.transferFrom(address(this), msg.sender, _tokenID);
    }

    function bid (uint _tokenID) public payable {
        require(Items[_tokenID].isListed == true, "This NFT is not listed");
        require(msg.sender != Items[_tokenID].owner, "You cannot bid on your own NFT");
        require(msg.value > Items[_tokenID].highestBid, "Your bid is lower than the highest bid");
        require(block.timestamp < Items[_tokenID].deadline, "The auction has ended");
        require(msg.value > Items[_tokenID].startingPrice, "Your bid is lower than the starting price");
        require(msg.sender != Items[_tokenID].highestBidder, "You are already the highest bidder");

        Items[_tokenID].highestBidder.transfer(Items[_tokenID].highestBid);
        Items[_tokenID].highestBidder = payable(msg.sender);
        Items[_tokenID].highestBid = msg.value;
    }

    struct ChildOutputStruct {
        string NFTName;
        string NFTDescription;
        uint tokenID;
        uint tokenURI;
        bool isNFTListed;
        address payable highestBidder;
        uint highestBid;
        uint startingPrice;
        uint deadline;
    }

    struct ParentOutputStruct {
        string collectionName;
        string collectionDescription;
        uint bundle_price;
        address payable owner;
        bool isCollectionListed;
        ChildOutputStruct [] elements;
    }

    function listMyNFTs () public returns (ParentOutputStruct [] memory) {
        ParentOutputStruct [] output;

        for (uint i = 1; i < collectionCounter; i++) {
            if (Collections[i].owner == msg.sender) {
                ParentOutputStruct memory parent;
                parent.collectionName = Collections[i].name;
                parent.collectionDescription = Collections[i].description;
                parent.bundle_price = Collections[i].bundle_price;
                parent.owner = Collections[i].owner;
                parent.isCollectionListed = Collections[i].isListed;
                for (uint j = 0; j < Collections[i].NFTs.length; j++) {
                    ChildOutputStruct memory child;
                    child.NFTName = Items[Collections[i].NFTs[j]].name;
                    child.NFTDescription = Items[Collections[i].NFTs[j]].description;
                    child.tokenID = Collections[i].NFTs[j];
                    child.tokenURI = tokenURI(Collections[i].NFTs[j]);
                    child.isNFTListed = Items[Collections[i].NFTs[j]].isListed;
                    child.highestBidder = Items[Collections[i].NFTs[j]].highestBidder;
                    child.highestBid = Items[Collections[i].NFTs[j]].highestBid;
                    child.startingPrice = Items[Collections[i].NFTs[j]].startingPrice;
                    child.deadline = Items[Collections[i].NFTs[j]].deadline;
                    parent.elements.push(child);
                }
                output.push(parent);
            }
        }

        for (uint i = 1; i < NFTcounter; i++) {
            if (Items[i].owner == msg.sender && Items[i].collectionID == 0) {
                ParentOutputStruct memory parent;
                parent.collectionName = "No Collection";
                parent.collectionDescription = "No Collection";
                parent.bundle_price = 0;
                parent.owner = Items[i].owner;
                parent.isCollectionListed = false;
                ChildOutputStruct memory child;
                child.NFTName = Items[i].name;
                child.NFTDescription = Items[i].description;
                child.tokenID = i;
                child.tokenURI = tokenURI(i);
                child.isNFTListed = Items[i].isListed;
                child.highestBidder = Items[i].highestBidder;
                child.highestBid = Items[i].highestBid;
                child.startingPrice = Items[i].startingPrice;
                child.deadline = Items[i].deadline;
                parent.elements.push(child);
                output.push(parent);
            }
        }

        return output;
    }

    function tokenURI (uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}