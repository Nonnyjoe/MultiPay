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
    
    
    function getDayFromTimestamp(uint256 timestamp) internal pure returns (uint256) {
        (uint256 year, uint256 month, uint256 day) = timestampToDate(timestamp);     
        return day;
    }

    function timestampToDate(uint256 timestamp) public pure returns (uint256 year, uint256 month, uint256 day) {
        uint256 daysSinceEpoch = timestamp / 86400;
        uint256 numLeapYears = (daysSinceEpoch - 1) / 1461; 
        uint256 numNonLeapYears = daysSinceEpoch - numLeapYears;
        year = numLeapYears * 4 + numNonLeapYears / 365;
        uint256 dayOfYear = numNonLeapYears % 365;
        for (uint256 i = 1; i <= 12; i++) {
            uint256 daysInMonth = getDaysInMonth(i, year);
            if (dayOfYear < daysInMonth) {
                month = i;
                day = dayOfYear + 1; 
                break;
            }
            dayOfYear -= daysInMonth;
        }
    }
    function getDaysInMonth(uint256 month, uint256 year) public pure returns (uint256) {
        if (month == 2) {
            if (isLeapYear(year)) {
                return 29;
            } else {
                return 28;
            }
        } else if (month <= 7) {
            return 30 + (month % 2);
        } else {
            return 31 - (month % 2);
        }
    }
    function isLeapYear(uint256 year) public pure returns (bool) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

}
