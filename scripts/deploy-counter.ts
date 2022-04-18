import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  return counter;
}

async function counts(counter: any) {
  await counter.count();
  console.log("Counter is ==>", await counter.getCounter());
}

deploy().then(counts);
