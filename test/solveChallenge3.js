const { expect } = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;

///////////////////////////////////////////////////
/*                  CHALLENGE 3                  */
///////////////////////////////////////////////////
describe("Solve Challenge 3", function () {

    const challenger = ethers.provider.getSigner(1);

    it("Check if all of the lending platform's $ISEC has been stolen", async function () {

        msgstr = "\n";

        const challengerAddress = await challenger.getAddress();

        ///////////////////////////////////////////////////
        /*           Deploy Challenge Contract           */
        ///////////////////////////////////////////////////
        const deployer = ethers.provider.getSigner(0);
    
        const isecTokenFactory = (
            await ethers.getContractFactory(
                "InSecureumToken",
                deployer
            )
        );
        const boringTokenFactory = (
            await ethers.getContractFactory(
                "BoringToken",
                deployer
            )
        );
        const dexFactory = (
            await ethers.getContractFactory(
                "contracts/Challenge2.DEX.sol:InsecureDexLP",
                deployer
            )
        );
        const poolFactory = (
            await ethers.getContractFactory(
                "InSecureumLenderPool",
                deployer
            )
        );
        const lendingPlatformFactory = (
            await ethers.getContractFactory(
                "contracts/Challenge3.borrow_system.sol:BorrowSystemInsecureOracle",
                deployer
            )
        );
    
        isecToken = (
            await isecTokenFactory
            .deploy(ethers.utils.parseEther("30000"))
        );
        boringToken = (
            await boringTokenFactory
            .deploy(ethers.utils.parseEther("20000"))
        );
    
        await isecToken.deployed();
        await boringToken.deployed();
    
        dex = (
            await dexFactory
            .deploy(
                isecToken.address,
                boringToken.address
            )
        );
        await dex.deployed();
    
        await isecToken.approve(
            dex.address,
            ethers.constants.MaxUint256
        );
        await boringToken.approve(
            dex.address,
            ethers.constants.MaxUint256
        );
    
        await dex.addLiquidity(
            ethers.utils.parseEther("100"),
            ethers.utils.parseEther("100")    
        );
    
        pool = await poolFactory.deploy(isecToken.address);
        await pool.deployed();
    
        await isecToken.transfer(
            pool.address,
            ethers.utils.parseEther("10000")
        );
    
        lendingPlatform = (
            await lendingPlatformFactory
            .deploy(
                dex.address,
                isecToken.address,
                boringToken.address
            )
        );
        await lendingPlatform.deployed();
    
        await isecToken.transfer(
            lendingPlatform.address,
            ethers.utils.parseEther("10000")
        );
        await boringToken.transfer(
            lendingPlatform.address,
            ethers.utils.parseEther("10000")
        );
    
        isecToken = isecToken.connect(challenger);
        boringToken = boringToken.connect(challenger);
        dex = dex.connect(challenger);
        pool = pool.connect(challenger);
        lendingPlatform = lendingPlatform.connect(challenger);

        ///////////////////////////////////////////////////
        /*        Check Status Prior to your Hack        */
        ///////////////////////////////////////////////////

        msgstr = msgstr.concat(
            "\tChallenger $ISEC balance (before your hack): ",
            ethers.utils.formatEther(
                await isecToken.balanceOf(challengerAddress)
            ),
            "🪙",
            "\n",
            "\tLending platform $ISEC balance (before your hack): ",
            ethers.utils.formatEther(
                await isecToken.balanceOf(lendingPlatform.address)
            ),
            "🪙",
            "\n\n"
        );

        ///////////////////////////////////////////////////
        /*            Deploy Exploit Contracts           */
        ///////////////////////////////////////////////////

        //======= COMPLETE THIS SECTION AS YOU REQUIRE =======

        //====================================================

        ///////////////////////////////////////////////////
        /*     Check if Challenge has been solved        */
        ///////////////////////////////////////////////////

        const lendingPostHack = ethers.utils.formatEther(
            await isecToken.balanceOf(lendingPlatform.address)
        )
        
        msgstr = msgstr.concat(
            "\tChallenger $ISEC balance (after your hack): ",
            ethers.utils.formatEther(
                await isecToken.balanceOf(challengerAddress)
            ),
            "🪙",
            "\n",
            "\tLending platform $ISEC balance (after your hack): ",
            lendingPostHack,
            "🪙",
            "\n\n"
        );

        msgstr = msgstr.concat(
            "\tYou should've stolen all of the lending platform's $ISEC!\n\n"
        );

        expect(
            lendingPostHack == 0,
            msgstr
        ).to.be.true;

    });

});
