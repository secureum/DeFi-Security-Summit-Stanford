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

await masterFactory.deployChallenge(3)

const challengeContracts = (
    await masterFactory.getChallengesInstances(
        challengerAddress,
        3
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

const boringToken = new ethers.Contract(
    challengeContracts[2],
    erc20Abi,
    challenger
);

const dex = new ethers.Contract(
    challengeContracts[3],
    [
        "function addLiquidity(uint256 amount0, uint256 amount1) external",
        "function removeLiquidity(uint256 amount) external returns (uint amount0, uint amount1)",
        "function swap(address tokenFrom, address tokenTo, uint256 amountIn) external returns(uint256 amountOut)",
        "function calcAmountsOut(address tokenIn, uint256 amountIn) external view returns(uint256 output)",
        "function balanceOf(address user) external view returns(uint256)"
    ],
    challenger
);

const pool = new ethers.Contract(
    challengeContracts[4],
    [
        "function deposit(uint256 _amount) external",
        "function withdraw(uint256 _amount) external",
        "function flashLoan(address borrower, bytes calldata data) external"
    ],
    challenger
);

const lendingPlatform = new ethers.Contract(
    challengeContracts[0],
    [
        "function depositToken0(uint256 amount) external",
        "function depositToken1(uint256 amount) external",
        "function borrowToken0(uint256 amount) external",
        "function borrowToken1(uint256 amount) external",
        "function liquidate(address user) external",
        "function isSolvent(address user) public view returns (bool)",
        "function tokenPrice(uint256 _amount) public view returns (uint256)"
    ],
    challenger
);

///////////////////////////////////////////////////
/*        Check Status Prior to your Hack        */
///////////////////////////////////////////////////

console.log(
    "Challenger $ISEC balance (before your hack): ",
    ethers.utils.formatEther(
        await isecToken.balanceOf(challengerAddress)
    ),
    "🪙"
);

console.log(
    "Lending platform $ISEC balance (before your hack): ",
    ethers.utils.formatEther(
        await isecToken.balanceOf(lendingPlatform.address)
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

const lendingPostHack = ethers.utils.formatEther(
    await isecToken.balanceOf(lendingPlatform.address)
)

console.log(
    "Challenger $ISEC balance (after your hack): ",
    ethers.utils.formatEther(
        await isecToken.balanceOf(challengerAddress)
    ),
    "🪙"
);

console.log(
    "Lending platform $ISEC balance (after your hack): ",
    lendingPostHack,
    "🪙"
);


if (lendingPostHack == 0) {
    console.log(
        "You passed Challenge 3! 🎉🎉🎉"
    );
} else {
    console.log(
        "Try again... 😞😞😞"
    );
}