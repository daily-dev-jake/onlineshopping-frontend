import React from "react";
const AuthContext = React.createContext({
    isLoggedIn:false,
    customer:{}
});

export default AuthContext;