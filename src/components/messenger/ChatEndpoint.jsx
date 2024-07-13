import React, { useEffect, useState, useRef } from "react";
import LogIn from "./LogIn";
import Cookies from 'js-cookie';
import '/src/style/messenger/chatEndPoint.scss';
import axios from "axios";

function ChatEndPoint() {
    const [showLogin, setShowLogin] = useState(true);
    const [sid, setSid] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8080/messenger`);
        setSocket(newSocket);

        newSocket.onmessage = function (event) {
            const message = JSON.parse(event.data);
            if (message.sender === 'server') {
                setSid(message.message);
            } else {
                message.received = true;
                setMessages(prevMessages => [...prevMessages, message]);

                if (document.visibilityState === 'hidden') {
                    const notificationSound = new Audio('/sounds/notification-sound.wav');
                    notificationSound.play();
                }
            }
        };

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!showLogin) {
            axios.get(`http://localhost:8080/tours/adminpanel/messenger/messages?email=${email}`, {
                headers: {
                    'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                }
            })
                .then(response => {
                    const messages = response.data;
                    setMessages([]);
                    for (let i = 0; i < messages.length; i++) {
                        messages[i].received = messages[i].senderEmail === '';
                        setMessages(prevMessages => [...prevMessages, messages[i]]);
                    }
                });
        }
    }, [showLogin, email]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        const date = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];

        const time = `${day} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        const message = {
            senderEmail: email,
            receiverEmail: '',
            sender: sid,
            receiver: 'Admin',
            message: messageInput,
            time: time
        };

        socket.send(JSON.stringify(message));

        message.received = false;
        setMessages(prevMessages => [...prevMessages, message]);
        setMessageInput('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && messageInput.trim() !== '') {
            sendMessage();
        }
    };

    const onLogout = () => {
        Cookies.remove('username');
        Cookies.remove('userEmail');
        Cookies.remove('userPassword');
        setShowLogin(true);
    };

    return (
        <>
            {showLogin ? (
                <LogIn sid={sid} onLogin={() => setShowLogin(false)} setGlobalEmail={setEmail} />
            ) : (
                <div className="chat-container">
                    <div className="logout-button-container">
                        <button className="logout-button" onClick={onLogout}>Log Out</button>
                    </div>
                    <div className='messages-container'>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <p className="date">{index === 0 || msg.time !== messages[index - 1].time ? msg.time : ''}</p>
                                <div className={msg.received ? "received" : "sent"}>
                                    <div className="message">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-container">
                        <input
                            id='messageInput'
                            type='text'
                            placeholder='Type something'
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatEndPoint;
