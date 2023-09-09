// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
interface ICHILD {

function createPlan(string memory _planName, uint _planPrice, uint256 _planDuration) external;
function activatePlan(uint256 _planId) external returns (bool);
function deactivatePlan(uint256 _planId) external returns (bool);
 function subscribe(string memory _userEmail, bool _autoSubscribe, uint256 _planId) external returns (uint256 userId);
 function unSubscribe(uint256 _planId, address _user) external returns (bool success);
}