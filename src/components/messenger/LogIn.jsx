import React, {useEffect, useState} from "react";
import axios from "axios";
import "/src/style/messenger/login.scss";

function LogIn({sid, onLogin, setGlobalEmail}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function save() {
        const user = {
            name: name,
            email: email,
            password: password,
            sid: sid
        };

        axios.post('http://localhost:8080/tours/messenger/login', user)
            .then(response => {
                console.log(response.data);
                onLogin();
            });

        setGlobalEmail(email);
    }

    return (
        <div className="log-in-container">
            <form onSubmit={save}>
                <input
                    className="log-in-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="log-in-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="log-in-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="log-in-button" type="submit">Save</button>
            </form>
            <div className="socialNetwork">
                <a href="https://www.facebook.com/goga.abulashvili" target="_blank"><img src="/svg/facebook.svg"
                                                                                         alt={'facebook'}></img> </a>
            </div>
        </div>
    );
}


export default LogIn;
