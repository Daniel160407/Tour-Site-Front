import ContactsList from "./ContactsList";

function Messenger(){
    return(
        <div id='contact' className='tab-pane tab fade'>
            <ContactsList/>
        </div>
    );
}

export default Messenger;