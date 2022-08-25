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
const vitalik = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

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

await masterFactory.deployChallenge(0)

const challengeContracts = (
    await masterFactory.getChallengesInstances(
        challengerAddress,
        0
    )
);

const vtoken = new ethers.Contract(
    challengeContracts[0],
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

///////////////////////////////////////////////////
/*        Check Status Prior to your Hack        */
///////////////////////////////////////////////////
const vtokenPreHack = ethers.utils.formatEther(
    await vtoken.balanceOf(vitalik)
);
const challPreHack = ethers.utils.formatEther(
    await vtoken.balanceOf(challengerAddress)
);

console.log(
    "Vitalik's VToken balance (before your hack): ",
    vtokenPreHack,
    "🪙"
);
console.log(
    "Challenger's VToken balance (before your hack): ",
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
const vtokenPostHack = ethers.utils.formatEther(
    await vtoken.balanceOf(vitalik)
);
const challPostHack = ethers.utils.formatEther(
    await vtoken.balanceOf(challengerAddress)
);

console.log(
    "Vitalik's VToken balance (after your hack): ",
    vtokenPostHack,
    "🪙"
);
console.log(
    "Challenger Token balance (after your hack): ",
    challPostHack,
    "🪙"
);

if (challPostHack === vtokenPreHack) {
    console.log(
        "You passed Challenge 0! 🎉🎉🎉"
    );
} else {
    console.log(
        "Try again... 😞😞😞"
    );
}