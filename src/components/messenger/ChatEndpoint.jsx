import React, { useEffect, useState } from "react";
import LogIn from "./LogIn";

function ChatEndPoint() {
    const [showLogin, setShowLogin] = useState(false);
    const [sid, setSid] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/messenger');
        setSocket(newSocket);

        newSocket.onopen = function(){
            setShowLogin(true);
        }

        newSocket.onmessage = function(event){
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.sender === 'server') {
                setSid(message.message);
            } else {
                message.received = true;
                setMessages(prevmessages => [...prevmessages, message])
            }
        }
    }, []);

    const sendMessage = () => {
        const message = {
            sender: sid,
            receiver: 'Admin',
            message: messageInput
        };
        setMessages(prevmessages => [...prevmessages, message]);
        setMessageInput('');

        socket.send(JSON.stringify(message));
    };

    const handleKeyPress = (event) => {
        if(event.target.value === 'Enter'){
            sendMessage();
        }
    }
    
    return (
        <>
            {showLogin && (
                <LogIn sid={sid} onLogin={() => setShowLogin(false)} />
            )}
            {!showLogin && (
                <div>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <input 
                        type="text" 
                        value={messageInput} 
                        onChange={(e) => setMessageInput(e.target.value)} 
                        placeholder="Type your message..."
                        onKeyPress={handleKeyPress} 
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            )}
            
        </>
        
    );
}

export default ChatEndPoint;
