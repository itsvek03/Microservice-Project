import React, { useEffect } from 'react';
import Login from '../components/Login/Login.Component'
import { checkIfLoggedIn } from '../utils/login.util'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
    const history = useHistory();
    useEffect(() => {
        if (checkIfLoggedIn()) {
            history.push('/')
        }
    }, [])
    return (
        <div className="container">
            <div className="mt-5">
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;
