import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-hn6idoci7con.frontegg.com",
  clientId: "8eca6a1f-e969-4a9f-8085-eaddbd77ae06",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <App />
  </FronteggProvider>
);

