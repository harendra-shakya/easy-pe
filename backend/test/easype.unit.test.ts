import { BigNumber, Contract, ContractFactory } from "ethers";
import { expect, assert } from "chai";
const { ethers, network } = require("hardhat");

describe("contract tests", function () {
    const amount1 = ethers.utils.parseEther("1");
    let easyPe: Contract, user: Contract, user2: Contract;

    beforeEach(async function () {
        const accounts = await ethers.getSigners(2);
        user = accounts[0];
        user2 = accounts[1];

        const easyPeContractFactory: ContractFactory = await ethers.getContractFactory("EasyPe");
        easyPe = await easyPeContractFactory.deploy();
        // prettier-ignore
        await easyPe.deployed();
    });

    describe("function", function () {
        it("", async function () {});
    });
});
