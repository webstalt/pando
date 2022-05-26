// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SendEtherKovan {
    using SafeCast for int256;
    using SafeMath for uint256;

    AggregatorV3Interface internal eth_usd_price_feed;
    AggregatorV3Interface internal jpy_usd_price_feed;
    AggregatorV3Interface internal gbp_usd_price_feed;
    AggregatorV3Interface internal eur_usd_price_feed;
    AggregatorV3Interface internal aud_usd_price_feed;

    /**
     * Network: Kovan
     */
    constructor() {
        eth_usd_price_feed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
        jpy_usd_price_feed = AggregatorV3Interface(0xD627B1eF3AC23F1d3e576FA6206126F3c1Bd0942);
        gbp_usd_price_feed = AggregatorV3Interface(0x28b0061f44E6A9780224AA61BEc8C3Fcb0d37de9);
        eur_usd_price_feed = AggregatorV3Interface(0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13);
        aud_usd_price_feed = AggregatorV3Interface(0x5813A90f826e16dB392abd2aF7966313fc1fd5B8);
    }
	
    function getEthUsd() public view returns (uint) {
        (
            , int price, , , 
        ) = eth_usd_price_feed.latestRoundData();

        return price.toUint256();
    }


    function getEthJpy() public view returns (uint) {
        (
            , int price, , , 
        ) = jpy_usd_price_feed.latestRoundData();

        uint EthUsd = getEthUsd();
        uint JpyUsd = price.toUint256();

        return EthUsd.mul(10 ** 8).div(JpyUsd);
    }

    function getEthEur() public view returns (uint) {
        (
            , int price, , , 
        ) = eur_usd_price_feed.latestRoundData();

        uint EthUsd = getEthUsd();
        uint EurUsd = price.toUint256();

        return EthUsd.mul(10 ** 8).div(EurUsd);
    }

    function getEthAud() public view returns (uint) {
        (
            , int price, , , 
        ) = aud_usd_price_feed.latestRoundData();

        uint EthUsd = getEthUsd();
        uint AudUsd = price.toUint256();

        return EthUsd.mul(10 ** 8).div(AudUsd);
    }

    function getEthGbp() public view returns (uint) {
        (
            , int price, , , 
        ) = gbp_usd_price_feed.latestRoundData();

        uint EthUsd = getEthUsd();
        uint GbpUsd = price.toUint256();

        return EthUsd.mul(10 ** 8).div(GbpUsd);
    }

    function convertEthUsd(uint _amountInUsd) public view returns (uint) {

        uint EthUsd = getEthUsd();

        return _amountInUsd.mul(10 ** 16).div(EthUsd);

    }
    
    function convertEthJpy(uint _amountInJpy) public view returns (uint) {

        uint EthJpy = uint(getEthJpy());

        return _amountInJpy.mul(10 ** 16).div(EthJpy);

    }

     function convertEthAud(uint _amountInAud) public view returns (uint) {

        uint EthAud = uint(getEthAud());

        return _amountInAud.mul(10 ** 16).div(EthAud);

    }   

     function convertEthEur(uint _amountInEur) public view returns (uint) {

        uint EthEur = uint(getEthEur());

        return _amountInEur.mul(10 ** 16).div(EthEur);

    }   

     function convertEthGbp(uint _amountInGbp) public view returns (uint) {

        uint EthGbp = uint(getEthGbp());

        return _amountInGbp.mul(10 ** 16).div(EthGbp);

    }   

}
