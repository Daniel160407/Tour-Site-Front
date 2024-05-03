import ChatEndPoint from "./ChatEndpoint";
import '../../style/adminpanel/messenger/messenger.scss';

function Messenger(){
    return(
        <div id='contact' className='tab-pane tab fade'>
            <ChatEndPoint/>
        </div>
    );
}

export default Messenger;