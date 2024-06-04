import { useEffect, useState } from "react";
import ContactsList from "./ContactsList";
import Chat from "./Chat";
import '/src/style/adminpanel/messenger/messenger.scss';

function Messenger({adminMode}){
    const [contact, setContact] = useState(null);
    const [display, setDisplay] = useState(null);
    const [globalContacts, setGlobalContacts] = useState([]);

    useEffect(()=>{
        if(adminMode){
            setDisplay('flex');
        }
    },[])
    
    return(
        <div id='contact' className='tab-pane tab fade'>
            <div id="chat" style={{display: display}}>
                <ContactsList setContact={setContact} globalContacts={globalContacts}/>
                <Chat contact={contact} setGlobalContacts={setGlobalContacts}/>
            </div>
        </div>
    );
}

export default Messenger;