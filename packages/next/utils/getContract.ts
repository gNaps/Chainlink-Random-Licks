import { Contract } from "@ethersproject/contracts";
import { Signer } from "@ethersproject/abstract-signer";

import abi from "../../subgraph/abis/MintLicks.json";

/**
 * Get the contract for Posting
 * @param signer 
 * @returns 
 */
const getContract = (signer: Signer): Contract =>
  new Contract("0xe0130e00FED32004D8B50001CFC8F3e3605940Ad", abi, signer);
export default getContract;