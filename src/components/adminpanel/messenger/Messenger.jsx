import { useEffect, useState } from "react";
import ContactsList from "./ContactsList";
import Chat from "./Chat";
import '/src/style/adminpanel/messenger/messenger.scss';

function Messenger({adminMode}){
    const [contact, setContact] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(()=>{
        if(adminMode){
            setDisplay('flex');
        }
    },[])
    

    return(
        <div id='contact' className='tab-pane tab fade' style={{display: display}}>
            <ContactsList setContact={setContact}/>
            <Chat contact={contact}/>
        </div>
    );
}

export default Messenger;