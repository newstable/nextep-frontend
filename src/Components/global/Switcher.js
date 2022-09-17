import React, { useState } from "react";
import useDarkSide from "../customHooks/useDarkSide";
import Dark from "../../Assets/images/Vector (5).svg";
import Light from "../../Assets/images/Vector (6).svg";
import './Switcher.css';

export default function Switcher({ open }) {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className="switcher">
        <div className={`${open ? "switcher-style-1" : ""} flex items-center justify-between py-3 switcher-body rounded-3xl mx-3`}>
          <div className={darkSide ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => toggleDarkMode(true)}>
            <img src={Dark} className="brightness-0 dark:filter-none pointer" alt="error" />
          </div>

          <div className="width-1 h-5 swithcer-ele mx-5"></div>

          <div className={darkSide === false ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => toggleDarkMode(false)}>
            <img src={Light} className="brightness-0 dark:filter-none pointer" alt="error" />
          </div>
        </div>
      </div>
    </>
  );
}
