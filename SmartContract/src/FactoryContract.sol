
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CompanyContract.sol";

contract FactoryCon {
    address public admin;
    uint256 public totalCompanies = 0;
    address[] public allCompanyAddress;
    uint256 public totalCompaniesID;
    address[] companyAddresses;
    //owner => company ID
    mapping (address => address) public ownerToCompany;
    //company address => companyID
    mapping (address => uint256) public Identity;
    bool paused;
    constructor( ) {
        admin = msg.sender;
    }

    function createCompany(string memory _name, string memory _symbol) public returns (address) {
        CompanyContract _companyCon = new CompanyContract(_name, _symbol, totalCompanies);
        allCompanyAddress.push(address(_companyCon));
        totalCompanies++;
        return (address(_companyCon));
    }
    function GetALLAddresses() external view returns(address[] memory){
        return allCompanyAddress;
    }
    function GetSpecificAddress(address _SmartAcctAddress) external view returns(address){
        return ownerToCompany[_SmartAcctAddress];
    }
     function pause() external{
        require(msg.sender == admin, 'Not authorized');
        paused = true;
    }
    function unpause() external {
        require(msg.sender == admin);
        paused = false;
    }
}