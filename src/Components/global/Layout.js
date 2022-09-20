import { useState, useEffect } from "react";
import { useBlockchainContext } from '../../context';
import Switcher from "./Switcher";
import logo from "../../Assets/images/lettre n (1) 2.svg";
import iconMigration from "../../Assets/images/Vector (3).svg";
import iconArow from "../../Assets/images/arrow (8) 1.svg";
import toggle from "../../Assets/images/toggle.svg";

import france from "../../Assets/france.png";
import usa from "../../Assets/usa.png";

import { Presale } from "../sections/Presale";
import { Header } from "./Header";
import './Layout.css';

const locales = {
  "usa": require('../../locales/en-US.json'),
  "france": require('../../locales/fr-FR.json'),
};

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [presale, setPresaleActive] = useState(true);
  const [migration, setMigrationActive] = useState(false);
  const [isEng, setIsEng] = useState(true);

  const [state, { dispatch }] = useBlockchainContext();
  const { L } = state;


  const [screenSize, getDimension] = useState(window.innerWidth);
  const setDimension = () => {
    getDimension(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [screenSize])

  useEffect(() => {
    if (isEng) {
      dispatch({
        type: "L",
        payload: locales["usa"]
      })
    } else {
      dispatch({
        type: "L",
        payload: locales["france"]
      })
    }
  }, [isEng])
  useEffect(() => {
    window.localStorage.setItem('lang', 'usa')
  }, [])
  const activePresale = () => {
    setPresaleActive(true);
    setMigrationActive(false);
  };

  const activeMigration = () => {
    setPresaleActive(false);
    setMigrationActive(true);
  };

  return (
    <div className="layout flex  ">
      <div
        className={` ${open ? "width-64 padding-5" : "w-0 padding-tm-5"
          } bg-white layout_ h-screen  relative duration-300 md:fixed z-10`}
      >
        <img
          src={toggle}
          className={`toggle brightness-0 dark:filter-none hidden md:block sm:top-[53px] ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="error"
        />
        <div className="flex items-center justify-center">
          <img
            src={logo}
            className={`w-7 h-8 cursor-pointer duration-500 ${open && "rotate-360"
              }`}
            alt="error"
          />
          <h1
            className={`font-inter text-xl text-bold font-bold ml-2 next-font my-h1 ${!open && "scale-0"
              }`}
          >
            Nextep
          </h1>
        </div>
        <ul className="padding-top-11">
          <li
            onClick={() => activePresale()}
            className={`mt-10 flex  rounded-md py-3 px-2 mb-5 cursor-pointer items-center 
              ${presale ? "primary-bg white" : ""} ${open ? "pl-3" : "px-0"
              }`}
          >
            <img src={iconMigration} alt="error" />
            <span
              className={`${!open && "hidden"
                } origin-left duration-200 text-base ml-4 dark:white ${presale ? "white" : "site-grey-color"
                }`}
            >
              {/* Presale */}
              {L['presale']}
            </span>
          </li>


          {/* <li
            onClick={() => activeMigration()}
            className={`flex  rounded-md py-3 mb-5 cursor-pointer items-center 
              ${migration ? "primary-bg white" : ""} ${open ? "pl-3" : "pl-0"
              }`}
          >
            <img src={iconArow} alt="error" />
            <span
              className={`${!open && "hidden"
                } origin-left duration-200 text-base ml-4 dark:white ${migration ? "white" : "site-grey-color"
                }`}
            >
              Migration
            </span>
          </li> */}
        </ul>
        <div className={`${open ? "language-p-3" : ""} flex items-center justify-between switcher-body rounded-3xl mx-3`}>
          <div className={isEng ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => setIsEng(true)}>
            <img src={usa} width={34} className="pointer" alt="error" />
          </div>

          <div className="width-1 h-5 swithcer-ele mx-5"></div>

          <div className={!isEng ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => setIsEng(false)}>
            <img src={france} width={34} className="pointer" alt="error" />
          </div>
        </div>
        {/* <ul className="padding-top-11 multilanguage">
          <li
            onClick={() => setIsEng(!isEng)}
            className={`mt-10 flex rounded-md mb-5 cursor-pointer items-center multilanguage-contianer`}
          >
            {isEng ?
              <img src={usa} style={{ width: '34px', height: '39px' }} alt="error" />
              :
              < img src={france} style={{ width: '30px', height: '30px' }} alt="error" />
            }
          </li>
        </ul> */}
        <Switcher open={open} />
      </div>
      <div className="flex-1 p-7 relative">
        <Header />
        <Presale migration={migration} />
      </div>
    </div>
  );
};
export default Layout;
