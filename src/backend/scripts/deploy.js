const { ethers, artifacts } = require ("hardhat");

async function main () {
    const [deployer] = await ethers.getSigners();

    const NFT_Marketplace = await ethers.getContractFactory("NFT_Marketplace").then((contract) => contract.deploy());

    saveForFrontend(NFT_Marketplace, "NFT_Marketplace");
}

main().then(() => {process.exit(0);}).catch((error) => {console.error(error); process.exit(1);});

function saveForFrontend (contract, contractName) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../../frontend/contractsDataForHooks";
    
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    } else {
        fs.writeFileSync(
            contractsDir + `/${contractName}_ADDRESS.json`,
            JSON.stringify({ address : contract.address }, undefined, 2)
        );

        fs.writeFileSync(
            contractsDir + `/${contractName}_ABI.json`,
            JSON.stringify({ abi : artifacts.readArtifactSync("NFT_Marketplace").abi }, null, 2)
        );
    }
}