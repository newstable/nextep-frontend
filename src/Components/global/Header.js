import React from "react";
import Wallet from "../../Assets/images/Vector (8).svg";
import logo from "../../Assets/images/lettre n (1) 2.svg";
import ConnectWalletButton from "./ConnectWalletButton";
import './Header.css';
export const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        {/* <div className="md:hidden">
          <p className="good-morning font-inter font-semibold text-black dark:text-white">👏🏻Good morning.</p>
        </div>

        <div className="hidden md:block w-5 md:flex-1 sm:flex-none">
          <p className="font-inter white-color"></p>
        </div> */}

        <div className="flex md:flex-1 sm:flex-none items-center">
          <img
            alt="error"
            src={logo}
            className={`w-6 h-8 cursor-pointer duration-500`}
          />
          <h1
            className={`nextep-font font-inter text-lg text-black dark:text-white text-bold font-bold ml-2 nextep-h1`}
          >
            Nextep
          </h1>
        </div>

        <ConnectWalletButton img={"Wallet"} styleNames={"wallet-btn flex items-center cursor-pointer"} styleP={"font-inter white ml-3 wallet-p sm:hidden"} />

        {/* <button className="wallet-btn flex items-center cursor-pointer">
          <img src={Wallet} alt="error" />
          <p className="font-inter white ml-3 wallet-p">
            <ConnectWalletButton />
          </p>
        </button> */}
      </div>
    </>
  );
};
