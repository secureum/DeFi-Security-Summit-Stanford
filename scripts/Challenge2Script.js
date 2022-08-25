/* 

Welcome to the challenge's deployment script!

The contract(s) you have to interact with are
deployed on Görli with an already deployed
factory contract.

*/

///////////////////////////////////////////////////
/*                Fetch Contracts                */
///////////////////////////////////////////////////
console.log("Fetching Your Contracts");

const provider = new ethers.providers.JsonRpcProvider($rpcUrl);
const challenger = provider.getSigner(0);

const exploitContract = $contracts["Exploit"];
const exploitFactory = new ethers.ContractFactory(
    exploitContract.abi,
    exploitContract.evm.bytecode,
    challenger
);

///////////////////////////////////////////////////
/*            Show challenger address            */
///////////////////////////////////////////////////
const challengerAddress = await challenger.getAddress();

console.log(
    "Current challenger's address: ",
    challengerAddress
);

///////////////////////////////////////////////////
/*        Interface to Challenge Contracts       */
///////////////////////////////////////////////////
const masterFactory = new ethers.Contract(
    "0xD93296489Cf51135b36bC0A7C1114c310a676bFD",
    [
        "function deployChallenge(uint256) external",
        "function getChallengesInstances(address,uint256) external view returns(address[] memory)"
    ],
    challenger
);

await masterFactory.deployChallenge(2)

const challengeContracts = (
    await masterFactory.getChallengesInstances(
        challengerAddress,
        2
    )
);

let erc20Abi = [
    "function totalSupply() external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
];

const isecToken = new ethers.Contract(
    challengeContracts[1],
    erc20Abi,
    challenger
);

const setToken = new ethers.Contract(
    challengeContracts[2],
    erc20Abi,
    challenger
);

const dex = new ethers.Contract(
    challengeContracts[0],
    [
        "function addLiquidity(uint256 amount0, uint256 amount1) external",
        "function removeLiquidity(uint256 amount) external returns (uint amount0, uint amount1)",
        "function swap(address tokenFrom, address tokenTo, uint256 amountIn) external returns(uint256 amountOut)",
        "function calcAmountsOut(address tokenIn, uint256 amountIn) external view returns(uint256 output)",
        "function balanceOf(address user) external view returns(uint256)"
    ],
    challenger
);

///////////////////////////////////////////////////
/*        Check Status Prior to your Hack        */
///////////////////////////////////////////////////

console.log("Challenger balances (before your hack):");
console.log(
    "$ISEC: ",
    ethers.utils.formatEther(
        await isecToken.balanceOf(challengerAddress)
    ),
    "🪙"
);
console.log(
    "$SET: ",
    ethers.utils.formatEther(
        await setToken.balanceOf(challengerAddress)
    ),
    "🪙"
);

console.log("DEX balances (before your hack):");
console.log(
    "$ISEC: ",
    ethers.utils.formatEther(
        await isecToken.balanceOf(dex.address)
    ),
    "🪙"
);
console.log(
    "$SET: ",
    ethers.utils.formatEther(
        await setToken.balanceOf(dex.address)
    ),
    "🪙"
);

///////////////////////////////////////////////////
/*            Deploy Exploit Contracts           */
///////////////////////////////////////////////////
console.log("Deploying Exploit Contract");

//======== ADD HERE ADDITIONAL CODE IF NEEDED ========
const exploit = await exploitFactory.deploy();

console.log("Performing Attack ...");

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

console.log("Challenger balances (after your hack):");
console.log("$ISEC: ", challPostHackT1, "🪙");
console.log("$SET: ", challPostHackT2, "🪙");

console.log("DEX balances (after your hack):");
console.log("$ISEC: ", dexPostHackT1, "🪙");
console.log("$SET: ", dexPostHackT2, "🪙");


if (
        (dexPostHackT1 == 0)
        & (dexPostHackT2 == 0)
        & (challPostHackT1 == 10)
        & (challPostHackT2 == 10)
    ) {
    console.log(
        "You passed Challenge 2! 🎉🎉🎉"
    );
} else {
    console.log(
        "Try again... 😞😞😞"
    );
}