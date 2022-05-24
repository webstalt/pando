// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// Compound contract interface to supply ETH
interface CEth {
    function mint() external payable;

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint256) external returns (uint256);

    function redeemUnderlying(uint256) external returns (uint256);

    function balanceOf(address) external returns (uint256);
}

/**
 * @title CompoundEth
 * @notice Contract allows to lend ETH to Compound protocol to generate the yield
 */
   contract CompoundEth {
     event MyLog(string, uint256);
     CEth public cToken;

    constructor(address _cEtherContract) {
        cToken = CEth(_cEtherContract);
    }
    
     /**
     * @dev Lend ETH to Compound to generate yield, compound provides cETH ERC20 token based on current exchange rate
     * @param amount Amount of ETH to deposit
     */
    function supplyEthToCompound(
        uint256 amount
    ) internal returns (bool) {
        
        // Amount of current exchange rate from cToken to underlying
        uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
        emit MyLog("Exchange Rate (scaled up by 1e18): ", exchangeRateMantissa);

        // Amount added to you supply balance this block
        uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
        emit MyLog("Supply Rate: (scaled up by 1e18)", supplyRateMantissa);

        cToken.mint{value: amount, gas: 250000}();
        return true;
    }

    
     /**
     * @dev Withdraw ETH from Compound, Compound need cETH ERC20 token back to return the capital in ETH
     * @param amount Amount of ETH to withdraw
     */
    function redeemCEth(
        uint256 amount,
        bool redeemType       
    ) internal returns (bool) {
       
        // `amount` is scaled up by 1e18 to avoid decimals
        uint256 redeemResult;

        if (redeemType == true) {
            // Retrieve your asset based on a cToken amount
            redeemResult = cToken.redeem(amount);
        } else {
            // Retrieve your asset based on an amount of the asset
            redeemResult = cToken.redeemUnderlying(amount);
        }

        // Error codes are listed here:
        // https://compound.finance/docs/ctokens#ctoken-error-codes
        emit MyLog("If this is not 0, there was an error", redeemResult);

        return true;
    }
    
     function getCompoundETHBalance() public returns (uint256) {
        return cToken.balanceOf(address(this));
    }
}
