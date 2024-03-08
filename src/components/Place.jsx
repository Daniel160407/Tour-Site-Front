import React from "react";

function Place({ place }) {
  return (
      <div className="col">
        <div className="card">
          <img className="card-img" src={`./public/images/${place.toLowerCase()}/img1.jpeg`} alt={place} />
          <div className="card-body">
            <div className="card-title">
              <h1>{place}</h1>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Place;
