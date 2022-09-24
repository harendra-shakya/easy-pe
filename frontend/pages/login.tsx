import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { Helper } from "../components/Helper";
import { ethers, Contract } from "ethers";
import easyPeAbi from "../constants/EasyPe.json";
import contractAddresses from "../constants/networkMapping.json";
import RPC from "../utils/ethersRPC";

function Login() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
        const MUMBAI_RPC_URL = process.env.NEXT_PUBLIC_MUMBAI_RPC_URL!;
        const web3auth = new Web3Auth({
          clientId: CLIENT_ID!, // get it from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x13881", // hex of 80001, polygon testnet
            rpcTarget: MUMBAI_RPC_URL!,
            displayName: "Polygon Testnet",
            blockExplorer: "https://mumbai.polygonscan.com/",
            ticker: "MATIC",
            tickerName: "Matic",
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
      } catch (error) {
        console.error(error);
        setAuthError(error.toString());
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      setIsAuthenticating(true);
      console.log("logging in");
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setIsAuthenticated(true);
    } catch (e) {
      setAuthError(e.toString());
      console.log(e);
    }
    setIsAuthenticating(false);
  };

  const unloggedInView = (
    <div className={`shadow-2xl ${styles.card}`}>
      <div>Login to EasyPe</div>
      {isAuthenticating && <p className={styles.green}>Authenticating</p>}
      {authError && <p className={styles.error}>{JSON.stringify(authError)}</p>}
      <div className={styles.buttonCard}>
        <button
          className={styles.loginButton}
          onClick={login}
          disabled={isAuthenticating}
        >
          Login
        </button>
      </div>
    </div>
  );

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

  const getAddress = async () => {
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
  const redirect = async () => {
    const ethersProvider = await new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();

    const contractAddress: string = await contractAddresses["80001"][
      "EasyPe"
    ][0];
    const contract: Contract = await new ethers.Contract(
      contractAddress,
      easyPeAbi,
      signer
    );

    const email = (await getUserInfo())?.email;
    const emailHash = await ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(email)
    );
    console.log("email", email);
    console.log("hash", emailHash);

    const isEmailRegistered = await contract.isEmailRegistered(emailHash);

    console.log("isEmailRegistered", isEmailRegistered);

    if (!isEmailRegistered) {
      console.log("Not registered, registering email....");

      const userAddress = await getAddress();

      console.log("address", userAddress);
      await contract.register(emailHash);
    } else {
      console.log("User Already Registered!");
    }
    const get = await contract.getAddress(emailHash);
    console.log("got this address", get);
    console.log("contractAddress", contractAddress);
    console.log("contract", contract);

    Router.push("/dashboard");
  };

  useEffect(() => {
    if (isAuthenticated === true) redirect();
  }, [isAuthenticated]);

  return (
    <div className="container">
      <div className="grid">
        {provider ? (
          <Helper _provider={provider} _web3auth={web3auth} />
        ) : (
          <div className={styles.backgroundParent}>{unloggedInView}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
