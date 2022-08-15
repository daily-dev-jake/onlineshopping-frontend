import React, { useContext } from "react";
import { useLoginWithRedirect } from "@frontegg/react";
import { ContextHolder } from "@frontegg/rest-api";
import AuthContext from "../context/auth-context";
import "./Navbar.css";

const Navbar = () => {
  const loginWithRedirect = useLoginWithRedirect();

  const ctx = useContext(AuthContext);

  //Uncomment this to redirect to login automatically

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const postCustomer = (name, email) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Populate this data from e.g. form.
    var raw = JSON.stringify({
      name: name,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:5000/customer/add", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        document.getElementById("showResultLabel").innerHTML = result;
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className='nav'>
      {ctx.isLoggedIn ? (
        <div className='user-profile'>
          <div className='detail'>
            <span className='heading'>Welcome {ctx.customer?.name}</span>
            {postCustomer(ctx.customer?.name, ctx.customer?.email)}
          </div>
          <div>
            <button onClick={() => logout()} className='button'>
              Click to logout
            </button>
          </div>
          <div>
            <img
              src={ctx.customer?.profilePictureUrl}
              alt={ctx.customer?.name}
            />
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()} className='button'>
            Click me to login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
