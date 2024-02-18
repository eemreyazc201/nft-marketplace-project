const { ethers, artifacts } = require ("hardhat");

async function main () {
    const [deployer] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("NFT_Marketplace");
    const marketplace = await Marketplace.deploy();

    console.log(`Contract address: ${marketplace.address}`);
    console.log(artifacts.readArtifactSync("NFT_Marketplace").abi);
}

main().then(() => {process.exit(0);}).catch((error) => {console.error(error); process.exit(1);});