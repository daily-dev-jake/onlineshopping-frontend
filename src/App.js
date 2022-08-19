import React, { useEffect } from "react";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { ContextHolder } from "@frontegg/rest-api";
import CustomerTable from "./components/CustomerTable";
import WelcomePage from "./components/WelcomePage";
import "./App.css";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const port = 5000;
  var isLoggedIn = isAuthenticated;
  var cName = user?.name;
  var cEmail = user?.email;
  var cProfilePic = user?.profilePictureUrl;

  const postCustomer = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Populate this data from e.g. form.
    var raw = JSON.stringify({
      cEmail: cEmail,
      cName: cName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    console.log("ran");

    fetch(`http://localhost:${port}/addCustomer`, requestOptions)
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  async function queryCustomer() {
    var url = `http://localhost:${port}/queryCustomer?cEmail=${cEmail}&cName=${cName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    if (data === "[]") postCustomer(cEmail, cName);
  }

  return (
    <div className='App'>
      <div className='nav'>
        {isLoggedIn ? (
          <div className='user-profile'>
            <h1>Jake's Phone shop</h1>
            <div className='detail'>
              <span className='heading'>{cName}</span>
              <div>
                <button onClick={() => logout()} className='button'>
                  Click to logout
                </button>
              </div>
              <div>
                <img src={cProfilePic} alt={cName} />
              </div>
            </div>
            {queryCustomer()}
          </div>
        ) : (
          <div className='user-profile'>
            <button className='button' onClick={() => loginWithRedirect()}>
              Login
            </button>
          </div>
        )}
      </div>
      {isAuthenticated ? (
        <CustomerTable
          isLoggedIn={isAuthenticated}
          cName={user?.name}
          cEmail={user?.email}
        />
      ) : (
        <WelcomePage isLoggedIn={isAuthenticated} />
      )}
    </div>
  );
}

export default App;
