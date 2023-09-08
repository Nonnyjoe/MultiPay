// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/interfaces/IERC1155.sol";
import "../src/interfaces/IERC20.sol";

contract CompanyContract {
    // TODO: Change address zero to USDC address and NFT contract
    address public tokenForPayment = address(0);
    address public tokenForReceipt = address(0);

    string public name;
    string public symbol;
    address public admin;
    uint256 public nftId;
    uint256 public oneMonthTimestamp = 2629743;
    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    // mapping (uint256 => PlansDetails) public IdToPlanDetails;
    mapping (address => uint256[]) public userToSubscriptions;
    mapping (address => mapping(uint256 => uint256)) trackUsersubscription;
    mapping (uint256 => address[]) public TrackDayToUsers;
    uint trackedPlaniDs;
    
    struct PlansDetails {
        string planName;
        uint256 price;
        uint planID;
        bool planActive;
        uint256 planDuration;
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

    modifier onlyOwner {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }


    constructor(string memory _name, string memory _symbol, uint256 _nftId, address _admin){
        name = _name;
        symbol = _symbol;
        nftId = _nftId;
        admin = _admin;

    }

    function createPlan(string memory _planName, uint _planPrice, uint256 _planDuration) public onlyOwner {
        PlansDetails storage _newPlan = availiablePlans[trackedPlaniDs];
        _newPlan.planName = _planName;
        _newPlan.price = _planPrice;      
        _newPlan.planID = trackedPlaniDs;      
        _newPlan.planDuration = _planDuration;      
        availiablePlans.push(_newPlan);
        trackedPlaniDs++;
    }

    function activatePlan(uint256 _planId) public returns (bool success) {
        
    }

    function deactivatePlan(uint256 _planId) public returns (bool success) {

    }

    function subscribe(string memory _userEmail, bool _autoSubscribe, uint256 _planId) public returns (uint256 userId){
        PlansDetails storage _planToSub = availiablePlans[_planId];

        require(_planToSub.planActive, "Plan deactivated");

        uint256 planDuration = _planToSub.planDuration;
        uint256 userSubEnds = block.timestamp + (planDuration * oneMonthTimestamp);
        UserDetails memory _userInfo =  UserDetails (msg.sender, _userEmail, block.timestamp, userSubEnds, _autoSubscribe);
        userToSubscriptions[msg.sender].push(_planId);
        trackUsersubscription[msg.sender][(userToSubscriptions[msg.sender].length)] = _planToSub.subscribersData.length;
        _planToSub.subscribersData.push(_userInfo);
        _planToSub.totalSubscribers++;
        TrackDayToUsers[getDayFromTimestamp(block.timestamp)].push(msg.sender);
        userId = _planToSub.subscribersData.length;
        IERC20(tokenForPayment).transferFrom(msg.sender, address(this), _planToSub.price);
        IERC1155(tokenForReceipt).safeTransferFrom(msg.sender, address(this), _planId, _planToSub.price, "");

    }

    function chainlinkDailyCall() public {
        address[] memory AutoRenewals = TrackDayToUsers[getDayFromTimestamp(block.timestamp)];
        for (uint i; i < AutoRenewals.length; i++) {
            uint256[] memory subscriptions = userToSubscriptions[AutoRenewals[i]];
            for (uint j; j < subscriptions.length; j++) {
                uint subIndex = trackUsersubscription[AutoRenewals[i]][subscriptions[j]];
                if(availiablePlans[subscriptions[j]].subscribersData[subIndex].autoSubscribe = true 
                && getDayFromTimestamp(availiablePlans[subscriptions[j]].subscribersData[subIndex].timeOfSubscription) == getDayFromTimestamp(block.timestamp)) {
                    autoRenew(subscriptions[j], AutoRenewals[i]);
                }
            }
        }
    }

    function autoRenew(uint256 _planId, address _user) public returns (bool success){
        // PlansDetails storage _planToSub = IdToPlanDetails[_planId];
       uint256 userIndex = trackUsersubscription[_user][_planId];
        uint256 planDuration = availiablePlans[_planId].planDuration;
       uint256 userSubEnds = block.timestamp + (planDuration * oneMonthTimestamp);

        uint256 userBallance = IERC20(tokenForPayment).balanceOf(_user);
        if ((userBallance / 1e18) >= availiablePlans[_planId].price) {
            IERC20(tokenForPayment).transferFrom(msg.sender, address(this), availiablePlans[_planId].price);
            availiablePlans[_planId].subscribersData[userIndex].timeOfSubscription = block.timestamp;
            availiablePlans[_planId].subscribersData[userIndex].subscriptionEnds = userSubEnds;            
        } else {

        }
        

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
        (, , uint256 day) = timestampToDate(timestamp);     
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


    function discontinuePlan() public {
        //prevent people from renewing the plan and creating the plan
    }

    function viewPlan(uint256 _planId) public view returns (PlansDetails memory plan) {
        require(_planId <= availiablePlans.length(), "Plan does not exist");
        plan = availiablePlans[_planId];
    }
}
