import React from "react";

function Description({place}){
    return(
        <div id="description">
            <h1> {place.name} </h1>
            <div>
                <h3>Attractions</h3>
                <p>
                    //TODO:  Add list of attractions 
                </p>
                <img src={`/images/${place.toLowerCase()}/img1.jpeg`} alt={`${place}`}></img>
            </div>
            <div>
                <h3>Prices</h3>
                <p>
                    //TODO: Add price information
                </p>
            </div>
        </div>
    );
}

export default Description;