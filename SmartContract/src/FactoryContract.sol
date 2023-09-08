
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CompanyContract.sol";

contract FactoryCon {

    // mapping (address => CompanyDetails) public addressToCompanyDetails;
    uint256 public totalCompaniesID;
    address[] public companyAddresses;
    address public admin;
    //owner => company ID
    mapping (address => address) public ownerToCompany;
    //company address => companyID
    mapping (address => uint256) public Identity;
    mapping(address => bool) contractAccountStatus;
    //smartAccount address to array of child contract subscribed to.
    mapping(address => address[]) public AllSubscriptionContracts;
    bool paused;

    constructor( ) {
        admin = msg.sender;
    }

    function createCompany(string memory _name, string memory _symbol) public  {
        totalCompaniesID++;
        CompanyContract _companyCon = new CompanyContract(_name, _symbol, totalCompaniesID, msg.sender);
        companyAddresses.push(address(_companyCon));
        ownerToCompany[msg.sender] = address(_companyCon);
        Identity[address(_companyCon)] = totalCompaniesID;
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
    }
    function unpause() external {
        require(msg.sender == admin);
        paused = false;
    }
    function AccountcontractState(address contractAccount) public view returns(bool) {
        return contractAccountStatus[contractAccount];
    }
    
    function UpdateSubscriptionContracts(address _contractSubAddress, address _caller) external returns(bool) {
        bool status = AccountcontractState(msg.sender);
        require(status == true, 'NOT_AUTHORIZED');
        AllSubscriptionContracts[_caller].push(_contractSubAddress);
        return true;
    }
    
    function returnAllSubscripton(address _caller)external view returns(address[] memory){      
        return AllSubscriptionContracts[_caller];
    } 
}