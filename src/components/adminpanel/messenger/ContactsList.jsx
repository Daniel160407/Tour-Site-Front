import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Add PropTypes for prop validation
import '/src/style/adminpanel/messenger/contactsList.scss';
import Cookies from "js-cookie";

function ContactsList({ setContact, globalContacts }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/adminpanel/messenger', {
            headers: {
                'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
            }
        })
            .then(response => {
                setContacts(response.data.sort((a, b) => a.position - b.position));
            });
    }, []);

    useEffect(() => {
        if (globalContacts !== undefined) {
            setContacts(globalContacts);
        }
    }, [globalContacts]);

    const deleteContact = (contactEmail) => {
        axios.delete(`http://localhost:8080/tours/adminpanel/messenger?email=${contactEmail}`, {
            headers: {
                'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
            }
        })
            .then(response => {
                setContacts(response.data.sort((a, b) => a.position - b.position));
            });
    };

    const handleContactClick = (contact) => {
        setContact(contact);

        const contactNames = document.getElementById(contact.email);
        contactNames.style.fontWeight = 'normal';
        document.title = 'Georgia & Tours';
    };

    return (
        <div className="contacts-list">
            {contacts.map(contact => (
                <div className='contact' key={contact.name} onClick={() => handleContactClick(contact)}>
                    <p id={contact.email}>{contact.name}</p>
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

ContactsList.propTypes = {
    setContact: PropTypes.func.isRequired,
    globalContacts: PropTypes.array,
};

export default ContactsList;
