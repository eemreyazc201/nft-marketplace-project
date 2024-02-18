import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import NFT_Marketplace_ABI from '../contractsDataForHooks/NFT_Marketplace_ABI.json';
import NFT_Marketplace_Address from '../contractsDataForHooks/NFT_Marketplace_Address.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const NFT_Marketplace = new ethers.Contract(NFT_Marketplace_Address.address, NFT_Marketplace_ABI.abi, signer);

export async function createNFT (tokenURI, name, description, collectionID) {
    await NFT_Marketplace.createNFT(tokenURI, name, description, collectionID).wait();
}

export async function createCollection (name, description) {
    await NFT_Marketplace.createCollection(name, description).wait();
}

export async function setCollection (collectionID, tokenID) {
    await NFT_Marketplace.setCollection(collectionID, tokenID).wait();
}

export async function setCollectionPrice (collectionID, price) {
    await NFT_Marketplace.setCollectionPrice(collectionID, price).wait();

}

export async function buyCollection (collectionID) {
    await NFT_Marketplace.buyCollection(collectionID).wait();

}

export async function sellNFT (tokenID, startingPrice, deadline) {
    if (deadline < Date.now()) throw new Error('Deadline must be in the future');
    uinxTime = Math.floor(deadline.getTime() / 1000);
    await NFT_Marketplace.sellNFT(tokenID, startingPrice, unixTime).wait();
}

export async function bid (tokenID, etherInput) {
    weiAmount = ethers.utils.parseEther(amount);
    await NFT_Marketplace.bid(tokenID, { value : weiAmount }).wait();

}

export async function finishAuction (tokenID) {
    await NFT_Marketplace.finishAuction(tokenID).wait();
}

export async function cancelAuction () {
    await NFT_Marketplace.cancelAuction(tokenID).wait();
}

export async function getMyNFTs () {





}
