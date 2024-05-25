import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '/src/style/adminpanel/messenger/contactsList.scss';

// eslint-disable-next-line react/prop-types
function ContactsList({ setContact }) {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {
        axios.get('http://localhost:8080/tours/adminpanel/messenger')
            .then(response => {
                setContacts(response.data);
            });
    };

    useEffect(() => {
        fetchContacts();
        const intervalId = setInterval(fetchContacts, 30000);
        return () => clearInterval(intervalId);
    }, []);

    const deleteContact = (contactEmail) => {
        axios.delete(`http://localhost:8080/tours/adminpanel/messenger?email=${contactEmail}`)
            .then(response => {
                setContacts(response.data);
            });
    };

    return (
        <div className="contacts-list">
            {contacts.map(contact => (
                <div className='contact' key={contact.name} onClick={() => setContact(contact)}>
                    <p>{contact.name}</p>
                    <div className='delete'>
                        <img src='/svg/trash.svg' alt='delete' onClick={(e) => {
                            e.stopPropagation();
                            deleteContact(contact.email);
                        }}></img>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactsList;
