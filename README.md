# **Secureum A-MAZE-X Stanford**
## **A Smart Contract Security *Capture the Flag* Workshop**

![A-MAZE-X-Stanford-LOGO](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/blob/master/img/A-MAZE-X-Stanford.png)
*hosted by the Stanford University as part of **[Defi Security 101](https://defisecuritysummit.org/defi-security-101/)***\
*built by [eugenioclrc](https://github.com/eugenioclrc) and [luksgrin](https://github.com/luksgrin)*\
*special thanks to [patrickd](https://github.com/patrickd-), [StErMi](https://github.com/StErMi), [tinchoabbate](https://github.com/tinchoabbate) and [Rajeev](https://twitter.com/0xrajeev) for reviewing, commenting and helping during the elaboration and design of this CTF Workshop*

-----------------------------

# **Instructions** 🕹️

This Workshop consists in a series of challenges, of increasing difficulty, targetting different **concepts** and common **vulnerabilities** found in **DeFi**. The CTF is designed in different flavors for all kinds of users.

-----------------------------

## **This is the A-MAZE-X `Foundry` flavor**

Best suited for users who are very familiar with `Solidity` and do not want to use additional languages.
The following setup tutorial will guide you through the installation of `Foundry` and its setup.

### **Clone this repository**

Run the command below to clone this repository into your local machine

``` bash
git clone git@github.com:eugenioclrc/DeFi-Security-Summit-Stanford.git
cd DeFi-Security-Summit-Stanford
git checkout foundry
```

### **Install `Foundry`** *(if you don't have `Foundry` already installed)*

Run the command below to get `foundryup` the `Foundry` toolchain installer:

``` bash
curl -L https://foundry.paradigm.xyz | bash
```

Then, in a new terminal session (or after reloading your `PATH` environmental variable), run `foundryup` to get the latest `forge` and `cast` binaries:

``` console
foundryup
```

And finally, install the repository's dependencies by entering it and running:

``` console
forge install
```

Note that you might have to restart your terminal for the `forge` command to become available.

At this point you should be all set. If not, check [`Foundry`'s installation troubleshooting](https://github.com/foundry-rs/foundry#troubleshooting-installation).

### **Solving a challenge**

Challenge contracts are located under the `foundry_flavor/src/` directory. **Do not** modify them, as it may lead to unexpected behaviors within the challenges.

To solve a challenge, you must open the corresponding `foundry_flavor/test/ChallengeX.t.sol` *(where X is a number)* and add your exploit code in the signalized areas within said file.

Then, to check if the challenge has been solved, execute the following command

``` bash
forge test --match-path test/ChallengeX.t.sol
```

If the solution criteria have been reached, it shall display the following message

``` bash
Running 1 test for test/ChallengeX.t.sol:ChallengeXTest
[PASS] testChallenge() (gas: XXXX)
Test result: ok. 1 passed; 0 failed; finished in XXXms
```

Alternatively, to check if all challenges have been solved, execute the following command:

``` bash
bash isSolved.sh
```

which will return the test results for all challenges in order.

----------

## Important note

This set of challenges aren't set for competitive purposes. Their main objective is to showcase scenarios involving DeFi, `Solidity` concepts and common vulnerabilities.

Focus on **learning** and having **fun**! 😊

------------------------------

🔗 [Access the repository's main `README` file containing the challenges' descriptions](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/tree/master/).

## Solution

🔗 [Access this flavor's solution implementation](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/tree/foundry-solved).