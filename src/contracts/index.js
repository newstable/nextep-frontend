import { ethers } from "ethers";

import Contrats from "./contracts/97.json";

const supportChainId = 97;

const RPCS = {
    1: "http://13.59.118.124/eth",
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network",
    26: "https://mainnet-rpc.icicbchain.org",
    417: "https://testnet-rpc.icicbchain.org",
    1337: "http://localhost:7545",
    31337: "http://localhost:8545/",
    4: "https://rinkeby.infura.io/v3/580d6de4d2694cbdbee111d2f553dbcc"
}

const providers = {
    1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    56: new ethers.providers.JsonRpcProvider(RPCS[56]),
    250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
    26: new ethers.providers.JsonRpcProvider(RPCS[26]),
    417: new ethers.providers.JsonRpcProvider(RPCS[417]),
    4: new ethers.providers.JsonRpcProvider(RPCS[4]),
    97: new ethers.providers.JsonRpcProvider(RPCS[97])
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337])
}

const ERCContract = (e) => {
    const result = new ethers.Contract(
        e, Contrats.token.abi, providers[supportChainId]
    )
    return result;
}
const presaleContract = new ethers.Contract(Contrats.presale.address, Contrats.presale.abi, providers[supportChainId]);

export {
    providers, ERCContract, presaleContract, Contrats
}