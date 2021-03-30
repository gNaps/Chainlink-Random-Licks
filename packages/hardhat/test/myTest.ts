import { ethers } from "hardhat";
import { use, expect } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

describe("My Dapp", function () {
  let myContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("MintLicks");
      myContract = await YourContract.deploy();
    });

    describe("mintItem", () => {
      it("Mint a new token with Chainlink VRF", async () => {
        const mint = await myContract.mintItem(98675);
        const end = await mint.wait();
        console.log("mint", end.blockNumber);
      });
    });

    describe("tokenUri", () => {
      it("Mint a new token with Chainlink VRF", async () => {
        const trait = await myContract.tokenURI(98675);
        console.log("trait", trait);
      });
    });
  });
});
