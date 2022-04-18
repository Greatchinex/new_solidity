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

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("No accounts found");
  }

  /***
   *  etherContract needs an AddressOrName, Interface and a Provider
   *
   */
  const hello = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    [
      "function hello() public pure returns (string memory)", // stringification of fuction signature
    ],
    new ethers.providers.Web3Provider(getEth()) // How to contact the network
  );

  document.body.innerHTML = await hello.hello();
}

run();
