// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ITU_Marketplace is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public NFTcounter;
    uint private feePercent = 5;

    constructor(address initialOwner) ERC721("ITU_Marketplace", "BEE") Ownable(initialOwner) {}

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

    mapping (uint => Item) public Items;

    function setFeePercent (uint _feePercent) public onlyOwner {
        feePercent = _feePercent;
    }

    function safeMint (string memory _tokenURI, string memory _name, string memory _description, uint _collectionID) public {
        uint256 tokenID = NFTcounter.current(); NFTcounter.increment();
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        Items[tokenID] = Item (_name, _description, _collectionID, false, payable(msg.sender), payable(address(0)), 0, 0, 0);
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

    function tokenURI (uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface (bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}