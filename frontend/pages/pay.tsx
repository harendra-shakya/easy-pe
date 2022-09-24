import { Input } from "@material-tailwind/react";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";

import RPC from "../utils/ethersRPC";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default function Pay() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [balance, setBalance] = useState("0");
  const [user, setUser] = useState<any>();

  async function setUp() {
    const _provider = await getProviders();
    const _web3auth = await getWeb3Auth();
    const _balance = await getBalance();
    const _user = await getUserInfo();
    setWeb3auth(_web3auth);
    setProvider(_provider);
    setBalance(_balance);
    setUser(_user);
  }

  useEffect(() => {
    setUp();
  }, [web3auth, provider, user, balance]);

  const getUserInfo = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await web3auth.getUserInfo();
      console.log(user);
      return user;
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getUser Info");
    }
  };

  const getBalance = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const balance = await rpc.getBalance();
      console.log(balance);
      return balance;
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getBalance");
    }
  };

  const sendTransaction = async (_to: string, _amount: string) => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const receipt = await rpc.sendTransaction(_to, _amount);
      console.log(receipt);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from sendTransaction");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-blueGray-600 relative md:ml-64">
        <Navbar />
        <div className={`${styles.bgImg} container mx-auto h-full pr-12 pt-12`}>
          <div className="flex h-full content-center items-center justify-center">
            <div className="w-full px-4 lg:w-4/12">
              <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0">
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blue-600">
                        Send To
                      </label>
                      <input
                        type="email"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blue-600">
                        Amount
                      </label>
                      <input
                        type="Amount"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Amount"
                      />
                    </div>
                    <button
                      className="mr-1 mb-1 w-full rounded bg-blue-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                      type="button"
                      onChange={() => {}}
                      // disabled={true}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap">
                <div className="w-1/2">Your Balance: </div>
                {/* <div className="w-1/2 text-right">Balance</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
