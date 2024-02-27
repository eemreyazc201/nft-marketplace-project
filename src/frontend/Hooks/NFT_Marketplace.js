import { ethers } from 'ethers';

import Marketplace_ABI from '../contractsDataForHooks/Marketplace_ABI.json';
import Marketplace_Address from '../contractsDataForHooks/Marketplace_ADDRESS.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const Marketplace = new ethers.Contract(Marketplace_Address.address, Marketplace_ABI.abi, signer);

export async function createNFT (tokenURI, name, description, collectionID) {
    Marketplace.createNFT(tokenURI, name, description, collectionID).wait();
    (await Marketplace.setApprovalForAll(Marketplace_Address.address, true)).wait()
}

export async function createCollection (name, description) {
    await Marketplace.createCollection(name, description);
}

export async function setCollection (collectionID, tokenID) {
    Marketplace.setCollection(collectionID, tokenID).wait();
}

export async function setCollectionPrice (collectionID, price) {
    Marketplace.setCollectionPrice(collectionID, price).wait();

}

export async function buyCollection (collectionID) {
    Marketplace.buyCollection(collectionID).wait();

}

export async function sellNFT (tokenID, startingPrice, deadline) {
    if (deadline < Date.now()) throw new Error('Deadline must be in the future');
    let unixTime = Math.floor(deadline.getTime() / 1000);
    Marketplace.sellNFT(tokenID, startingPrice, unixTime).wait();
}

export async function bid (tokenID, etherInput) {
    let weiAmount = ethers.utils.parseEther(etherInput);
    Marketplace.bid(tokenID, { value : weiAmount }).wait();

}

export async function finishAuction (tokenID) {
    Marketplace.finishAuction(tokenID).wait();
}

export async function cancelAuction (tokenID) {
    Marketplace.cancelAuction(tokenID).wait();
}

export async function getMyNFTs () {
    const output = [];

    for (let i = 0; i < Marketplace.getCollectionCounter(); i++) {
        const Collection = await Marketplace.Collections(i);
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
            const token = await Marketplace.NFTs(collection.NFTs[j]);
            collection.elements.push({
                NFTName : token.name,
                NFTDescription : token.description,
                tokenID : collection.NFTs[j],
                tokenURI : Marketplace.tokenURI(collection.NFTs[j]),
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

    for (let i = 0; i < Marketplace.getNFTCounter(); i++) {
        const token = await Marketplace.NFTs(i);
        if (token.owner == signer.getAddress() && token.collectionID === 0) {
            noCollections.elements.push({
                NFTName : token.name,
                NFTDescription : token.description,
                tokenID : i,
                tokenURI : Marketplace.tokenURI(i),
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
