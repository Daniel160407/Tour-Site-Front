import { useState } from "react";
import ContactsList from "./ContactsList";
import Chat from "./Chat";
import '/src/style/adminpanel/messenger/messenger.scss';

function Messenger(){
    const [contact, setContact] = useState(null);
    return(
        <div id='contact' className='tab-pane tab fade'>
            <ContactsList setContact={setContact}/>
            <Chat contact={contact}/>
        </div>
    );
}

export default Messenger;