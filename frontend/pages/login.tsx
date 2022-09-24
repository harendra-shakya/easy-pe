import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import styles from "../styles/Home.module.css";
import Router from "next/router";

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

  useEffect(() => {
    if (isAuthenticated === true) {
      Router.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <div className="grid">
        {provider ? (
          <></>
        ) : (
          <div className={styles.backgroundParent}>{unloggedInView}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
