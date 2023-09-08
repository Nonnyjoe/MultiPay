
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CompanyContract.sol";

contract FactoryCon {
    struct CompanyDetails {
        string CompanyName;
        string CompanySymbol;
        address adminAddress;
        address CompanyAddress;
    }

    CompanyDetails[] public allCompanies;
    mapping (address => CompanyDetails) public addressToCompanyDetails;
    uint256 public totalCompaniesID;
    address[] public companyAddresses;
    address public admin;
    //owner => company ID
    mapping (address => address) public ownerToCompany;
    //company address => companyID
    mapping (address => uint256) public Identity;
    bool paused;
    constructor( ) {
        admin = msg.sender;
    }

    function createCompany(string memory _name, string memory _symbol) public returns (CompanyDetails memory) {
        totalCompaniesID++;
        CompanyContract _companyCon = new CompanyContract(_name, _symbol, totalCompaniesID);

        CompanyDetails storage _company = allCompanies[totalCompaniesID];
        _company.CompanyName = _name;
        _company.CompanySymbol = _symbol;
        _company.adminAddress = msg.sender;
        _company.CompanyAddress = address(_companyCon);



        return (_company);
    }


    function GetALLAddresses() external view returns(CompanyDetails[] memory){
        return allCompanies;
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