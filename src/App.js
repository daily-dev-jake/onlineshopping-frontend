import React, { useEffect } from "react";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import Navbar from "./components/Navbar";
import CustomerTable from "./components/CustomerTable";
import AuthContext from "./context/auth-context";
import "./App.css";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuthenticated,
        customer: user,
      }}>
      <div className='App'>
        <Navbar />
        <CustomerTable />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
