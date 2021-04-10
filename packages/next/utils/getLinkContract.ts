import { Contract } from "@ethersproject/contracts";
import { Signer } from "@ethersproject/abstract-signer";

import abi from "../utils/abis/ERC20.json";

/**
 * Get the contract for Posting
 * @param signer 
 * @returns 
 */
const getLinkContract = (signer: Signer): Contract =>
  new Contract("0x01BE23585060835E02B77ef475b0Cc51aA1e0709", abi, signer);
export default getLinkContract;