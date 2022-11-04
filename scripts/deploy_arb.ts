import { IERC20__factory, Arb__factory } from "../typechain-types";
import hre from "hardhat"

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const arbFactory = await hre.ethers.getContractFactory('Arb', deployer);
    const arbContract = await arbFactory.deploy();

    console.log("deployer: ", deployer.address);
    console.log("owner: ", await arbContract.getOwner());

    const format = ['uint256', 'uint256', 'uint256', 'address', 'address', 'address']
    // deimal = 18
    const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    // deimal = 6
    const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    const Curvepool = '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46'
    const Uniswappool = '0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36'

    const data1 = hre.ethers.utils.defaultAbiCoder.encode(format, [2, 2, 0, WETH, USDT, Curvepool]);
    const data2 = hre.ethers.utils.defaultAbiCoder.encode(format, [1, 0, 0, USDT, WETH, Uniswappool]);
    await arbContract.connect(deployer).execute([data1, data2], hre.ethers.utils.parseEther("1.0"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
