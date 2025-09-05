import { useState } from "react";
import NavBar from "./NavBar";
import Items from "./Items"
import LoggedInNavBar from "./LoggedInNavBar";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <header className="header">
        <h1>Hockeystore</h1>
        {isAuthenticated ? <LoggedInNavBar /> : <NavBar />}
      </header>
      <div>
        <main>
          <div id="component-container">
            
          </div>
        </main>
        <footer className="footer">
          
        </footer>
      </div>
    </>
  );
}
//removed from <Items/> line 19 after <div id="component-container"/> to remove items from the home page
export default Home;
