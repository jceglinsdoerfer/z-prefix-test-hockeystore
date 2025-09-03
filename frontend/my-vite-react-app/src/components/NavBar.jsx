import { useState } from "react";
import { Link } from "react-router-dom"


function NavBar() {
  return (
    <>
        <nav className="topnav">
            <Link to="/Home"><button className="nav-btn">Home</button></Link>
            <Link to="/Login"><button className="nav-btn">Login</button></Link>
            <Link to="/CreateNewUser"><button className="nav-btn">CreateNewUser</button></Link>
            <Link to="/Items"><button className="nav-btn">Items</button></Link>
            <Link to="/Users"><button className="nav-btn">User</button></Link>
            <Link to="/UserItems"><button className="nav-btn">UserItems</button></Link>
        </nav>
    </>
    );
}

export default NavBar;
