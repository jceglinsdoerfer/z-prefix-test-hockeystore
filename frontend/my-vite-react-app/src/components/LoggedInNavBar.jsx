import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


function LoggedInNavBar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/hockeystore/logout", {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                alert("Logged out successfully!");
                setTimeout(() =>navigate('/Home'), 100);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <>
            <nav className="topnav">
                <Link to="/Home"><button className="nav-btn">Home</button></Link>
                <Link to="/UserItems"><button className="nav-btn">UserItems</button></Link>
                <Link to="/CreateNewItem"><button className="nav-btn">CreateNewItem</button></Link>
                <Link to="/UpdateItem"><button className="nav-btn">UpdateItem</button></Link>
                <Link to="/Items"><button className="nav-btn">Items</button></Link>
                <button className="nav-btn" onClick={handleLogout}>Logout</button>
            </nav>
        </>
    );
}

export default LoggedInNavBar;
