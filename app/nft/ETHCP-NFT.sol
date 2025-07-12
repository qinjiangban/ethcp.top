// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract EthereumCommunistParty is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public constant MINT_FEE = 0.00002 ether; // Mint fee: 0.00002 ETH
    uint256 public constant TRANSFER_FEE_RATE = 50; // Transfer fee: 0.5% (50/10000)
    uint256 public constant FEE_DENOMINATOR = 10000;

    event MintFeeCollected(address indexed payer, uint256 amount);
    event TransferFeeCollected(address indexed from, address indexed to, uint256 tokenId, uint256 fee);

    constructor(address initialOwner)
        ERC721("Ethereum Communist Party", "ETHCP")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uri)
        public
        payable
        returns (uint256)
    {
        require(msg.value >= MINT_FEE, "Insufficient mint fee");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        // Transfer mint fee to owner
        payable(owner()).transfer(MINT_FEE);
        emit MintFeeCollected(msg.sender, MINT_FEE);
        
        // Refund excess payment
        if (msg.value > MINT_FEE) {
            payable(msg.sender).transfer(msg.value - MINT_FEE);
        }
        
        return tokenId;
    }

    function safeMintWithoutFee(address to, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    // Custom transfer functions with fees
    function transferFromWithFee(address from, address to, uint256 tokenId) public payable {
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "ERC721: caller is not token owner or approved");
        
        if (from != owner()) {
            uint256 transferFee = (msg.value * TRANSFER_FEE_RATE) / FEE_DENOMINATOR;
            require(msg.value >= transferFee, "Insufficient transfer fee");
            
            if (transferFee > 0) {
                payable(owner()).transfer(transferFee);
                emit TransferFeeCollected(from, to, tokenId, transferFee);
            }
            
            // Refund excess payment
            if (msg.value > transferFee) {
                payable(msg.sender).transfer(msg.value - transferFee);
            }
        }
        
        _transfer(from, to, tokenId);
    }

    function safeTransferFromWithFee(address from, address to, uint256 tokenId) public payable {
        safeTransferFromWithFee(from, to, tokenId, "");
    }

    function safeTransferFromWithFee(address from, address to, uint256 tokenId, bytes memory data) public payable {
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "ERC721: caller is not token owner or approved");
        
        if (from != owner()) {
            uint256 transferFee = (msg.value * TRANSFER_FEE_RATE) / FEE_DENOMINATOR;
            require(msg.value >= transferFee, "Insufficient transfer fee");
            
            if (transferFee > 0) {
                payable(owner()).transfer(transferFee);
                emit TransferFeeCollected(from, to, tokenId, transferFee);
            }
            
            // Refund excess payment
            if (msg.value > transferFee) {
                payable(msg.sender).transfer(msg.value - transferFee);
            }
        }
        
        _safeTransfer(from, to, tokenId, data);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
