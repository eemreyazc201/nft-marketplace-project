const { ethers, artifacts } = require ("hardhat");

async function main () {
    const [deployer] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("Marketplace").then((contract) => contract.deploy());

    saveForFrontend(Marketplace, "Marketplace");
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
            JSON.stringify({ abi : artifacts.readArtifactSync("Marketplace").abi }, null, 2)
        );
    }
}