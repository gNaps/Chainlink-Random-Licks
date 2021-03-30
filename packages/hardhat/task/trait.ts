// //import { task } from "hardhat/config";
// require("hardhat/config")
// //import { MintRandomLick } from "../typechain";

// task("Trait", "Mint a new token with Chainlink VRF")
//     .addParam("id", "The Token Id to Verify")
//     .setAction(async (_taskArgs, { ethers }) => {
//         const CardContract = (await ethers.getContractFactory("MintLicks"));
//         const trait = await CardContract.tokenURI(_taskArgs.id);
//         console.log("trait", trait);
//     });