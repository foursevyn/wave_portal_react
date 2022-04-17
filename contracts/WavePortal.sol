//SPDX-License-Identifier: ISC
pragma solidity ^0.8.13;

contract WavePortal{
  string public contractName;
  uint256 totalWaves;
  uint256 myWaves;
  
  mapping(address => uint256) waveBalances;

  // OLD CONSTRUCTOR FUNCTION
  // function WavePortal(string _contractName){
  //   contractName = _contractName;
  // }

  constructor(string memory _contractName){
    contractName = _contractName;
  }

  function wave() public returns(string memory){
    totalWaves += 1;
    waveBalances[msg.sender] += 1;
    return "Wave created";
  }

  function getTotalWaves() public view returns (uint256){
    return totalWaves;
  }

  function getMyWaves() public view returns(uint256){
    return waveBalances[msg.sender];
  }
}