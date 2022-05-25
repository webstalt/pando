// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";



contract SendEther{
    function sendEther(address payable to)payable public {
    Address.sendValue(to, msg.value);
}
}
