import Feedback from "../feedback/Feedback";
import Home from "../tour/Home";
import Messenger from "./messenger/Messenger";

function Content(){
    return(
        <div className="tab-content">
            <Home adminMode={true}/>
            <Messenger adminMode={true}/>
            <Feedback adminMode={true}/>
        </div>
    );
    
}

export default Content;