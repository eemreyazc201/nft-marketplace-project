import { ethers } from 'ethers';

import NFT_Marketplace_ABI from '../contractsDataForHooks/NFT_Marketplace_ABI.json';
import NFT_Marketplace_Address from '../contractsDataForHooks/NFT_Marketplace_ADDRESS.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const NFT_Marketplace = new ethers.Contract(NFT_Marketplace_Address.address, NFT_Marketplace_ABI.abi, signer);

export async function createNFT (tokenURI, name, description, collectionID) {
    NFT_Marketplace.createNFT(tokenURI, name, description, collectionID).wait();
    (await NFT_Marketplace.setApprovalForAll(NFT_Marketplace_Address.address, true)).wait()
}

export async function createCollection (name, description) {
    await NFT_Marketplace.createCollection(name, description);
}

export async function setCollection (collectionID, tokenID) {
    NFT_Marketplace.setCollection(collectionID, tokenID).wait();
}

export async function setCollectionPrice (collectionID, price) {
    NFT_Marketplace.setCollectionPrice(collectionID, price).wait();

}

export async function buyCollection (collectionID) {
    NFT_Marketplace.buyCollection(collectionID).wait();

}

export async function sellNFT (tokenID, startingPrice, deadline) {
    if (deadline < Date.now()) throw new Error('Deadline must be in the future');
    let unixTime = Math.floor(deadline.getTime() / 1000);
    NFT_Marketplace.sellNFT(tokenID, startingPrice, unixTime).wait();
}

export async function bid (tokenID, etherInput) {
    let weiAmount = ethers.utils.parseEther(etherInput);
    NFT_Marketplace.bid(tokenID, { value : weiAmount }).wait();

}

export async function finishAuction (tokenID) {
    NFT_Marketplace.finishAuction(tokenID).wait();
}

export async function cancelAuction (tokenID) {
    NFT_Marketplace.cancelAuction(tokenID).wait();
}

export async function getMyNFTs () {
    const output = [];

    for (let i = 0; i < NFT_Marketplace.getCollectionCounter(); i++) {
        const Collection = await NFT_Marketplace.Collections(i);
        const collection = {
            collectionID : Collection.collectionID,
            collectionName : Collection.name,
            collectionDescription : Collection.description,
            bundlePrice : Collection.bundle_price,
            owner : Collection.owner,
            isCollectionListed : Collection.isListed,
            elements : []
        }

        for (let j = 0; j < collection.NFTs.length; j++) {
            const token = await NFT_Marketplace.NFTs(collection.NFTs[j]);
            collection.elements.push({
                NFTName : token.name,
                NFTDescription : token.description,
                tokenID : collection.NFTs[j],
                tokenURI : NFT_Marketplace.tokenURI(collection.NFTs[j]),
                isNFTListed : token.isListed,
                highestBidder : token.highestBidder,
                highestBid : token.highestBid,
                startingPrice : token.startingPrice,
                deadline : token.deadline
            });
        }

        output.push(collection);
    }

    const noCollections = {                
        collectionID : 0,
        collectionName : "No Collection",
        collectionDescription : "No Collection",
        bundlePrice : 0,
        owner : signer.getAddress(),
        isCollectionListed : false,
        elements : []
    };

    for (let i = 0; i < NFT_Marketplace.getNFTCounter(); i++) {
        const token = await NFT_Marketplace.NFTs(i);
        if (token.owner == signer.getAddress() && token.collectionID === 0) {
            noCollections.elements.push({
                NFTName : token.name,
                NFTDescription : token.description,
                tokenID : i,
                tokenURI : NFT_Marketplace.tokenURI(i),
                isNFTListed : token.isListed,
                highestBidder : token.highestBidder,
                highestBid : token.highestBid,
                startingPrice : token.startingPrice,
                deadline : token.deadline
            });
        }
    }

    output.push(noCollections);

    return output;
}
