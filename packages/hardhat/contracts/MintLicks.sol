pragma solidity 0.6.12;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract MintLicks is ERC721, VRFConsumerBase {

  //event SetPurpose(address sender, string purpose);

  //string public purpose = "Building Unstoppable Apps";

  /** Counters */
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  /** Chainlink VRF */
  bytes32 internal keyHash;
  uint256 internal fee;

  mapping(bytes32 => address) requestToSender; // Keep track of which request was initiated by who

  /** @dev Art generation rules */
  uint public constant SIZE = 8; //How many notes per Lick
  bytes prefix = "data:text/plain;charset=utf-8,"; // Prefix, see autoglyphs

  constructor() public VRFConsumerBase(
    0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
    0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
  ) ERC721("Licks", "LICK") {
    keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
    fee = 0.1 * 10 ** 18; // 0.1 LINK
  }

  // function setPurpose(string memory newPurpose) public {
  //   purpose = newPurpose;
  //   console.log(msg.sender,"set purpose to",purpose);
  //   emit SetPurpose(msg.sender, purpose);
  // }

  /** @dev Chainlink callback which mints the new token */
  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    _mint(requestToSender[requestId], randomness);
  }

  function mintItem(uint256 userProvidedSeed)
      public
      returns (bytes32)
  {
      bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
      requestToSender[requestId] = msg.sender;

      return requestId;
  }

  // Given token id, return the token it represents
  function draw(uint256 id) public view returns (string memory) {
    bytes memory output = new bytes(SIZE * (SIZE + 3) + 30);
    for (uint c = 0; c < 30; c++) {
      output[c] = prefix[c];
    }
    for (uint i = uint(30); i < SIZE + 30; i++) {
      uint digit = (id / (10 ** i)) % 10;
      if (digit == 1){
        output[i] = "E";
      } else if (digit == 2){
        output[i] = "F";
      } else if (digit == 3){
        output[i] = "G";
      } else if (digit == 4){
        output[i] = "A";
      } else if (digit == 5){
        output[i] = "B";
      } else if (digit == 6){
        output[i] = "C";
      } else if (digit == 7){
        output[i] = "D";
      } else {
        output[i] = "_"; // Pause on 0, 8 and 9
      }
    }
    
    string memory result = string(output);
    return result;
  }

  /**
  * @dev A distinct URI (RFC 3986) for a given NFT.
  * @param _tokenId Id for which we want uri.
  * @return URI of _tokenId.
  */
  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
      return draw(_tokenId); //Convert to bytes
  }

  

}
