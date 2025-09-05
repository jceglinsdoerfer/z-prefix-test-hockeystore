import LoggedInNavBar from "./LoggedInNavBar";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";

export default function LoggedIn () {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <header className="header">
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
