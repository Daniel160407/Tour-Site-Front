import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/messenger');
        setSocket(newSocket);

        newSocket.onopen = function () {
            setShowLogin(true);
        }

        newSocket.onerror = function(event) {
            console.error('WebSocket connection error:', event);
        };

        newSocket.onmessage = function (event) {
            const message = JSON.parse(event.data);
            if (message.sender === 'server') {
                setSid(message.message);
            } else {
                message.received = true;
                setMessages(prevmessages => [...prevmessages, message])
            }
        }

        axios.get(`http://localhost:8080/tours/adminpanel/messenger/messages?email=${email}`)
            .then(response => {
                const messages = response.data;
                setMessages([]);
                for(let i=0; i<messages.length; i++){
                    messages[i].received = messages[i].senderEmail === '';
                    setMessages(prevMessages => [...prevMessages, messages[i]]);
                }
            });
    }, []);

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
        setMessages(prevmessages => [...prevmessages, message]);
        setMessageInput('');
        document.getElementById('messageInput').value='';
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <>
            {showLogin && (
                <LogIn sid={sid} onLogin={() => setShowLogin(false)} setGlobalEmail={setEmail}/>
            )}
            {!showLogin && (
                <div className="chat-container">
                    <div className='messages-container'>
                        {messages.map((msg, index) => (
                            msg.received && (
                                <div className="received" key={index}>
                                    <div className="message">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ) || !msg.received && (
                                <div className="sent" key={index}>
                                    <div className="message">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    <div className="input-container">
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

export default ChatEndPoint;
