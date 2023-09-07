// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ChildCon {

    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    mapping (uint256 => PlanDetails) public IdToPlanDetails;

    struct PlansDetails {
        string planName;
        uint256 price;
        uint256 totalSubscribers;
        UserDetails[] subscribersData;
    }

    struct UserDetails {
        address userAddress;
        
        uint256 timeOfSubscription;
        uint256 subscriptionEnds;
        bool autoSubscribe;
    }

    function createPlan(uint256 newNumber) public {
        //
    }

    function subscribe(uint256 PlanId) public {
        //
    }

    function autoRenew() public {
        number++;
    }
}



