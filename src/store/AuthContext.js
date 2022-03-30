import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({
    idToken: "",
    email:"",
    onLogin: (idToken) => {},
    onLogout: () =>  {},
    onResetPassword: (tokne) => {},
})

export const AuthContextProvider = (props) => {
    const [idToken, setIdToken] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    // insted of useEffect we can directly fetch data from local storage,
    // then set it as initial state of idToken.
    // this is possible because localstorage is syncronus api
    // by doing this we are not override any state
    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
            setIdToken(token);
            setEmail(email);
        }
    }, []);

    const  onLogin = (email, idToken) => {
        setIdToken(idToken);
        localStorage.setItem('token', idToken);
        localStorage.setItem('email', email);
        navigate('/');
    };

    const onLogout = () => {
        setIdToken(null);
        localStorage.clear();
        navigate('/auth');
    };

    const onResetPassword = (token) => {
        setIdToken(token);
        localStorage.setItem('token', idToken);
    };

    return <AuthContext.Provider
    value={{
        idToken: idToken,
        email: email,
        onLogin: onLogin,
        onLogout: onLogout,
        onResetPassword: onResetPassword
    }}
    >
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;