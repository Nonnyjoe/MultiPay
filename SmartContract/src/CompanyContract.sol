// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CompanyContract {

    string public name;
    string public symbol;
    address public admin;
    uint256 public nftId;
    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    mapping (uint256 => PlansDetails) public IdToPlanDetails;

    struct PlansDetails {
        string planName;
        uint256 price;
        uint256 totalSubscribers;
        UserDetails[] subscribersData;
    }

    struct UserDetails {
        address userAddress;
        string userEmail;
        uint256 timeOfSubscription;
        uint256 subscriptionEnds;
        bool autoSubscribe;
    }


    constructor(string memory _name, string memory _symbol, uint256 _nftId){
        name = _name;
        symbol = _symbol;
        nftId = _nftId;
        admin = msg.sender;

    }


    function createPlan(uint256 newNumber) public {
        //
    }

    function subscribe(uint256 PlanId) public {
        //
    }

    function autoRenew() public {
        // number++;
    }
}
