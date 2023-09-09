// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface IFACTORY {

 function UpdateSubscriptionContracts( address _caller) external returns(bool);
 function RemoveSubscribedContract( address _caller) external returns(bool);
}