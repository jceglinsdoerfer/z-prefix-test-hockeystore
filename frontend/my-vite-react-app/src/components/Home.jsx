import { useState } from "react";
import NavBar from "./NavBar";
import Items from "./Items"
// import Sidebar from "./SideBar";
// import PlaylistCard from "./PlaylistCard";
// import ArtistCard from "./ArtistCard";
// import "../CSS/Home.css";

function Home() {
  return (
    <>
      <header className="header">
        <h1>Hockeystore</h1>
        <NavBar />
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
