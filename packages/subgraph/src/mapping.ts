import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  MintLicks,
  Transfer
} from "../generated/MintLicks/MintLicks"
import { Token } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  let token = Token.load(event.params.tokenId.toString());

  if(!token) {
    token = new Token(event.params.tokenId.toString());
  }

  let contract = MintLicks.bind(Address.fromString("0xe0130e00FED32004D8B50001CFC8F3e3605940Ad"));
  token.tokenUri = contract.tokenURI(event.params.tokenId);
  token.owner = event.params.to.toHex();
  token.save();
}
