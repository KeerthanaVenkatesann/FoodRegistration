import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import "./Header.css";
import { PiTrademarkRegisteredDuotone } from "react-icons/pi";
import { CgList, CgMenuBoxed } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="home-bg">
      <header className="navbar shadow-sm fixed-top">
        <div className="nav-links">
          <img src="/Assets/logo (2).png" alt="" width="50px" height="50px" />{" "}
          <Link to="/">FOOD REGISTRATION</Link>
          <Link to="/foodregistration" className="  register ">
            {/* <PiTrademarkRegisteredDuotone className="icons-1 fs-3 me-2 " />  */}
            Register
          </Link>
          <button className="toggle-button" onClick={toggleSideNav}>
            <CgMenuBoxed className="fs-3" />
          </button>
        </div>
      </header>
      <nav className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
        <ul>
          {/* <li>
            <input type="text"  className="input-sidenav"/><IoSearch/>
          </li> */}
          {/* <li>
            <Link to="/form" onClick={toggleSideNav}>
              <PiTrademarkRegisteredDuotone className="icons-1 fs-3 me-2 " /> 
          Food Register
            </Link>
          </li> */}
          <li>
            <Link to="/listmanaging" onClick={toggleSideNav}>
              <CgList className="icons-2 fs-4 ms-1 me-2 mb-1" />
              List Managing
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
