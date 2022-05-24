//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./impl/RoyaltiesV2Impl.sol";
import "./LibPart.sol";
import "./LibRoyaltiesV2.sol";

contract MinimalERC721 is ERC721, Ownable, RoyaltiesV2Impl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    Counters.Counter private _tokenIds;
    constructor() ERC721("Minimal", "MIN") {}

    function mint(address _to) public onlyOwner  returns(uint256) {
        super._mint(_to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
        //emit(_tokenIdTracker.increment());
        return _tokenIdTracker.current();        
    }
    function getTokenid() public view returns(uint256) {
        return _tokenIdTracker.current();        
    }

    // for opensea collection 
    function contractURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/your-collection-ipfshash";
    }

    function mintItem(address player, string memory tokenURI) public onlyOwner returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        //_setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function getNewItemId() external view returns  (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        return newItemId;
    }

    function ping() public view returns (string memory) {
        return "pong";
    }

    event ExampleEvent(string myString);

    function eventTest() public {
        string memory strTest = "Hello, world!";
        emit ExampleEvent(strTest);
    }

    function setRoyalties(uint _tokenId, address payable _royaltiesReceipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesReceipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    } 
}