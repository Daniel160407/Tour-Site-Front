import React, { useEffect, useState, useRef } from "react";
import LogIn from "./LogIn";
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
        const newSocket = new WebSocket('ws://localhost:8080/messenger');
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
        }
    }, []);

    useEffect(() => {
        if (!showLogin) {
            axios.get(`http://localhost:8080/tours/adminpanel/messenger/messages?email=${email}`)
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
        const message = {
            senderEmail: email,
            receiverEmail: '',
            sender: sid,
            receiver: 'Admin',
            message: messageInput
        };

        socket.send(JSON.stringify(message));

        message.received = false;
        setMessages(prevMessages => [...prevMessages, message]);
        setMessageInput('');
        document.getElementById('messageInput').value = '';
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            sendMessage();
        }
    }

    return (
        <>
            {showLogin && (
                <LogIn sid={sid} onLogin={() => setShowLogin(false)} setGlobalEmail={setEmail} />
            )}
            {!showLogin && (
                <div className="chat-container">
                    <div className='messages-container'>
                        {messages.map((msg, index) => (
                            msg.received ? (
                                <div className="received" key={index}>
                                    <div className="message">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="sent" key={index}>
                                    <div className="message">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            )
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-container">
                        <input
                            id='messageInput'
                            type='text'
                            placeholder='Tipe something'
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}></input>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatEndPoint;
