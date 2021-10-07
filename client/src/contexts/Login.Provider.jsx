import React, { useContext, useState } from "react";
import { checkIfLoggedIn } from '../utils/login.util'

const LoginContext = React.createContext();

const AppDrawerProvider = ({ children }) => {
    const [details, setDetails] = useState(checkIfLoggedIn());
    const values = {
        details,
        setDetails,
    };
    console.log("Details", details)
    return (
        <LoginContext.Provider value={values}>
            {children}
        </LoginContext.Provider>
    );
};

const useLoginContext = () => useContext(LoginContext);

export { LoginContext, useLoginContext };

export default AppDrawerProvider;