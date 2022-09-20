import React from "react";
import Wallet from "../../Assets/images/Vector (8).svg";
import logo from "../../Assets/images/logo.png";
import ConnectWalletButton from "./ConnectWalletButton";
import { useBlockchainContext } from '../../context';

import './Header.css';
export const Header = () => {
  const [state] = useBlockchainContext();
  const { L } = state;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="md:hidden" style={{ width: "200px" }}>
          <p className="good-morning font-inter font-semibold text-black dark:text-white">👏🏻{L['good']}.</p>
        </div>

        <div className="hidden md:block w-5 md:flex-1 sm:flex-none">
          <p className="font-inter white-color"></p>
        </div>

        <div className="flex md:flex-1 sm:flex-none items-center">
          {/* <img
            alt="error"
            src={logo}
            className={`w-6 h-8 cursor-pointer duration-500`}
          /> */}
          <h1
            className={`font-inter text-3xl text-bold font-bold ml-2 nextep-h1 text-1 md:mr-6`}
          >
            <img src={logo} width={250}></img>
          </h1>
        </div>
        <div style={{ width: "200px" }} className="flex">
          <ConnectWalletButton img={"Wallet"} styleNames={"wallet-btn flex items-center cursor-pointer ml-auto"} styleP={"font-inter white ml-3 wallet-p sm:hidden"} />
        </div>
      </div>
    </>
  );
};
