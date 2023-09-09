// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IERC1155 {

 function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes calldata data) external;
 function MintSubScription(address to, uint id, uint amount) external; 
}