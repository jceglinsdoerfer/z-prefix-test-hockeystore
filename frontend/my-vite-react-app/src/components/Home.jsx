import { useState } from "react";
import NavBar from "./NavBar";
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
            <Items />
          </div>
        </main>
        <footer class="footer">
          
        </footer>
      </div>
    </>
  );
}

export default Home;
