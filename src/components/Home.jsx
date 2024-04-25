import React, {useEffect, useState} from "react";
import axios from "axios";
import '../style/home.scss';
import Tour from "./Tour";

function Home() {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/tour')
            .then(response => {
                const toursWithImages = response.data.tours.map(tour => {
                    const byteCharacters = atob(tour.imageData);
                    const base64String = btoa(byteCharacters);
                    return {...tour, imageData: base64String};
                });
                setTours(toursWithImages);
            });
    }, []);

    function openTour(tour) {
        setSelectedTour(tour);
        setTours([]);
        setShowTour(true);
    }

    return (
        <>  
            {!showTour && (
                <div id='home' className='tab-pane tab fade show active'>
                <div id="tours">
                    {tours && (
                        <div id="toursList">
                            {tours.map(tour => (
                                <div key={tour.name} className="tour" onClick={() => openTour(tour)}>
                                    <div className="header">
                                        <div>
                                            <img src={`data:image/jpeg;base64,${tour.imageData}`} alt={tour.name}></img>
                                        </div>
                                        <div className="titleBox">
                                            <h1 className="title">{tour.name}</h1>
                                        </div>
                                    </div>
                                    <div className="direction">
                                        <h5>{tour.direction}</h5>
                                    </div>
                                    <div className="description">
                                        <p>{tour.description}</p>
                                    </div>
                                    <div>
                                        <h3>From: {tour.price}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            )}
            {selectedTour && (
                <Tour tour={selectedTour}/>
            )}
        </>

    );
}

export default Home;
