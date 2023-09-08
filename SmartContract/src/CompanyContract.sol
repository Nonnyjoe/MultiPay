// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CompanyContract {

    // TODO: Change address zero to USDC address
    address public tokenForPayment = address(0);

    string public name;
    string public symbol;
    address public admin;
    uint256 public nftId;
    uint256 public totalSubAvailiable;
    PlansDetails[] public availiablePlans;
    mapping (uint256 => PlansDetails) public IdToPlanDetails;
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

    modifier onlyOwner() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }


    constructor(string memory _name, string memory _symbol, uint256 _nftId){
        name = _name;
        symbol = _symbol;
        nftId = _nftId;
        admin = msg.sender;

    }


    function createPlan(string memory _planName, uint _planPrice, uint256 _planDuration) public {
        IdToPlanDetails[trackedPlaniDs].planName = _planName;
        IdToPlanDetails[trackedPlaniDs].price = _planPrice;      
        IdToPlanDetails[trackedPlaniDs].planID = trackedPlaniDs;      
        IdToPlanDetails[trackedPlaniDs].planDuration = _planDuration;      
        availiablePlans.push(IdToPlanDetails[trackedPlaniDs]);
        trackedPlaniDs++;
    }

    function activatePlan(uint256 _planId) public returns (bool success) {
        
    }

    function deactivatePlan(uint256 _planId) public returns (bool success) {

    }

    function subscribe(string memory _userEmail, bool _autoSubscribe, uint256 _planId) public returns (uint256 userId){
        PlansDetails storage _planToSub = IdToPlanDetails[_planId];

        require(_planToSub.planActive, "Plan deactivated");

        uint256 planDuration = _planToSub.planDuration;
        uint256 userSubEnds = block.timestamp + planDuration;
        UserDetails memory _userInfo =  UserDetails (msg.sender, _userEmail, block.timestamp, userSubEnds, _autoSubscribe);

        _planToSub.subscribersData.push(_userInfo);
        _planToSub.totalSubscribers++;

    }

    function autoRenew(uint256 _planId) public returns (bool success){
        PlansDetails storage _planToSub = IdToPlanDetails[_planId];

        require(_planToSub.planActive, "Plan is not active");

    }
    
    function AvailablePlans() public view returns(PlansDetails[] memory){
        return availiablePlans;
    }

    function discontinuePlan() public {
        //prevent people from renewing the plan and creating the plan
    }

    function viewPlan(uint256 _planId) public view returns (PlansDetails memory userPlan) {
        userPlan = IdToPlanDetails[_planId];
    }
}
