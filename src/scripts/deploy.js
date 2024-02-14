const { ethers } = require ("hardhat");

async function main () {
    const [deployer] = await ethers.getSigners();

    const Lock = ethers.getContractFactory("Lock");
    const lock = await Lock.deploy("dca69df7e07e190f291d8a03f903c701c987025e24c12015b0d27521cacecd6f");

    console.log(`Contract address: ${lock.address}`);
}

main().then(() => {process.exit(0);}).catch((error) => {console.error(error); process.exit(1);});