// import React, { useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";
// import { RiAccountCircleFill } from "react-icons/ri";

// export default function Header() {
//   const [isSideNavOpen, setIsSideNavOpen] = useState(false);

//   const toggleSideNav = () => {
//     setIsSideNavOpen(!isSideNavOpen);
//   };

//   return (
//     <div className="home-bg">
//       <nav className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
//         <ul>
//           <li>
//             <Link to="/form" className="link-register">
//              Make Order
//             </Link>
//             <Link to="/list" className="link-list">
//              Ordered List
//             </Link>
//           </li>
//           {/* <li>Login</li> */}
//           {/* <li>Profile</li> */}
//         </ul>
//       </nav>
//       <button className="toggle-button" onClick={toggleSideNav}>
//         {isSideNavOpen ? "" : ""} Food Registration and Details
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import "./Header.css";

export default function Header() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="home-bg">
      <header className="navbar">
        <button className="toggle-button" onClick={toggleSideNav}>
          ☰
        </button>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {/* <Link to="/form">Make Order</Link>
          <Link to="/list">Ordered List</Link> */}
        </div>
        <RiAccountCircleFill size={24} />
      </header>
      <nav className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/form" onClick={toggleSideNav}>
              Make Order
            </Link>
          </li>
          <li>
            <Link to="/list" onClick={toggleSideNav}>
              Ordered List
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
