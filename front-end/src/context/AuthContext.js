import React from "react";
const AuthContext = React.createContext();

export const AuthProvider = (props) =>{
    const [userauth, setAuth] = React.useState({})
    return (
        <AuthContext.Provider value={{userauth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )

}


export default AuthContext;