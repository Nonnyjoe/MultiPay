// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CompanyContract {
    
    struct PlansDetails {
        string planName;
        uint256 price;
        uint256 totalSubscribers;
        uint planID;
        UserDetails[] subscribersData;
    }

    struct UserDetails {
        address userAddress;
        string userEmail;
        uint256 timeOfSubscription;
        uint256 subscriptionEnds;
        bool autoSubscribe;
    }
    string public name;
    string public symbol;
    address public admin;
    uint256 public nftId;
    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    mapping (uint256 => PlansDetails) public IdToPlanDetails;
    uint trackedPlaniDs;



    constructor(string memory _name, string memory _symbol, uint256 _nftId){
        name = _name;
        symbol = _symbol;
        nftId = _nftId;
        admin = msg.sender;

    }


    function createPlan(string memory _planName, uint _planPrice) public {
        IdToPlanDetails[trackedPlaniDs].planName = _planName;
        IdToPlanDetails[trackedPlaniDs].price = _planPrice;      
        availiablePlans.push(IdToPlanDetails[trackedPlaniDs]);
        trackedPlaniDs++;
    }

    function subscribe(uint256 PlanId) public {
        //
    }

    function autoRenew() public {
        // number++;
    }
    
    function AvailablePlans() public view returns(PlansDetails[] memory){
        return availiablePlans;
    }

    function getCompanyDetails() public view returns(string memory name_, string memory symbol_, address admin_, address companyAddress_) {
        name_ = name;
        symbol_ = symbol;
        admin_ = admin;
        companyAddress_ = address(this);
    }
}
