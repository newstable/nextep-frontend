import { useState, useEffect } from "react";
import Switcher from "./Switcher";
import logo from "../../Assets/images/lettre n (1) 2.svg";
import iconMigration from "../../Assets/images/Vector (3).svg";
import iconArow from "../../Assets/images/arrow (8) 1.svg";
import toggle from "../../Assets/images/toggle.svg";
import { Presale } from "../sections/Presale";
import { Header } from "./Header";
import './Layout.css';

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [presale, setPresaleActive] = useState(true);
  const [migration, setMigrationActive] = useState(false);

  const activePresale = () => {
    setPresaleActive(true);
    setMigrationActive(false);
  };

  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //         setOpen(false)
  //     } else {
  //         setOpen(true)
  //     }
  //   }

  const activeMigration = () => {
    setPresaleActive(false);
    setMigrationActive(true);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <div className="layout flex  ">
      <div
        className={` ${open ? "width-64 padding-5" : "w-0 padding-tm-5"
          } bg-white layout_ h-screen  relative duration-300 md:fixed z-10`}
      >
        <img
          src={toggle}
          className={`toggle brightness-0 hidden md:block sm:top-[53px] ${!open && "rotate-180"}`}
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
        <ul className="padding-11">
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
              Presale
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
