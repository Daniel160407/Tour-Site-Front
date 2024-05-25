import { useEffect } from "react";
import Feedback from "../feedback/Feedback";
import Home from "../tour/Home";
import Messenger from "./messenger/Messenger";

function Content({searchText}){
    return(
        <div className="tab-content">
            <Home adminMode={true} searchText={searchText}/>
            <Messenger adminMode={true}/>
            <Feedback adminMode={true}/>
        </div>
    );
    
}

export default Content;