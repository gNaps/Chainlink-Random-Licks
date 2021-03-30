// import { task } from "hardhat/config";
// import { MintRandomLick } from "../typechain";

// //import { TASK_MINT } from "./task-names";

// task("Mint", "Mint a new token with Chainlink VRF", async (_taskArgs, { ethers }) => {
//     const CardContract = (await ethers.getContract("MintRandomLick"));
//     try {
//         const mint = await CardContract.mintItem(9876541233);
//         const end = await mint.wait();
//         console.log("mint", end.blockNumber);
//     } catch (err) {
//         console.log("err", err);
//     }
// });
