import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '/src/style/adminpanel/messenger/contactsList.scss';

function ContactsList({setContact}) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/adminpanel/messenger')
        .then(response => {
            setContacts(response.data);
        });
    }, []);

    const deleteContact = (contactEmail) => {
        axios.delete(`http://localhost:8080/tours/adminpanel/messenger?email=${contactEmail}`);
    }

    return (
        <div className="contacts-list">
            {contacts.map(contact => (
                <div className='contact' key={contact.name} onClick={() => setContact(contact)}>
                    <p>{contact.name}</p>
                    <div className='delete'>
                        <img src='/svg/trash.svg' alt='delete' onClick={() => deleteContact(contact.email)}></img>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactsList;
