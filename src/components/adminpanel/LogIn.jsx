import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '/src/style/adminpanel/login.scss';
import root from '../../script/root';
import Content from './Content';
import Navbar from '../Navbar';

function LogIn() {
    const history = useHistory();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            root.render(
                <>
                    <Navbar/>
                    <Content/>
                </>
            );
        }
    }, [history]);

    function handleKeyPress(event){
        if(event.key === 'Enter'){
            const admin = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
            axios.post('http://localhost:8080/tours/adminpanel/login', admin)
            .then(response => {
                if(response.status === 200){
                    if (document.getElementById('checkbox').checked) {
                        localStorage.setItem('isLoggedIn', 'true');
                    } else {
                        localStorage.setItem('isLoggedIn', 'false');
                    }
                    
                    root.render(
                        <>
                            <Navbar/>
                            <Content/>
                        </>
                    );
                    document.getElementById('root').style='display: flex; height: 700px; justify-content: center; gap: 50px;';
                } else {
                    //TODO: add error message
                }
            });
        }
    }

    return (
        <div id="login">
            <div>
                <h1>Log In</h1><br/>
                <input id='email' type='email' placeholder='Write your email' onKeyPress={handleKeyPress}></input>
                <input id='password' type='password' placeholder='Write your password' onKeyPress={handleKeyPress}></input>
                <label htmlFor={'checkbox'}>Remember me</label> <input id='checkbox' type='checkbox'></input>
            </div>
        </div>
    );
}

export default LogIn;
