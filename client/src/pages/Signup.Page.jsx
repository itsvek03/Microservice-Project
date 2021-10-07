import React, { useEffect } from 'react';
import Signup from '../components/Signup/Signup.components'
import { checkIfLoggedIn } from '../utils/login.util'
import { useHistory } from 'react-router-dom'

const SignupPage = () => {
    const history = useHistory();
    useEffect(() => {
        if (checkIfLoggedIn()) {
            history.push('/')
        }
    }, [])
    return (
        <div className="container">
            <div className="mt-5">
                <Signup />
            </div>
        </div>
    );
}

export default SignupPage;
