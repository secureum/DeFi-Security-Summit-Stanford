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

## **This is the A-MAZE-X `Hardhat` flavor**

Best suited for users who are familiar with `Solidity` **and** `Javascript`.
The following setup tutorial assumes you have a recent `node.js` and `npm` installation.

### **Clone this repository**

Run the command below to clone this repository into your local machine

``` bash
git clone git@github.com:eugenioclrc/DeFi-Security-Summit-Stanford.git
cd DeFi-Security-Summit-Stanford
git checkout hardhat
```

### **Install all the project's dependencies**

Run the commands below to install all the dependencies of the A-MAZE-X `Hardhat` flavor

``` bash
npm install
```
### **Solving a challenge**

Challenge contracts are located under the `hardhat_flavor/contracts/` directory. **Do not** modify them, as it may lead to unexpected behaviors within the challenges.

To solve a challenge, you must do the following:
- Create an exploit contract(s) within the appropriate `hardhat_flavor/contracts/exploits/ExploitX.sol` file.
- Complete the necessary `JavaScript` code (in the signalized area) within the appropriate `hardhat_flavor/test/solveChallengeX.js` file.

Note that this procedure has to be done **for each challenge**.

Then, to check if the challenge has been solved, execute the following command

``` bash
npx hardhat test test/solveChallengeX.js
```

If the solution criteria have been reached, it shall display the following message

``` bash
  Solve Challenge X
    ✔ Check if required condition has been met (XXXms)
  1 passing (XXXms)
```

Alternatively, to check if all challenges have been solved, execute the following command:

``` bash
npx hardhat test
```

which will return the test results for all challenges in order.

----------

## Important note

This set of challenges aren't set for competitive purposes. Their main objective is to showcase scenarios involving DeFi, `Solidity` concepts and common vulnerabilities.

Focus on **learning** and having **fun**! 😊

------------------------------

🔗 [Access the repository's main `README` file containing the challenges' descriptions](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/tree/master/).

## Solution

🔗 [Access this flavor's solution implementation](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/tree/hardhat-solved).