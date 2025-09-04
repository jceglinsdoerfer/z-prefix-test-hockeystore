import { useState } from "react";
import { Link } from "react-router-dom"


function LoggedInNavBar() {
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhose:8000/hockeystore/logout", {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                alert("Logged out successfully!");
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
                <Link to="/Logout"><button className="nav-btn">Log Out</button></Link>
                <button className="nav-btn" onClick={handleLogout}>Logout</button>
            </nav>
        </>
    );
}

export default LoggedInNavBar;
