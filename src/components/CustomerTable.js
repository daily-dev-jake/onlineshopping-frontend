import React, { useContext } from "react";
import AuthContext from "../context/auth-context";
const CustomerTable = () => {
    const ctx = useContext(AuthContext);

  return (
    <div>
      <div>{ctx.customer?.name}</div>
      <label id='showResultLabel'></label>
    </div>
  );
};

export default CustomerTable;
