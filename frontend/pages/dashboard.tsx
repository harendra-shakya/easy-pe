import React, { useEffect, useState } from "react";

import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";
import styles from "../styles/Home.module.css";

import RPC from "../utils/ethersRPC";
import { Web3Auth } from "@web3auth/web3auth";
import { getProviders, getWeb3Auth } from "components/Helper";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default function Dashboard() {
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [balance, setBalance] = useState("0");
  const [user, setUser] = useState<any>();

  async function setUp() {
    const _provider = await getProviders();
    console.log("providers", _provider);
    setProvider(_provider);
    const _web3auth = await getWeb3Auth();
    console.log("providers", _web3auth);
    setWeb3auth(_web3auth);
    const _balance = await getBalance();
    console.log("balance", _balance);
    setBalance(_balance);
    const _user = await getUserInfo();
    console.log("userinfo", _user);
    setUser(_user);
  }

  useEffect(() => {
    setUp();
  }, []);

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

  const logout = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      setProvider(null);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from logout");
    }
  };

  const getChainId = async () => {
    try {
    } catch (e) {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const chainId = await rpc.getChainId();
      console.log(chainId);
      console.log(e);
      console.log("This error is coming from chainID");
    }
  };
  const getAccounts = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const address = await rpc.getAccounts();
      console.log(address);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getAccounts");
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

  const sendTransaction = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const receipt = await rpc.sendTransaction();
      console.log(receipt);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from sendTransaction");
    }
  };

  const signMessage = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const signedMessage = await rpc.signMessage();
      console.log(signedMessage);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from signMessage");
    }
  };

  const getPrivateKey = async () => {
    try {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const privateKey = await rpc.getPrivateKey();
      console.log(privateKey);
    } catch (e) {
      console.log(e);
      console.log("This error is coming from getPrivateKey");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-blueGray-600 relative md:ml-64">
        <Navbar />
        {/* make a header if possible */}
        {/* <Header /> */}
        <div className={`${styles.backgroundParent}`}>
          <div className={`shadow-2xl ${styles.bigCard}`}>
            {" "}
            Hey, {user.name}
            <p className="py-2">
              You are logged in with {user.email}. You can use it for sending
              and receiving payments.
            </p>
          </div>

          <div className={`shadow-2xl ${styles.bigCard}`}>
            <div className={styles.buttonCard}>
              Balances:
              <p className="py-2">
                Your MATIC Balance: {(+balance).toFixed(2)}
              </p>
              <p>Your USDC Balance: 0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
