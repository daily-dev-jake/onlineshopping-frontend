import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-hn6idoci7con.frontegg.com",
  clientId: "c86f9f73-4b73-4f1a-8f58-df87e7ab8dee",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <App />
  </FronteggProvider>
);

