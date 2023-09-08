// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "./Ifactory.sol";


contract ERC1155Receipt is ERC1155 {

  address public factoryAddress;
    address public owner;

    constructor(string memory _uri) ERC1155(_uri){
        owner = msg.sender;
    }

    function MintSubScription(address to, uint id, uint amount) external{
        //this should be payable with erc20, while we pay for gas from gas tank set up alongside account abstraction.
        // gas + subscription fee should be deducted from erc20
        bool result = Ifactory(factoryAddress).AccountcontractState(msg.sender);
        require(to != address(0), 'non-zero');
        require(result == true, 'no account');
        _mint(to, id, amount, '');
    }
    // Burn factor to be decided
    //over-rides
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        revert('non-transferable');
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
       revert('non-transferable');
    }

}