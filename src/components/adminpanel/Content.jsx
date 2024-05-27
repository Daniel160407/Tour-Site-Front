import Feedback from "../feedback/Feedback";
import Home from "../tour/Home";
import Messenger from "./messenger/Messenger";
import States from "./States";

function Content({searchText}){
    return(
        <div className="tab-content">
            <Home adminMode={true} searchText={searchText}/>
            <Messenger adminMode={true}/>
            <Feedback adminMode={true}/>
            <States/>
        </div>
    );
    
}

export default Content;