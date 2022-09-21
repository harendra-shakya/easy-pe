import { useEffect, useState } from "react";
import { Modal, useNotification, Input, Select, Button } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import { ethers, Contract, ContractInterface } from "ethers";
import contractAddresses from "../constants/networkMapping.json";
import { OptionProps } from "@web3uikit/core";
import { BigNumber } from "@ethersproject/bignumber";

declare var window: any;

export default function Main(): JSX.Element {
    const [isFetching, setIsFetching] = useState(false);

    return (
        <div className="pt-48 pl-96 grid grid-cols-2 gap-3 place-content-center h-35">
            <div className="grid grid-cols-2 gap-3 place-content-stretch h-35"></div>{" "}
        </div>
    );
}
