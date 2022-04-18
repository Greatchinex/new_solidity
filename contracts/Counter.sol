// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    // uint counter; // Console.log in count function prints "BigNumber { value: "1" }" cause unit is a big integer
    uint32 counter;
    
    event CounterInc(uint32 counter);

    function count() public {
        counter++;
        console.log("Counter is now ===>", counter);
        emit CounterInc(counter);  // emit event after update so it can be listened for(typically to update a UI state after an action)
    }

    function getCounter() public view returns (uint32) {
        return counter;
    }
}