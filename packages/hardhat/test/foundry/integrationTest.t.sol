// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/Script.sol";
import "../../src/FactoryContract.sol";
import "../../src/interfaces/ICHILD.sol";
import {ERC1155Receipt} from "../../src/ERC1155.sol";
import {MyToken} from "../../src/erc20.sol";


contract integrationTest is Test {
    FactoryCon public factory;
    MyToken public paymentToken;
    ERC1155Receipt public receiptToken;
    address child;

    function setUp() public {
        paymentToken = new MyToken();
        receiptToken = new ERC1155Receipt('');
        factory = new FactoryCon(address(receiptToken), address(paymentToken)); 
        child = factory.createCompany("Spotify", "SPTY");
    }

    function testCreatePlan() public {
        ICHILD(child).createPlan("Premium", 100 * 10**18, 1);
        ICHILD(child).activatePlan(0);
    }

    function testDeactivateePlan() public {
        testCreatePlan();
        ICHILD(child).deactivatePlan(0);
    }

    function testSubscription() public {
        testCreatePlan();
        paymentToken.mint(address(0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8), 120 * 10**18);
        vm.startPrank(address(0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8));
        paymentToken.approve(child, 120 * 10**18);
        ICHILD(child).subscribe("test@gmail.com", true, 0);
        vm.stopPrank();
    }

    function testDeactivateSub() public {
        testSubscription();
        vm.startPrank(address(0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8));
        ICHILD(child).unSubscribe(0, 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8);
    }



    // function testSetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
