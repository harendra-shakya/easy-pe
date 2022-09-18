import { useMoralis } from "react-moralis";
import Main from "../components/Main";

export default function Home(): JSX.Element {
    const { isWeb3Enabled, chainId, account } = useMoralis();

    return (
        <div>
            {isWeb3Enabled ? (
                <div>
                    {parseInt(chainId!) === 80001 ? ( // change it to skale
                        <div>
                            <Main />
                        </div>
                    ) : (
                        <div>Plz Connect to SKALE network</div>
                    )}
                </div>
            ) : (
                <div>Please Connect Your Wallet</div>
            )}
        </div>
    );
}
