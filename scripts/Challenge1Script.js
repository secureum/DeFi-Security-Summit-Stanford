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

await masterFactory.deployChallenge(1)

const challengeContracts = (
    await masterFactory.getChallengesInstances(
        challengerAddress,
        1
    )
);

const isecToken = new ethers.Contract(
    challengeContracts[1],
    [
        "function totalSupply() external view returns (uint256)",
        "function balanceOf(address account) external view returns (uint256)",
        "function transfer(address to, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function approve(address owner, address spender, uint256 amount) public returns (bool)",
        "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
    ],
    challenger
);

const pool = new ethers.Contract(
    challengeContracts[0],
    [
        "function deposit(uint256 _amount) external",
        "function withdraw(uint256 _amount) external",
        "function flashLoan(address borrower, bytes calldata data) external"
    ],
    challenger
);

///////////////////////////////////////////////////
/*        Check Status Prior to your Hack        */
///////////////////////////////////////////////////
const poolPreHack = ethers.utils.formatEther(
    await isecToken.balanceOf(pool.address)
)

const challPreHack = ethers.utils.formatEther(
    await isecToken.balanceOf(challengerAddress)
)

console.log(
    "Pool's $ISEC balance (before your hack): ",
    poolPreHack,
    "🪙"
);

console.log(
    "Challenger's $ISEC balance (before your hack): ",
    challPreHack,
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

const poolPostHack = ethers.utils.formatEther(
    await isecToken.balanceOf(pool.address)
)

const challPostHack = ethers.utils.formatEther(
    await isecToken.balanceOf(challengerAddress)
)

console.log(
    "Pool's $ISEC balance (after your hack): ",
    poolPostHack,
    "🪙"
);

console.log(
    "Challenger's $ISEC balance (after your hack): ",
    challPostHack,
    "🪙"
);

if (challPostHack === poolPreHack) {
    console.log(
        "You passed Challenge 1! 🎉🎉🎉"
    );
} else {
    console.log(
        "Try again... 😞😞😞"
    );
}