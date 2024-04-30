import React, {useEffect, useState} from "react";
import LogIn from "./LogIn";
import '/src/style/messenger/chatEndPoint.scss';
import axios from "axios";

function ChatEndPoint() {
    const [showLogin, setShowLogin] = useState(false);
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

        newSocket.onmessage = function (event) {
            const message = JSON.parse(event.data);
            console.log(message);
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
                    if(messages[i].senderEmail !== ''){
                        messages[i].received = false;
                    }else{
                        messages[i].received = true;
                    }
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

export default ChatEndPoint;
