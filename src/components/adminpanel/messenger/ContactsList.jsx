import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '/src/style/adminpanel/messenger/contactsList.scss';

function ContactsList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/adminpanel/messenger')
        .then(response => {
            setContacts(response.data);
        });
    }, []);

    return (
        <div className="contacts-list">
            {contacts.map(contact => (
                <div className='contact' key={contact.sid}>
                    <p>{contact.name}</p>
                </div>
            ))}
        </div>
    );
}

export default ContactsList;
