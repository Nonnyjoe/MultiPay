// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FactoryCon {
    uint256 public totalCompaniesID;
    mapping (uint256 companyId => CompanyDetails) public IdToCompanyDetails;
    address[] companyAddresses;
    mapping (address owner => address companyAdd) public ownerToCompany;
    mapping (address companyAddress => uint256 companyID) public Identity;


    struct CompanyDetails {
        string CompanyName;
        address CompanyAddress;
        address adminAddress;
    }

    

    function autoRenew() public {
        //
    }
}