import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", function () {
  it("Should say HI", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed(); // Ensures your contract has been confirmed by the network enought times that its considered to be on the network.

    expect(await hello.hello()).to.equal("Hello World");
  });
});
