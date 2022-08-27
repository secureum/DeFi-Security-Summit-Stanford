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
    [{"inputs": [{"internalType": "uint256", "name": "nChallenge", "type": "uint256"}],	"name": "deployChallenge", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "user", "type": "address"}, {"internalType": "uint256", "name": "instance", "type": "uint256"}], "name": "getChallengesInstances", "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}], "stateMutability": "view", "type": "function"}],
    challenger
);

await masterFactory.deployChallenge(2)

const challengeContracts = (
    await masterFactory.getChallengesInstances(
        challengerAddress,
        2
    )
);


const isecToken = new ethers.Contract(
    challengeContracts[1],
    [{"inputs": [{"internalType": "uint256","name": "_supply","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}],
    challenger
);

const setToken = new ethers.Contract(
    challengeContracts[2],
    [{"inputs": [{"internalType": "uint256","name": "_supply","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}],
    challenger
);

const dex = new ethers.Contract(
    challengeContracts[0],
    [{"inputs": [{"internalType": "address","name": "token0Address","type": "address"},{"internalType": "address","name": "token1Address","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "uint256","name": "amount0","type": "uint256"},{"internalType": "uint256","name": "amount1","type": "uint256"}],"name": "addLiquidity","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "tokenIn","type": "address"},{"internalType": "uint256","name": "amountIn","type": "uint256"}],"name": "calcAmountsOut","outputs": [{"internalType": "uint256","name": "output","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "removeLiquidity","outputs": [{"internalType": "uint256","name": "amount0","type": "uint256"},{"internalType": "uint256","name": "amount1","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "reserve0","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "reserve1","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "tokenFrom","type": "address"},{"internalType": "address","name": "tokenTo","type": "address"},{"internalType": "uint256","name": "amountIn","type": "uint256"}],"name": "swap","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "token0","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token1","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "tokenFallback","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}],
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
const exploit = await exploitFactory.deploy(dex.address);

await isecToken.approve(
    exploit.address,
    ethers.constants.MaxUint256
);
await setToken.approve(
    exploit.address,
    ethers.constants.MaxUint256
);

console.log("Performing Attack ...");

await exploit.hack();
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