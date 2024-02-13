// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ITU_Marketplace is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters public NFTcounter;
    Counters public collectionCounter;
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

    struct Collection {
        uint collectionId;
        uint bundle_price;
        uint nft_amount;
        string name;
        string description;
        address payable owner;
    }

    mapping (uint => Item) public Items;
    mapping (uint => Collection) public Collections;

    function createCollection (uint _collectionID, uint _NFTAmount, string memory _name, string memory _description) public {
        Collections[_collectionID] = Collection (_collectionID, NULL, _NFTAmount, _name, _description, msg.sender);
    }

    function buyCollection (uint _collectionID) public payable {
        require(msg.value == Collections[_collectionID].bundle_price, "The price is not correct");
        require(Collections[_collectionID].nft_amount > 0, "The collection is empty");
        require(msg.sender != Collections[_collectionID].owner, "You are the owner of this collection");
        Collections[_collectionID].owner.transfer(msg.value-(msg.value*feePercent/100));
        Collections[_collectionID].owner = payable(msg.sender);
        Collections[_collectionID].bundle_price = NULL;




        for (uint i = 0; i < Collections[_collectionID].nft_amount; i++) {
                       
            IERC721 token = IERC721(address(this));
            token.transferFrom(Collections[_collectionID].owner, msg.sender, _tokenID);

            // for döngüsü bozuk, düzeltmek için collection structına NFT'lerin arrayi eklenecek
            // array eklenince _mint fonksiyonu da düzenlenecek
            // her NFT oluşturulduğunda ya da setCollection çalıştığında
            // ilgili koleksiyonların arrayleri düzenlenecek
            // ayrıca collection'lar için de isListed attribute'u eklenecek
            // listmynft's fonksiyonu eklenecek



            Items[_tokenID].isListed = true;
            Items[_tokenID].startingPrice = _startingPrice;
            Items[_tokenID].deadline = _deadline;


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
        uint256 tokenID = NFTCounter.current(); NFTcounter.increment();
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        Items[tokenID] = Item (_name, _description, _collectionID, false, payable(msg.sender), payable(address(NULL)), NULL, NULL, NULL, NULL);
        Collections[_collectionID].nft_amount++;
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
        Items[_tokenID].highestBidder = payable(address(NULL));
        Items[_tokenID].highestBid = NULL;
        Items[_tokenID].startingPrice = NULL;
        Items[_tokenID].deadline = NULL;
        Items[_tokenID].collectionID = NULL;
        Collections[Items[_tokenID].collectionID].nft_amount--;
    }

    function cancelAuction (uint _tokenID) public {
        IERC721 token = IERC721(address(this));
        require(token.ownerOf(_tokenID) == msg.sender, "You are not the owner of this NFT");
        require(Items[_tokenID].isListed == true, "This NFT is not listed");
        require(block.timestamp < Items[_tokenID].deadline, "The auction already finished");
        Items[_tokenID].isListed = false;
        Items[_tokenID].highestBidder.transfer(Items[_tokenID].highestBid);
        Items[_tokenID].highestBidder = payable(address(NULL));
        Items[_tokenID].highestBid = NULL;
        Items[_tokenID].startingPrice = NULL;
        Items[_tokenID].deadline = NULL;
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