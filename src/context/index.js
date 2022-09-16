import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { ethers } from "ethers";
import {
    providers, ERCContract, presaleContract, Contrats
} from "../contracts";

import { delay, handleAlert, toBigNum, fromBigNum } from "../utils";
import { NotificationManager } from "react-notifications";

const BlockchainContext = createContext();

export function useBlockchainContext() {
    return useContext(BlockchainContext);
}

function reducer(state, { type, payload }) {
    return {
        ...state,
        [type]: payload,
    };
}

const INIT_STATE = {
    signer: "",
    provider: null,
    web3Provider: "",
    address: '',
    chainId: '',
    balance: 0,
    tokenAddress: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
    contract: null,
    myBalance: 0
};

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    useEffect(() => {
        dispatch({
            type: "contract",
            payload: ERCContract(state.tokenAddress)
        })
    }, [state.tokenAddress])
    useEffect(() => {
        if (window.ethereum) {
            dispatch({
                type: "provider",
                payload: new ethers.providers.Web3Provider(window.ethereum)
            })
        }
    }, [window.ethereum])
    useEffect(() => {
        if (window.ethereum) {
            dispatch({
                type: "signer",
                payload: state.provider?.getSigner()
            })
        }
    }, [state.provider])

    const checkBalance = async () => {
        const myBalance = await state.contract.balanceOf(state.address);
        return myBalance;
    }
    //actions
    const buy = async (amount) => {
        try {
            const myBalance = fromBigNum(await checkBalance());
            if (amount > myBalance) {
                NotificationManager.error("Insufficient Balance");
                return false;
            }
            var erc = state.contract.connect(state.signer);
            var approve = await erc.approve(Contrats.presale.address, toBigNum(amount, 18));
            await approve.wait();
            var signedPresaleContract = presaleContract.connect(state.signer);
            // var addCoin = await signedPresaleContract.addStableCoin("0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7", true);
            // await addCoin.wait();
            // console.log("added");
            // var addCoin1 = await signedPresaleContract.addStableCoin("0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684", true);
            // await addCoin1.wait();
            // console.log("added");

            console.log(state.tokenAddress, toBigNum(amount, 18));
            var tx = await signedPresaleContract.buyWithStableCoin(state.tokenAddress, toBigNum(amount, 18));
            await tx.wait();
            NotificationManager.success("Buy Success");
        } catch (err) {
            console.log(err.message);
            NotificationManager.warning("An error has occurred.Please try again", "Warning");
        }
    }

    return (
        <BlockchainContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        buy,
                        dispatch
                    }
                ],
                [state]
            )}>
            {children}
        </BlockchainContext.Provider>
    );
}
