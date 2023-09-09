// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/interfaces/IERC1155.sol";
import "../src/interfaces/IERC20.sol";
import "../src/interfaces/IFACTORY.sol";

contract CompanyContract {
    // TODO: Change address zero to USDC address and NFT contract
    address public tokenForPayment;
    address public tokenForReceipt;
    address public factoryContract;

    string public name;
    string public symbol;
    address public admin;
    uint256 public nftId;
    uint256 public oneMonthTimestamp = 2629743;
    uint256 public lastCallTime;
    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    mapping (address => uint256[]) public userToSubscriptions;
    mapping (address => mapping (uint256 => uint256)) public subscriptionIndex4User;
    mapping (address => mapping(uint256 => uint256)) trackUsersubscription;
    mapping (uint256 => address[]) public TrackDayToUsers;
    mapping (uint256 => UserDetails[]) public subscribersData;
    uint trackedPlaniDs;
    mapping (uint => bool) public activattionStatus;
    
    struct PlansDetails {
        string planName;
        uint256 price;
        uint planID;
        bool planActive;
        uint256 planDuration;
        uint256 totalSubscribers;
    }


    struct UserDetails {
        address userAddress;
        string userEmail;
        uint256 timeOfSubscription;
        uint256 subscriptionEnds;
        bool autoSubscribe;
        bool subscriptionStatus;
    }


    // EVENTS
    event planCreated(string name, uint256 price, uint256 duration, uint256 planId);
    event planActive(uint256 planId, bool planActive);
    event userSubscribed(string email, bool autoSubscribe, address userAddress, string planName);
    event subscriptionsUpdated(uint256 time, uint256 totalSubsUpdated);
    event userRenewed(uint256 planId, address userAddress, bool renewed, uint256 startTime, uint256 endTime);

    modifier onlyOwner {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }


    constructor(string memory _name, string memory _symbol, uint256 _nftId, address _admin, address _factoryContract, address _tokenForReceipt, address _tokenForPayment){
        name = _name;
        symbol = _symbol;
        nftId = _nftId;
        admin = _admin;
        factoryContract = _factoryContract;
        tokenForReceipt = _tokenForReceipt;
        tokenForPayment = _tokenForPayment;
    }

    function createPlan(string memory _planName, uint _planPrice, uint256 _planDuration) public onlyOwner {
   
        availiablePlans.push(PlansDetails({
            planName: _planName,
            price: _planPrice,
            planID: trackedPlaniDs,
            planDuration: _planDuration,
            planActive: false,
            totalSubscribers: 0
        }));
        emit planCreated(_planName, _planPrice, _planDuration, trackedPlaniDs);
        trackedPlaniDs++;
    }

    function activatePlan(uint256 _planId) public onlyOwner returns (bool) {
        require(_planId <= availiablePlans.length, "Plan does not exist");
        availiablePlans[_planId].planActive = true;
        emit planActive(_planId, availiablePlans[_planId].planActive);
        return true;
    }

    function deactivatePlan(uint256 _planId) public onlyOwner returns (bool) {
        require(_planId <= availiablePlans.length, "Plan does not exist");
        availiablePlans[_planId].planActive = false;
        emit planActive(_planId, availiablePlans[_planId].planActive);
        return true;
    }

    function subscribe(string memory _userEmail, bool _autoSubscribe, uint256 _planId) public returns (uint256 userId){
        PlansDetails storage _planToSub = availiablePlans[_planId];

        require(_planToSub.planActive, "Plan deactivated");
        uint256 planDuration = _planToSub.planDuration;
        uint256 userSubEnds = block.timestamp + (planDuration * oneMonthTimestamp);
        UserDetails memory _userInfo =  UserDetails (msg.sender, _userEmail, block.timestamp, userSubEnds, _autoSubscribe, true);
        subscriptionIndex4User[msg.sender][_planId] = userToSubscriptions[msg.sender].length;
        userToSubscriptions[msg.sender].push(_planId);
        trackUsersubscription[msg.sender][_planId] = subscribersData[_planId].length;
        subscribersData[_planId].push(_userInfo);
        _planToSub.totalSubscribers++;
        TrackDayToUsers[getDayFromTimestamp(1694234614)].push(msg.sender);
        emit userSubscribed(_userEmail, _autoSubscribe, msg.sender, _planToSub.planName);
        userId = subscribersData[_planId].length;
        IERC20(tokenForPayment).transferFrom(msg.sender, address(this), _planToSub.price);
        IERC1155(tokenForReceipt).MintSubScription(msg.sender, _planId, 1);
        IFACTORY(factoryContract).UpdateSubscriptionContracts(msg.sender);
    }

    function chainlinkDailyCall() public {
        require(lastCallTime >= 1 days - (3600 * 2), "Already called for today");
        address[] memory AutoRenewals = TrackDayToUsers[getDayFromTimestamp(block.timestamp)];
        for (uint i; i < AutoRenewals.length; i++) {
            uint256[] memory subscriptions = userToSubscriptions[AutoRenewals[i]];
            for (uint j; j < subscriptions.length; j++) {
                uint subIndex = trackUsersubscription[AutoRenewals[i]][subscriptions[j]];
                if(subscribersData[subscriptions[j]][subIndex].autoSubscribe = true 
                && getDayFromTimestamp(subscribersData[subscriptions[j]][subIndex].timeOfSubscription) == getDayFromTimestamp(block.timestamp) && 
                subscribersData[subscriptions[j]][subIndex].subscriptionStatus == true
                ) {
                    autoRenew(subscriptions[j], AutoRenewals[i]);
                }
            }
            emit subscriptionsUpdated(block.timestamp, AutoRenewals.length);
        }
        lastCallTime = block.timestamp;
    }

    function autoRenew(uint256 _planId, address _user) internal returns (bool success){
        // PlansDetails storage _planToSub = IdToPlanDetails[_planId];
       uint256 userIndex = trackUsersubscription[_user][_planId];
        uint256 planDuration = availiablePlans[_planId].planDuration;
       uint256 userSubEnds = block.timestamp + (planDuration * oneMonthTimestamp);

        uint256 userBallance = IERC20(tokenForPayment).balanceOf(_user);
        if ((userBallance / 1e18) >= availiablePlans[_planId].price) {
            IERC20(tokenForPayment).transferFrom(msg.sender, address(this), availiablePlans[_planId].price);
            subscribersData[_planId][userIndex].timeOfSubscription = block.timestamp;
            subscribersData[_planId][userIndex].subscriptionEnds = userSubEnds;   
            emit userRenewed(_planId, _user, true, block.timestamp, userSubEnds);        
            return true;
        } else {
            subscribersData[_planId][userIndex].subscriptionStatus = false;
            // emit AutorenewalFailed
            emit userRenewed(_planId, _user, false, subscribersData[_planId][userIndex].timeOfSubscription , 0);
            return false;
        }

    }

    function unSubscribe(uint256 _planId, address _user) external returns (bool success) {
        require(msg.sender == _user, "NOT AUTORIZED");
        uint256 userIndex = trackUsersubscription[_user][_planId];
        subscribersData[_planId][userIndex].subscriptionStatus = false;
        if (userToSubscriptions[msg.sender].length > 1) {
            uint subindex = subscriptionIndex4User[msg.sender][_planId];
            uint lastIndex = userToSubscriptions[msg.sender].length - 1;
            uint lastID = userToSubscriptions[msg.sender][lastIndex];
            userToSubscriptions[msg.sender][subindex] = userToSubscriptions[msg.sender][lastIndex];
            userToSubscriptions[msg.sender].pop();
            // subscriptionIndex4User[msg.sender][_planId] = 0;
            subscriptionIndex4User[msg.sender][lastID] = subscriptionIndex4User[msg.sender][_planId];
        } else {
            userToSubscriptions[msg.sender].pop();
            IFACTORY(factoryContract).RemoveSubscribedContract(_user);
        }
        return true;
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


    function viewPlan(uint256 _planId) public view returns (PlansDetails memory plan) {
        require(_planId <= availiablePlans.length, "Plan does not exist");
        plan = availiablePlans[_planId];
    }

}
