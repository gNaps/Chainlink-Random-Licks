import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  MintLicks,
  Transfer
} from "../generated/MintLicks/MintLicks"
import { Token } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  log.debug("i'm here", []);
  log.debug(event.params.from.toString(), []);
  if(event.params.from === Address.fromI32(0)) {
    // Mint event, new token has been create
    let token = new Token(event.params.tokenId.toString());
    log.debug(token.id, []);
    token.owner = event.params.to.toHex();

    let contract = MintLicks.bind(Address.fromString("0xe0130e00FED32004D8B50001CFC8F3e3605940Ad"));
    token.tokenUri = contract.tokenURI(event.params.tokenId);
    token.save();
  } else {
    let token = Token.load(event.params.tokenId.toString());
    log.debug(token.id, []);
    token.owner = event.params.to.toHex();
    token.save();
  }
}
