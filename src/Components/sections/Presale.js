
import React, { useEffect, useState } from "react";
// import logo from "../../Assets/images/";
import Img from "../../Assets/images/Rectangle 4374.svg";
import CXE from "../../Assets/images/logo-1.png";
import { ReactComponent as Solana } from "../../Assets/images/solana-sol-logo 1.svg";
import Dex from "../../Assets/images/Frame 1000001031.svg";
import Crypto from "../../Assets/images/website (4) 1.svg";
import Mail from "../../Assets/images/mail 1.svg";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import USDT from "../../Assets/images/tether-usdt-logo.svg";
import NextBnB from "../../Assets/images/binance-coin-seeklogo.com.svg";
import { useBlockchainContext } from '../../context';
import ConnectButton from "../global/ConnectWalletButton";
import { NotificationManager } from "react-notifications";
import './Presale.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loading from "../../Assets/loader.gif";
import Copy from "../../Assets/copy.png";
import Copy_white from "../../Assets/copy-white.png";
const addresses = [
  "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
  "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684"
]

export const Presale = ({ migration }) => {
  const [loading, setLoading] = useState(false);
  const [state, { dispatch, buy }] = useBlockchainContext();
  const [receive, setRecieveValue] = useState(0);
  const [pay, setPayValue] = useState(0);
  const [item, setItemActive] = useState(false);
  const { address, tokenAddress, amount, cxsAmount, L } = state;
  const [copied, setCopied] = useState(false);

  const onReceiveChange = (e) => {
    setRecieveValue(e);
    setPayValue(e * 1000);
  };

  const onPayChange = (e) => {
    setPayValue(e.target.value);
    setRecieveValue(e.target.value / 1000);
  };

  useEffect(() => {
    if (copied) {
      NotificationManager.success("Successfully Copied!", "Success");
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied])

  const onBuy = async () => {
    setLoading(true);
    await buy(receive);
    setLoading(false);
  }

  // useEffect(() => {
  //   pay = receive * 10;
  // }, [receive])

  const selectedMenu = (bool, num) => {
    setItemActive(bool);
    dispatch({
      type: "tokenAddress",
      payload: addresses[num]
    })
  };

  return (
    <div className="presale-card tran-1 sm:tran-1 sm:mt-9">
      <div className="absolute p-21 sm:w-[100%] sm:top-24 sm:-translate-y-2/4">
        <div className="px-8 py-7 bg-white dark:bg-black rounded-3xl">
          <div>
            <h1 className="font-inter text-black dark:text-white text-lg font-semibold mb-3 pb-0">
              {/* Buy CXS Coin */}
              {L['buy_cxs']}
            </h1>
            <p className="font-inter text-color-1 dark:text-slate-500 text-sm mb-4">
              {/* Select wallet */}
              {L['select_wallet']}
            </p>
            <CopyToClipboard onCopy={() => setCopied(true)} text={address ? address : L["connectwallet"]}>
              <div className="flex relative justify-between items-center w-100 bg-color-1 dark:bg-black-1 pading-3 rounded-lg mb-6 sm:w-[100%] cursor-pointer">
                <div className="flex items-center w-full">
                  {/* <img src={Img} alt="error" /> */}
                  <div className="flex flex-col ml-5 w-full">
                    <label className="label-style-1 font-inter text-color-1 dark:text-white text-base">
                      {/* Address */}
                      {L['address']}
                    </label>
                    <div className="flex flex-row justify-between">
                      <p className="font-inter text-slate-400 text-sm">
                        {address ? address.slice(0, 8) + "..." + address.slice(address.length - 8, address) : L["connectwallet"]}
                      </p>
                      <img src={Copy} width="28" className="dark:hidden"></img>
                      <img src={Copy_white} width="28" className="dark:block hidden"></img>
                    </div>
                  </div>
                </div>
              </div>
            </CopyToClipboard>

            <div>
              <div className="flex justify-between items-center">
                <p className="font-inter text-slate-400 text-sm mb-2">
                  {/* You Pay */}
                  {L['you_pay']}
                </p>
                <div className="dark:text-white text-black mr-4">{L['my_balance']} : {amount ? amount.toFixed(0) : 0}
                  <button className="max-btn ml-2 dark:text-white text-black" onClick={() => onReceiveChange(amount)}>Max</button>
                </div>
              </div>
              <div className="flex justify-between items-center w-100 bg-color-1 dark:bg-black-1 p-4 rounded-xl mb-6 sm:w-[100%]">
                <div className="flex items-center flex-grow-7">
                  <div className="flex flex-col">
                    <input
                      onChange={(e) => onReceiveChange(e.target.value)}
                      value={receive}
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      className="outline-style-1 font-inter text-base text-color-1 bg-color-1 dark:bg-black-1 sm:w-[100%]"
                    />
                  </div>
                </div>
                <div
                  className={`${migration ? "hide-dropdown" : "show-dropdown"
                    } flex items-center flex-grow-2`}
                >
                  {item ? (
                    <Dropdown
                      activeKey="1"
                      classPrefix={migration ? "flex bg-dropdown-1" : "flex bg-dropdown-1 usd"}
                      title={migration ? "Nextep BNB chain" : "USDT"}
                      icon={
                        migration ? (
                          <img src={NextBnB} alt="error" className="w-5" />
                        ) : (
                          <img
                            src={USDT}
                            className="w-5 h-5"
                            alt="error"
                          />
                        )
                      }
                    >
                      <Dropdown.Item
                        onSelect={() => selectedMenu(false, 0)}
                        icon={<Solana />}
                      >
                        BUSD
                      </Dropdown.Item>
                    </Dropdown>
                  ) : (
                    <Dropdown
                      activeKey="1"
                      classPrefix="flex bg-dropdown-1 dark:bg-dropdown-1 busd"
                      title={migration ? "Nextep BNB chain" : "BUSD"}
                      icon={
                        migration ? (
                          <img src={NextBnB} alt="error" className="w-5" />
                        ) : (
                          <Solana />
                        )
                      }
                    >
                      <Dropdown.Item
                        onSelect={() => selectedMenu(true, 1)}
                        icon={
                          <img
                            src={USDT}
                            className="w-5 h-5"
                            alt="error"
                          />
                        }
                      >
                        USDT
                      </Dropdown.Item>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-inter text-slate-400 text-sm mb-2">
                  {/* You receive */}
                  {L['receive']}
                </p>
                <div className="dark:text-white text-black mr-4">{L['cxs_bal']} : {cxsAmount ? cxsAmount.toFixed(0) : 0}</div>
              </div>
              <div className="flex justify-between items-center w-100 bg-color-1 dark:bg-black-1 p-4 rounded-xl sm:w-[100%]">
                <div className="flex items-center flex-grow-7">
                  <div className="flex flex-col">
                    <input
                      onChange={(e) => onPayChange(e)}
                      value={pay}
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      className="outline-style-1 font-inter text-base text-color-1 dark:text-slate-100 bg-color-1 dark:bg-black-1 sm:w-[100%]"
                    />
                  </div>
                </div>
                <div className="flex items-centerflex-grow-2">
                  <img src={CXE} width={25} alt="error" />
                  <p className="font-inter text-color-1 dark:text-white text-base mg-style-0 pl-2 mr-5">
                    {migration ? "Nextep Nxchain" : "CXS"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {address ?
              loading ?
                <button className="width-60 pt-2 pb-2 display-center wallet-btn text-sm text-white font-inter rounded-md mt-6 sm:w-[100%]">
                  <img src={Loading} style={{ height: "35px" }}></img>
                </button>
                :
                <button onClick={onBuy} className="width-60 pt-4 pb-4 wallet-btn text-sm text-white font-inter rounded-md mt-6 sm:w-[100%]">
                  {/* VALIDATE */}
                  {L['validate']}
                </button>
              :
              <div className="width-60 pt-4 pb-4 wallet-btn text-sm text-white font-inter rounded-md mt-6 sm:w-[100%] flex-center">
                <ConnectButton styleP={"font-inter white ml-3 wallet-p"} />
              </div>
            }

          </div>
        </div>

        <div className="flex items-center flex-col mt-6">
          <div className="flex mb-5 sm:flex-col sm:mb-4 sm:w-[100%]">
            <a href="mailto:contact@nextep-crypto.com" className="md:w-[100%]">
              <div className="flex items-center justify-center border border-black dark:border-white padding-9 border-opacity-10 mr-4 sm:mr-[0px] sm:mb-[16px]">
                <img
                  src={Mail}
                  className="brightness-0 dark:filter-none"
                  alt="error"
                />
                <p className="font-inter text-color-1 dark:text-white text-base ml-3">
                  {/* Mail */}
                  {L['mail']}
                </p>
              </div>
            </a>
            {/* <a
              href="https://pancakeswap.finance/swap"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-center border border-black dark:border-white padding-9 border-opacity-10 mr-4 sm:mr-[0px] sm:mb-[16px]">
                <img
                  src={Dex}
                  className="brightness-0 dark:filter-none"
                  alt="error"
                />
                <p className="font-inter text-color-1 dark:text-white text-lg ml-3">
                  DEX (Pancakeswap)
                </p>
              </div>
            </a> */}

            <a href="https://Nextepcrypto.com" target="_blank" rel="noreferrer">
              <div className="flex items-center justify-center border border-black dark:border-white padding-9 border-opacity-10">
                <img
                  src={Crypto}
                  className="brightness-0 dark:filter-none"
                  alt="error"
                />
                <p className="font-inter text-color-1 dark:text-white text-base ml-3">
                  Nextepcrypto.com
                </p>
              </div>
            </a>
          </div>

          {/* <a href="mailto:contact@nextep-crypto.com" className="md:w-[100%]">
            <div className="flex items-center justify-center border border-black dark:border-white padding-9 border-opacity-10 sm:w-[100%]">
              <img
                src={Mail}
                className="brightness-0 dark:filter-none"
                alt="error"
              />
              <p className="font-inter text-color-1 dark:text-white text-base ml-3">
                Mail
              </p>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};
