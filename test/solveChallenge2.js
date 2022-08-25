const { expect } = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;

///////////////////////////////////////////////////
/*                  CHALLENGE 2                  */
///////////////////////////////////////////////////
describe("Solve Challenge 2", function () {

    const challenger = ethers.provider.getSigner(1);

    it("Check if All of the dex's $ISEC and $SET have been stolen", async function () {

        msgstr = "\n";

        const challengerAddress = await challenger.getAddress();

        ///////////////////////////////////////////////////
        /*           Deploy Challenge Contracts          */
        ///////////////////////////////////////////////////

        const deployer = ethers.provider.getSigner(0);
    
        const isecTokenFactory = (
            await ethers.getContractFactory(
                "InSecureumToken",
                deployer
            )
        );
        const setTokenFactory = (
            await ethers.getContractFactory(
                "SimpleERC223Token",
                deployer
            )
        );
        const dexFactory = (
            await ethers.getContractFactory(
                "contracts/Challenge2.DEX.sol:InsecureDexLP",
                deployer
            )
        );
    
        isecToken = (
            await isecTokenFactory
            .deploy(ethers.utils.parseEther("10"))
        );
        setToken = (
            await setTokenFactory
            .deploy(ethers.utils.parseEther("10"))
        );
    
        await isecToken.deployed();
        await setToken.deployed();
    
        dex = (
            await dexFactory
            .deploy(
                isecToken.address,
                setToken.address
            )
        );
        await dex.deployed();
    
        await isecToken.approve(
            dex.address,
            ethers.constants.MaxUint256
        );
        await setToken.approve(
            dex.address,
            ethers.constants.MaxUint256
        );
    
        await dex.addLiquidity(
            ethers.utils.parseEther("9"),
            ethers.utils.parseEther("9")    
        );
    
        await isecToken.transfer(
            challenger.getAddress(),
            ethers.utils.parseEther("1")
        );
        await setToken["transfer(address,uint256)"](
            challenger.getAddress(),
            ethers.utils.parseEther("1")
        );
    
        isecToken = isecToken.connect(challenger);
        setToken = setToken.connect(challenger);
        dex = dex.connect(challenger);

        ///////////////////////////////////////////////////
        /*        Check Status Prior to your Hack        */
        ///////////////////////////////////////////////////

        msgstr = msgstr.concat(
            "\tChallenger balances (before your hack):\n",
            "\t\t$ISEC:\t",
            ethers.utils.formatEther(
                await isecToken.balanceOf(challengerAddress)
            ),
            "🪙",
            "\n",
            "\t\t$SET:\t",
            ethers.utils.formatEther(
                await setToken.balanceOf(challengerAddress)
            ),
            "🪙",
            "\n\n",
            "\tDEX balances (before your hack):\n",
            "\t\t$ISEC:\t",
            ethers.utils.formatEther(
                await isecToken.balanceOf(dex.address)
            ),
            "🪙",
            "\n",
            "\t\t$SET:\t",
            ethers.utils.formatEther(
                await setToken.balanceOf(dex.address)
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

        const dexPostHackT1 = ethers.utils.formatEther(
            await isecToken.balanceOf(dex.address)
        )
        
        const dexPostHackT2 = ethers.utils.formatEther(
            await setToken.balanceOf(dex.address)
        )
        
        const challPostHackT1 = ethers.utils.formatEther(
            await isecToken.balanceOf(challengerAddress)
        )
        
        const challPostHackT2 = ethers.utils.formatEther(
            await setToken.balanceOf(challengerAddress)
        )

        msgstr = msgstr.concat(
            "\tChallenger balances (after your hack):\n",
            "\t\t$ISEC:\t",
            challPostHackT1,
            "🪙",
            "\n",
            "\t\t$SET:\t",
            challPostHackT2,
            "🪙",
            "\n\n",
            "\tDEX balances (before your hack):\n",
            "\t\t$ISEC:\t",
            dexPostHackT1,
            "🪙",
            "\n",
            "\t\t$SET:\t",
            dexPostHackT2,
            "🪙",
            "\n\n"
        );

        msgstr = msgstr.concat(
            "\tYou should've stolen all of the dex's $ISEC and $SET!\n\n"
        );

        expect(
            (challPostHackT1 == 10)
            && (challPostHackT2 == 10)
            && (dexPostHackT1 == 0)
            && (dexPostHackT2 == 0),
            msgstr
        ).to.be.true;

    });
});
