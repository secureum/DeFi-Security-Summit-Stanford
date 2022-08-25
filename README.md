# **Secureum A-MAZE-X Stanford**
## **A Smart Contract Security *Capture the Flag* Workshop**

![A-MAZE-X-Stanford-LOGO](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/blob/master/img/A-MAZE-X-Stanford.png)
*hosted by the Stanford University as part of **[Defi Security 101](https://defisecuritysummit.org/defi-security-101/)***\
*built by [eugenioclrc](https://github.com/eugenioclrc) and [luksgrin](https://github.com/luksgrin)*\
*special thanks to [patrickd](https://github.com/patrickd-), [StErMi](https://github.com/StErMi), [tinchoabbate](https://github.com/tinchoabbate) and [Rajeev](https://twitter.com/0xrajeev) for reviewing, commenting and helping during the elaboration and design of this CTF Workshop.*

-----------------------------

# **Instructions** 🕹️

This Workshop consists in a series of challenges, of increasing difficulty, targetting different **concepts** and common **vulnerabilities** found in **DeFi**. The CTF is designed in different flavors for all kinds of users.

-----------------------------

## **This is the A-MAZE-X `TenderlySandbox` flavor**

Best suited for newcommers who are familiar with `Solidity` and `Javascript`, but aren't really familiar with `Solidity` development frameworks.

In this option, the Challenge Contracts themselves are deployed on a fork of the **[Görli Testnet](https://goerli.net/)** and the source codes are provided in the `tenderlySandbox_flavor/contracts` directory.

The challengers (*you!*) have a **[Tenderly Sandbox](https://docs.tenderly.co/tenderly-sandbox)** instance to their disposal (one for each challenge) which contains all the setup needed to interact with the challenge contracts (in the `script.js` file).

In addition, both `tenderlySandbox_flavor/contracts` and `tenderlySandbox_flavor/scripts` directories provide an exact copy of the `contract.sol` and `script.js` files provided at the `Tenderly Sandbox`, with an according name [`ChallengeXExploit.sol` & `ChallengeXScript.js`], where `X` is the challenge's number.

### **Solving a challenge**

You are expected to write and deploy `Exploit` Contracts (one, none, or more than one) to harnesses the Challenge Contracts' vulnerabilities and fulfill the challenge's winning conditions. This is done within the `contract.sol` file.

**You can** (an most likely will have to) modify some lines of the `script.js` file in order to properly deploy your `Exploit` Contract, make calls, checks... (if needed). These lines are properly indicated within the `script.js` file.

To check whether you've passed the challenge, you must click the `Run` button on Tenderly Sandbox' console and see the `You passed Challenge N! 🎉🎉🎉` victory message at the end.

### **Links to the Challenges**

- 🔗 [Challenge 0](https://sandbox.tenderly.co/luksgrin/challenge-0-secureum-a-maze-x-stanford-2022)
- 🔗 [Challenge 1](https://sandbox.tenderly.co/luksgrin/challenge-1-secureum-a-maze-x-stanford-2022)
- 🔗 [Challenge 2](https://sandbox.tenderly.co/luksgrin/challenge-2-secureum-a-maze-x-stanford-2022)
- 🔗 [Challenge 3](https://sandbox.tenderly.co/luksgrin/challenge-3-secureum-a-maze-x-stanford-2022)

----------

## Important note

This set of challenges aren't set for competitive purposes. Their main objective is to showcase scenarios involving DeFi, `Solidity` concepts and common vulnerabilities.

Focus on **learning** and having **fun**! 😊

------------------------------

🔗 [Access the repository's main `README` file containing the challenges' descriptions](https://github.com/eugenioclrc/DeFi-Security-Summit-Stanford/tree/master/).