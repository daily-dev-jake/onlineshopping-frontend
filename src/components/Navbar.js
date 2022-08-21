import React, { useEffect } from "react";
import { ContextHolder } from "@frontegg/rest-api";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import "./Navbar.css";
import proper from "../helper/proper";

const Navbar = ({ portno }) => {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const postCustomer = (email, name) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Populate this data from e.g. form.
    var raw = JSON.stringify({
      cEmail: email,
      cName: name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    console.log("ran");

    fetch(`http://localhost:${portno}/addCustomer`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("result ", result))
      .catch((error) => console.log("error ", error));
  };

  async function queryCustomer(email, name) {
    var url = `http://localhost:${portno}/queryCustomer?cEmail=${email}&cName=${name}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    if (data === "[]") postCustomer(email, name);
  }

  useEffect(() => {
    if (isAuthenticated) {
      queryCustomer(user?.email, user?.name);
    }
  });

  return (
    <div className='nav'>
      <h1>Jake's Phone Shop</h1>
      {isAuthenticated ? (
        <>
          <span>{proper(user?.name)}</span>
          <img src={user?.profilePictureUrl} alt={proper(user?.name)} />
          <label onClick={logout}>Logout</label>
        </>
      ) : (
        <div className='nav-loggedout'>
          <label onClick={loginWithRedirect}>LOGIN</label>
        </div>
      )}
    </div>
  );
};

export default Navbar;
