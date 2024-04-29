import React, { useEffect, useState } from 'react';
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

        newSocket.onmessage = function(event) {
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
        if (sid!== null) {
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
        console.log(contact);
        if(contact!==null){
            setShowChat(true);
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

        
        setMessages([...messages, message]);
        setMessageInput('');
        document.getElementById('messageInput').value='';
        socket.send(JSON.stringify(message));

        message.received = false;
        // Send newMessage to server
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
            <div>
                <h1>{contact.name}</h1>
            </div>
            <div className='messages-container'>
                {messages.map((message, index) => (
                    <div className='message' key={index}>
                        <h3>{message.message}</h3>
                    </div>
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
