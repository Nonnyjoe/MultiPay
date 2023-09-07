// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./CompanyContract.sol";

contract FactoryCon {

    address public admin;
    uint256 public totalCompanies = 0;
    mapping (uint256 => CompanyDetails) public IdToCompanyDetails;
    CompanyDetails[] public allCompanies;

    //


    uint256 public totalCompaniesID;
    address[] companyAddresses;
    mapping (address owner => address companyAdd) public ownerToCompany;
    mapping (address companyAddress => uint256 companyID) public Identity;


    struct CompanyDetails {
        string CompanyName;
        string CompanySymbol;
        address adminAddress;
        address CompanyAddress;
    }



    constructor( ) {
        admin = msg.sender;
    }


    function createCompany(string memory _name, string memory _symbol) public returns (CompanyDetails memory) {

        CompanyContract _companyCon = new CompanyContract(_name, _symbol, totalCompanies);

        CompanyDetails storage _company = allCompanies[totalCompanies];
        _company.CompanyName = _name;
        _company.CompanySymbol = _symbol;
        _company.adminAddress = msg.sender;
        _company.CompanyAddress = address(_companyCon);

        totalCompanies++;

        return (_company);
    }
}