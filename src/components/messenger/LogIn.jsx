import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "/src/style/messenger/login.scss";

// eslint-disable-next-line react/prop-types
function LogIn({ sid, onLogin, setGlobalEmail }) {
    const [name, setName] = useState(Cookies.get('username') || '');
    const [email, setEmail] = useState(Cookies.get('userEmail') || '');
    const [password, setPassword] = useState(Cookies.get('userPassword') || '');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (sid !== '' && name !== '' && email !== '' && password !== '') {
            axios.get(`http://localhost:8080/tours/users?email=${email}`, {
                headers: {
                    'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                }
            })
                .then(response => {
                    if(response.status === 200){
                        handleLogin('Enter');
                    }
                });
        }
    }, [sid]);

    function handleLogin(event) {
        if (event.key === 'Enter' || event === 'Enter') {
            const user = {
                name: name,
                email: email,
                password: password,
                sid: sid,
                position: 1
            };

            axios.post('http://localhost:8080/tours/messenger/login', user, {
                headers: {
                    'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                }
            })
                .then(response => {
                    if (response.status === 202) {
                        Cookies.set('username', name, { expires: 1 });
                        Cookies.set('userEmail', email, { expires: 1 });
                        Cookies.set('userPassword', password, { expires: 1 });

                        setGlobalEmail(email);
                        onLogin();
                    }
                })
                .catch(() => {
                    setShowError(true);
                    document.getElementsByClassName('log-in-container')[0].style.height = '270px';
                });
        }
    }

    return (
        <div className="log-in-container">
            <form onSubmit={(e) => { e.preventDefault(); handleLogin('Enter'); }}>
                <input
                    className="log-in-input"
                    id='name'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleLogin}
                    required
                />
                <input
                    className="log-in-input"
                    id='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleLogin}
                    required
                />
                <input
                    className="log-in-input"
                    id='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleLogin}
                    required
                />
                {showError && (
                    <p className='errorMessage'>Invalid email or password</p>
                )}
                <button className="log-in-button" type="submit">Go to Chat</button>
            </form>
            <div className="socialNetwork">
                <a href="https://www.facebook.com/goga.abulashvili" target="_blank" rel="noopener noreferrer">
                    <img src="/svg/facebook.svg" alt="facebook" />
                </a>
            </div>
        </div>
    );
}

export default LogIn;
