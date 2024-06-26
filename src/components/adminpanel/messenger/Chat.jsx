// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '/src/style/adminpanel/messenger/chat.scss';

function Chat({ contact, setGlobalContacts }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [sid, setSid] = useState(null);
    const [showChat, setShowChat] = useState(false);
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
                
                axios.get('http://localhost:8080/tours/adminpanel/messenger', {
                    headers: {
                        'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                    }
                })
                    .then(response => {
                        setGlobalContacts(response.data.sort((a, b) => a.position - b.position));
                    });

                if (document.visibilityState === 'hidden') {
                    const notificationSound = new Audio('/sounds/notification-sound.wav');
                    notificationSound.play();
                }
            }
        };

        newSocket.onerror = function(error){
            console.log(error);
        }

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (sid !== null) {
            const user = {
                name: 'Admin',
                email: '',
                password: '',
                sid: sid
            };

            axios.post('http://localhost:8080/tours/messenger/login', user, {
                headers: {
                    'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                }
            });
        }
    }, [sid]);

    useEffect(() => {
        if (contact !== null) {
            setShowChat(true);
            axios.get(`http://localhost:8080/tours/adminpanel/messenger/messages?email=${contact.email}`, {
                headers: {
                    'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
                }
            })
                .then(response => {
                    const messages = response.data;
                    setMessages([]);
                    for (let i = 0; i < messages.length; i++) {
                        messages[i].received = messages[i].senderEmail !== '';
                        setMessages(prevMessages => [...prevMessages, messages[i]]);
                    }
                });
        }
    }, [contact]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        const message = {
            senderEmail: '',
            receiverEmail: contact.email,
            sender: 'Admin',
            receiver: contact.sid,
            message: messageInput
        };

        setMessageInput('');
        document.getElementById('messageInput').value = '';
        socket.send(JSON.stringify(message));

        message.received = false;
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {showChat && (
                <div className="admin-chat-container">
                    <div className='name'>
                        <h1>{contact.name}</h1>
                    </div>
                    <div className='messages-container'>
                        {messages.map((message, index) => (
                            contact.email === message.senderEmail && message.received ? (
                                <div className="received" key={index}>
                                    <div className="message">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            ) : !message.received ? (
                                <div className="sent" key={index}>
                                    <div className="message">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            ) : null
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div>
                        <input
                            id='messageInput'
                            type='text'
                            placeholder='Type something'
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}></input>
                    </div>
                </div>
            )}

        </>

    );
}

export default Chat;
