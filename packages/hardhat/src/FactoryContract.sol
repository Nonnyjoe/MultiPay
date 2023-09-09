
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CompanyContract.sol";

contract FactoryCon {

    // mapping (address => CompanyDetails) public addressToCompanyDetails;
    uint256 public totalCompaniesID;
    address[] public companyAddresses;
    address public admin;
    address tokenForReceipt;
    //owner => company ID
    mapping (address => address) public ownerToCompany;
    //company address => companyID
    mapping (address => uint256) public Identity;
    mapping(address => bool) contractAccountStatus;
    //smartAccount address to array of child contract subscribed to.
    mapping(address => address[]) public AllSubscriptionContracts;
    mapping (address => mapping (address => uint)) public trackUserSubIndex;
    bool paused;

    // EVENTS
    event companyCreated(string name, string symbol, address companyContract);
    event contractPaused (bool paused);



    constructor( address _tokenForReceipt ) {
        admin = msg.sender;
        tokenForReceipt = _tokenForReceipt;
    }

    function createCompany(string memory _name, string memory _symbol) public  {
        totalCompaniesID++;
        CompanyContract _companyCon = new CompanyContract(_name, _symbol, totalCompaniesID, msg.sender, address(this), tokenForReceipt);
        companyAddresses.push(address(_companyCon));
        ownerToCompany[msg.sender] = address(_companyCon);
        Identity[address(_companyCon)] = totalCompaniesID;
        contractAccountStatus[address(_companyCon)] = true;
        emit companyCreated(_name, _symbol, address(_companyCon));
    }


    function GetALLAddresses() external view returns(address[] memory ){
        return companyAddresses;
    }

    function GetSpecificAddress(address _owner) external view returns(address){
        return ownerToCompany[_owner];
    }
     function pause() external{
        require(msg.sender == admin, 'Not authorized');
        paused = true;
        emit contractPaused(true);
    }
    function unpause() external {
        require(msg.sender == admin);
        paused = false;
        emit contractPaused(false);
    }
    function AccountcontractState(address contractAccount) public view returns(bool) {
        return contractAccountStatus[contractAccount];
    }
    
    function UpdateSubscriptionContracts( address _caller) external returns(bool) {
        bool status = AccountcontractState(msg.sender);
        require(status == true, 'NOT_AUTHORIZED');
        trackUserSubIndex[_caller][msg.sender] = AllSubscriptionContracts[_caller].length;
        AllSubscriptionContracts[_caller].push(msg.sender);
        return true;
    }

    function RemoveSubscribedContract( address _caller) external returns(bool) {
        bool status = AccountcontractState(msg.sender);
        require(status == true, 'NOT_AUTHORIZED');
        if (AllSubscriptionContracts[_caller].length > 1){
            address lastSub = AllSubscriptionContracts[_caller][AllSubscriptionContracts[_caller].length - 1];
            uint removeIndex = trackUserSubIndex[_caller][msg.sender];
            uint lastIndex = trackUserSubIndex[_caller][lastSub];
            AllSubscriptionContracts[_caller][removeIndex] = AllSubscriptionContracts[_caller][lastIndex];
            AllSubscriptionContracts[_caller].pop();
            trackUserSubIndex[_caller][lastSub] = removeIndex;
        } else {
            if (AllSubscriptionContracts[_caller][0] == msg.sender){
                AllSubscriptionContracts[_caller].pop();
            }
        }
        return true;
    }

    
    function returnAllSubscripton(address _caller)external view returns(address[] memory){      
        return AllSubscriptionContracts[_caller];
    } 
}