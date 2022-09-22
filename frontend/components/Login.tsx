import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import RPC from "./ethersRPC";

function App() {
    const { Moralis, user, authError, isAuthenticating, isAuthenticated } = useMoralis();
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    console.log("isAuthenticated", isAuthenticated);
    console.log("isAuthenticating", isAuthenticating);

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
                        // Avoid using public rpcTarget in production.
                        // Use services like Infura, Quicknode etc
                        displayName: "Polygon Testnet",
                        blockExplorer: "https://mumbai.polygonscan.com/",
                        ticker: "MATIC",
                        tickerName: "Matic",
                    },
                });

                setWeb3auth(web3auth);

                await web3auth.initModal();
                if (web3auth.provider) {
                    console.log("provider", web3auth.provider);
                    setProvider(web3auth.provider);
                }
                const web3authProvider = await web3auth.connect();
                setProvider(web3authProvider);
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        console.log("logging in");
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    };

    const getUserInfo = async () => {
        console.log("isAuthenticated", isAuthenticated);
        console.log("isAuthenticating", isAuthenticating);
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await web3auth.getUserInfo();
        console.log(user);
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        setProvider(null);
    };

    const getChainId = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const chainId = await rpc.getChainId();
        console.log(chainId);
    };
    const getAccounts = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        console.log(address);
    };

    const getBalance = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
        console.log(balance);
    };

    const sendTransaction = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const receipt = await rpc.sendTransaction();
        console.log(receipt);
    };

    const signMessage = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const signedMessage = await rpc.signMessage();
        console.log(signedMessage);
    };

    const getPrivateKey = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const privateKey = await rpc.getPrivateKey();
        console.log(privateKey);
    };
    const loggedInView = (
        <>
            <button onClick={getUserInfo} className="card">
                Get User Info
            </button>
            <button onClick={getChainId} className="card">
                Get Chain ID
            </button>
            <button onClick={getAccounts} className="card">
                Get Accounts
            </button>
            <button onClick={getBalance} className="card">
                Get Balance
            </button>
            <button onClick={sendTransaction} className="card">
                Send Transaction
            </button>
            <button onClick={signMessage} className="card">
                Sign Message
            </button>
            <button onClick={getPrivateKey} className="card">
                Get Private Key
            </button>
            <button onClick={logout} className="card">
                Log Out
            </button>

            <div id="console" style={{ whiteSpace: "pre-line" }}>
                <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
        </>
    );

    const unloggedInView = (
        <div className={styles.card}>
            <div>Login</div>
            {isAuthenticating && <p className={styles.green}>Authenticating</p>}
            {authError && <p className={styles.error}>{JSON.stringify(authError.message)}</p>}
            <div className={styles.buttonCard}>
                <button className={styles.loginButton} onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        </div>
    );
}

export default App;
