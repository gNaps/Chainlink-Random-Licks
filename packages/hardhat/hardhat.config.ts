import { Transaction, utils } from "ethers";
import * as fs from "fs";
import "@nomiclabs/hardhat-waffle";
import "@tenderly/hardhat-tenderly";
import "@nomiclabs/hardhat-etherscan";

//import "./task/mint";
//import "./task/trait";
import { task } from "hardhat/config";

import "hardhat-deploy";

const { isAddress, getAddress, formatUnits, parseUnits } = utils;
const defaultNetwork = "rinkeby";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
  }
  return "";
}

const config = {
  defaultNetwork,
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
      gasPrice: 1000000000
    },
    kovan: {
      url: "https://kovan.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],

  },
  etherscan: {
    apiKey: "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8"
  }
};

export default config;



task("account", "Get balance informations for the deployment account.", async (_, { ethers }) => {
  const hdkey = require('ethereumjs-wallet/hdkey');
  const bip39 = require("bip39")
  let mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim()
  
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0
  let fullPath = wallet_hdpath + account_index
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = "0x" + wallet._privKey.toString('hex');
  var EthUtil = require('ethereumjs-util');
  const address = "0x" + EthUtil.privateToAddress(wallet._privKey).toString('hex')

  var qrcode = require('qrcode-terminal');
  qrcode.generate(address);
  console.log("‍📬 Deployer Account is " + address)
  for (let n in config.networks) {
    //console.log(config.networks[n],n)
    try {

      let provider = new ethers.providers.JsonRpcProvider(config.networks[n].url)
      let balance = (await provider.getBalance(address))
      console.log(" -- " + n + " --  -- -- 📡 ")
      console.log("   balance: " + ethers.utils.formatEther(balance))
      console.log("   nonce: " + (await provider.getTransactionCount(address)))
    } catch (e) {
    }
  }

});

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account) => console.log(account));
});

task("Mint", "Mint a new token with Chainlink VRF", async (_taskArgs, { ethers }) => {
    const CardContract = (await ethers.getContractAt("MintLicks", "0xe0130e00FED32004D8B50001CFC8F3e3605940Ad"));
    //const CardContract = (await ethers.getContract("MintLicks"));

    try {
        const mint = await CardContract.mintItem(9876541233);
        const end = await mint.wait();
        console.log("mint", end.blockNumber);
    } catch (err) {
        console.log("err", err);
    }
});

task("Trait", "Mint a new token with Chainlink VRF")
  .addParam("id", "The Token Id to Verify")
  .setAction(async (_taskArgs, { ethers, getNamedAccounts }) => {
      const CardContract = (await ethers.getContractAt("MintLicks", "0xe0130e00FED32004D8B50001CFC8F3e3605940Ad"));
      const account = await getNamedAccounts();
      const trait = await CardContract.tokenURI(_taskArgs.id);
      console.log("trait", trait);
      console.log("account", account);
  });
