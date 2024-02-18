// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ITUPOAP is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint private NFTcounter;
    uint private fee_Percent = 5;

    constructor() ERC721("ITUPOAP", "BEP") Ownable(msg.sender) {}

    struct Poap {
        string name;
        string description;
        uint256 price;
    }

    mapping (uint => Poap) public Items;

    function safeMint(string memory _tokenURI, string memory _name, string memory _description, uint _amount) public payable {
        uint price_perPoapIBE = ((msg.value*(1-fee_Percent))/_amount)/1000; //Burda aslında 1000 IBE 1Ether
        uint256 tokenID = NFTcounter; NFTcounter++;                         //IBE = BEE Token
        require((msg.value*(1-fee_Percent)) > 0, "Invalid token quantity"); //Burda 0 yerine 
        require(_amount > 0, "Invalid amount");                            //gasfee'ye göre bakılacak.

        for(uint i = 0; i < (msg.value/price_perPoapIBE); i++) { 
                _safeMint(msg.sender, tokenID);
                _setTokenURI(tokenID, _tokenURI);
                Items[tokenID] = Poap(_name, _description, price_perPoapIBE);
        }   
    }

    function setFeePercent (uint _feePercent) public onlyOwner {
        fee_Percent = _feePercent;
    }

    function hasPoap(uint256 tokenID) public view returns (bool) {
        return bytes(Items[tokenID].name).length > 0;
    }

    function claim(uint256 tokenID) public {
        require(!hasPoap(tokenID), "You already own a POAP");
        safeTransferFrom(ownerOf(tokenID), msg.sender, tokenID);
    }

    function get_Price(uint256 tokenID) public view returns (uint) { //Fonksiyon yazdım çünkü
        return(Items[tokenID].price);                               //diğer kontrattan ulaşamadım mappinge
    }

    function supportsInterface (bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

      function tokenURI (uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

contract BEETOKEN is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    ITUPOAP public poapContract;

    constructor(address initialOwner, address _poapContract)
        ERC20("BEE TOKEN", "IBE")
        Ownable(initialOwner)
        ERC20Permit("BEE TOKEN")
    {
        poapContract = ITUPOAP(_poapContract);
        _mint(msg.sender, 1000 * (10 ** decimals())); //Burda sıkıntı çıkabilir mi?
    }

    function mint_Swap(uint256 tokenID) public {  //Burda aslında POAPlarla IBE'ler takas ediliyor
        require(poapContract.hasPoap(tokenID), "You already own a POAP");
        _mint(msg.sender, poapContract.get_Price(tokenID));
    }
}