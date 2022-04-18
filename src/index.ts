import { ethers } from "ethers";

// Get ethereum object
function getEth() {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error("get metamask");
  }

  return eth;
}

// Check for existing metamask account
async function hasAccounts() {
  const eth = getEth();

  const accounts = await eth.request({ method: "eth_accounts" });
  return accounts && accounts.length;
}

// Request for account if one is not found
async function requestAccounts() {
  const eth = getEth();

  const accounts = await eth.request({ method: "eth_requestAccounts" });
  return accounts && accounts.length;
}

// Run for the HelloWorld Contract
/***
 * 
async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("No accounts found");
  }

  const hello = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    [
      "function hello() public pure returns (string memory)", // stringification of fuction signature
    ],
    new ethers.providers.Web3Provider(getEth()) // How to contact the network
  );

  document.body.innerHTML = await hello.hello();
} 
*/

// Run for the HelloWorld Counter Contract
async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("No accounts found");
  }

  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    new ethers.providers.Web3Provider(getEth()).getSigner() // How to contact the network, Signer(Wallet info to use to process contract transaction that costs money)
  );

  // UI elemets to interact with contract
  const el = document.createElement("div");
  async function setCounter() {
    el.innerHTML = await counter.getCounter();
  }
  setCounter(); // So we get the counter value displayed at the begining(getCounter contract method returns that value)

  // Create button that increments the counter onclick and displays the incremented value
  const button = document.createElement("button");
  button.innerHTML = "Increment Counter";
  button.onclick = async function () {
    const tx = await counter.count();
    await tx.wait(); // Waits for transaction to be done(before calling the method below to display the counter update in the UI)
    setCounter();
  };

  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();
