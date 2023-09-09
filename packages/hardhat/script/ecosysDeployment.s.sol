// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/FactoryContract.sol";
import "forge-std/Script.sol";
import {ERC1155Receipt} from "../src/ERC1155.sol";
import {MyToken} from "../src/erc20.sol";

contract ecosysDeployment is Script {
    FactoryCon public factory;
    MyToken public paymentToken;
    ERC1155Receipt public receiptToken;
    address child;
    function setUp() public {}

    function run() public {
         uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // uint256 deployerPrivateKey2 = vm.envUint("PRIVATE_KEY2");
        vm.startBroadcast(deployerPrivateKey);
        paymentToken = new MyToken();
        receiptToken = new ERC1155Receipt('');
        factory = new FactoryCon(address(receiptToken), address(paymentToken));   
        child = factory.createCompany("Spotify", "SPTY");
        // bytes memory factory = abi.encode(address(0), address(0));   
        // console1.log(factory);
    }
}
