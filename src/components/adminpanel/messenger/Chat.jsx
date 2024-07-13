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

                document.getElementById(message.senderEmail).style.fontWeight = '1000';
                document.title = '(1) Message';
                
                if (document.visibilityState === 'hidden') {
                    const notificationSound = new Audio('/sounds/notification-sound.wav');
                    notificationSound.play();
                }
            }
        };

        newSocket.onerror = function (error) {
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
        const date = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];

        const time = `${day} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        const message = {
            senderEmail: '',
            receiverEmail: contact.email,
            sender: 'Admin',
            receiver: contact.sid,
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

    return (
        <>
            {showChat && (
                <div className="admin-chat-container">
                    <div className='name'>
                        <h1>{contact.name}</h1>
                    </div>
                    <div className='messages-container'>
                        {messages.map((message, index) => (
                            <>
                                {(contact.email === message.receiverEmail || contact.email === message.senderEmail) && (
                                    <div key={index}>
                                        <p className="date">{index === 0 || message.time !== messages[index - 1].time ? message.time : ''}</p>
                                        <div className={message.received ? "received" : "sent"}>
                                            <div className="message">
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div>
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

export default Chat;
