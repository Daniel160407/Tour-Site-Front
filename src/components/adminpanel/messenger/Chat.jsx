import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '/src/style/adminpanel/messenger/chat.scss';

function Chat({contact}) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [sid, setSid] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/messenger');
        setSocket(newSocket);

        newSocket.onmessage = function (event) {
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.sender === 'server') {
                setSid(message.message);
            } else {
                message.received = true;
                setMessages(prevMessages => [...prevMessages, message]);
            }
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

            axios.post('http://localhost:8080/tours/messenger/login', user)
                .then(response => {
                    console.log(response.data);
                });
        }
    }, [sid]);

    useEffect(() => {
        if (contact !== null) {
            setShowChat(true);
            axios.get(`http://localhost:8080/tours/adminpanel/messenger/messages?email=${contact.email}`)
            .then(response => {
                const messages = response.data;
                console.log(messages);
                setMessages([]);
                for(let i=0; i<messages.length; i++){
                    messages[i].received = messages[i].senderEmail !== '';
                    setMessages(prevMessages => [...prevMessages, messages[i]]);
                }
            });
        }
    }, [contact]);

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
                <div className="chat-container">
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

                    </div>
                    <div>
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

export default Chat;
