// components/Place.jsx
import React, { useState } from "react";
import Description from "./PlaceDescription";
import root from "../root";

function Place({ place }) {
  const [showDescription, setShowDescription] = useState(false);

  async function loadPageOf() {
    root.render(
      <React.StrictMode>
        <Description place={place} />
      </React.StrictMode>
    );
    setShowDescription(true);
  }

  return (
    <div className="col" onClick={loadPageOf}>
      <div className="card">
        <img
          className="card-img"
          src={`/images/${place.toLowerCase()}/img1.jpeg`}
          alt={place}
        />
        <div className="card-body">
          <div className="card-title">
            <h1>{place}</h1>
          </div>
        </div>
      </div>
      {showDescription && (
        <div>
          <React.StrictMode>
            <Description place={place} />
          </React.StrictMode>
        </div>
      )}
    </div>
  );
}

export default Place;
