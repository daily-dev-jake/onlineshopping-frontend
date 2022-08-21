import "./App.css";
//import { useEffect } from "react";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import Navbar from "./components/Navbar";
import FrontPage from "./components/FrontPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);

  const port = 5000;

  return (
    <div className='App'>
      <Navbar />
      {isAuthenticated ? (
        <div className='Page'>
          <FrontPage portno={port} />
        </div>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
}

export default App;
