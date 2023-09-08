// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface Ifactory {
    function AccountcontractState(address contractAccount) external view returns(bool);
}