import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '/src/style/adminpanel/login.scss';
import root from '../../script/root';
import AdminPanelApp from './AdminPanelApp';

function LogIn() {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const email = Cookies.get('email');
        const password = Cookies.get('password');

        if (email !== undefined && password !== undefined) {
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;

            handleKeyPress('Enter');
        }
    }, []);

    function handleKeyPress(event){
        if(event.key === 'Enter' || event === 'Enter'){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const admin = {
                email: email,
                password: password
            }
            axios.post('http://localhost:8080/tours/adminpanel/login', admin)
            .then(response => {
                if(response.status === 200){
                    if (document.getElementById('checkbox').checked) {
                        Cookies.set('email', email, {expires: 1});
                        Cookies.set('password', password, {expires: 1});
                    }

                    root.render(
                        <AdminPanelApp/>
                    );
                }
            });

            setShowError(true);
        }
    }

    return (
        <div id="login">
            <div>
                <h1>Log In</h1><br/>
                <input id='email' type='email' placeholder='Write your email' onKeyPress={handleKeyPress}></input>
                <input id='password' type='password' placeholder='Write your password' onKeyPress={handleKeyPress}></input>
                {showError && (
                    <p className='errorMessage'>Invalid email or password!</p>
                )}
                <label htmlFor={'checkbox'}>Remember me</label> <input id='checkbox' type='checkbox'></input>
                <button id="loginButton" style={{display: 'none'}} onClick={handleKeyPress}></button>
            </div>
        </div>
    );
}

export default LogIn;
