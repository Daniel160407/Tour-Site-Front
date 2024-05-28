import Feedback from "../feedback/Feedback";
import Home from "../tour/Home";
import Messenger from "./messenger/Messenger";
import Statistics from "./Statistics";

function Content({searchText}){
    return(
        <div className="tab-content">
            <Home adminMode={true} searchText={searchText}/>
            <Messenger adminMode={true}/>
            <Feedback adminMode={true}/>
            <Statistics/>
        </div>
    );
    
}

export default Content;