import Home from "../Home";

function Content(){
    return(
        <div className="tab-content">
            <Home adminMode={true}/>
        </div>
    );
    
}

export default Content;