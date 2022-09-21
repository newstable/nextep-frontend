import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providerOptions } from "../../const";
import { useEffect, useState } from "react";
import { toHex } from "../../utils";
import Wallet from "../../Assets/images/Vector (8).svg";
import { useBlockchainContext } from '../../context';
const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
});

const ConnectButton = ({ styleNames, img, styleP }) => {
    const [account, setAccount] = useState("");
    const [library, setLibrary] = useState();
    const [chainId, setChainId] = useState();

    const [state, { dispatch }] = useBlockchainContext();
    var styledAddress = account
        ? account.slice(0, 4) + "..." + account.slice(-4)
        : "";

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            provider.on("accountsChanged", async (accounts) => {
                if (accounts.length == 0) {
                    await web3Modal.clearCachedProvider();
                    refreshState();
                }
            })
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            dispatch({
                type: "provider",
                payload: library
            })
            setLibrary(library);
            if (accounts) {
                dispatch({
                    type: "address",
                    payload: accounts[0]
                })
                setAccount(accounts[0]);
            }
            setChainId(network.chainId);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (chainId != "97") {
            switchNetwork("97");
        }
    }, [account])

    useEffect(() => {
        setAccount(state.address);
    }, [state.address])

    const switchNetwork = async (network) => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(network) }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: toHex("137"),
                                chainName: "Polygon",
                                rpcUrls: ["https://polygon-rpc.com/"],
                                blockExplorerUrls: ["https://polygonscan.com/"],
                            },
                        ],
                    });
                } catch (addError) {
                    throw addError;
                }
            }
        }
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    const refreshState = () => {
        setAccount("");
    };

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        dispatch({
            type: "address",
            payload: ""
        })
        refreshState();
    }

    return (
        <>
            {!account ? (
                <button
                    className={styleNames}
                    onClick={connectWallet}
                >
                    {img == "Wallet" ?
                        <img src={Wallet} alt="error" />
                        : ""}
                    <p className={styleP}>
                        {/* Connect Wallet */}
                        {state.L['connect']}
                    </p>
                </button>
            ) : (
                <button
                    className={styleNames}
                    onClick={disconnect}
                >
                    {img == "Wallet" ?
                        <img src={Wallet} alt="error" />
                        : ""}
                    <p className="font-inter white ml-3 wallet-p sm:hidden">
                        {styledAddress}
                    </p>
                </button>
            )}
        </>
    )
}

export default ConnectButton;