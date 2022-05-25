// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PaymentSplitter.sol";
import "./CompoundEth.sol";

//import "@openzeppelin/contracts/access/Ownable.sol";

interface ICollectionContract {
    function transferOwnership(address newOwner) external;

    function owner() external view returns (address);
}

/**
 * @title RBFVault
 * @notice Contract allowing Lender to secure royalty revenue streams from a NFT collection of borrower and split payments between them based on agreed terms
 * @dev Should be deployed per NFT collection.
 */
contract RBFVault is PaymentSplitter, CompoundEth {
    enum Status {
        Pending,
        Active,
        Expired,
        Canceled
    }

    address public collectionOwner;
    address public collectionAddress;
    uint256 public purchasePrice;
    uint256 public constant REVENUE_PERIOD = 52 weeks;
    uint256 public constant TIMEOUT_PERIOD = 1 weeks;
    Status public status;
    uint256 vaultActivationDate;
    uint256 vaultDeployDate;

    /**
     *
     * @dev Configure data for revenue shares
     * @param _collectionAddress NFT collection's contract address
     * @param _parties array of parties involved. 0:Investor 1:Collection Owner
     * @param _shares array of parties corresponding shares in the revenue. 0:Investor's share, 1: Collection owner's share
     *
     */
    constructor(
        address _collectionAddress,
        address[2] memory _parties,
        uint256[2] memory _shares,
        address _cEtherContract
    ) payable PaymentSplitter(_parties, _shares) CompoundEth(_cEtherContract) {
        collectionAddress = _collectionAddress;
        collectionOwner = _parties[1];
        status = Status.Pending;
        purchasePrice = msg.value;
        vaultDeployDate = block.timestamp;
        supplyEthToCompound(msg.value);
    }

    modifier termsSatisfied() {
        // check if contract time-length completed
        
        // require(
        //     block.timestamp > (vaultActivationDate + REVENUE_PERIOD),
        //     "Revenue period term not complete"
        // );

        // TODO - check if revenue max limit has reached
        _;
    }

    /**
     * @dev Return ownership of the NFT collection back to original owner after the contract's term is satisfied
     */
    function returnOwnershipToCollectionOwner() external termsSatisfied {
        ICollectionContract(collectionAddress).transferOwnership(
            collectionOwner
        );
    }

    /**
     * @dev Check if the ownership of the collection is transferred to this vault
     */
    function isVaultOwnsTheCollection() public view returns (bool) {
        return ICollectionContract(collectionAddress).owner() == address(this);
    }

    /**
     * @dev Activates the vault after the onwership has been transferred to this vault. Also sends the agreed payment to the collection owner.
     After this any royalty recieved by this collection will be shared between both the party according to agreement
     */
    function activate() external {
        // TODO - verify collection payout address using oracle
        require(
            isVaultOwnsTheCollection(),
            "Vault: Transfer collection ownership to the the vault"
        );
        require(
            status == Status.Pending,
            "Vault: Only vault with'Pending' can be activated"
        );
        status = Status.Active;
        vaultActivationDate = block.timestamp;
        redeemCEth(purchasePrice, false);
        Address.sendValue(payable(_payees[1]), purchasePrice);
    }

    function getVaultBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @return The current state of the vault.
     */
    function vaultStatus() public view returns (Status) {
        return status;
    }

    /**
     * @dev Allows lender or borrower to withdrawn their portion of the revenue
     * @param account Address of the lender/borrower
     */
    function release(address payable account) public override {
        require(status == Status.Active, "Vault: vault is not active");
        super.release(account);
    }

    /**
     * @dev Allows the lender to withdrawn deposited money if vault doesn't get activated on agreed upon time
     */
    function refundTheLender() external {
        require(
            !isVaultOwnsTheCollection(),
            "Vault: Collection already owned by the vault"
        );

        require(
            status == Status.Pending,
            "Refund only available when vault is in 'Pending' status"
        );

        require(
            block.timestamp > (vaultDeployDate + TIMEOUT_PERIOD),
            "Refund only available after the timeout period"
        );

        status = Status.Canceled;
        Address.sendValue(payable(_payees[0]), purchasePrice);
    }
}
