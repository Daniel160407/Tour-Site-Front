import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../style/tour/home.scss';
import Tour from "../Tour";
import EditTourForm from "../adminpanel/tour/EditTourForm";
import AddTour from "../adminpanel/tour/AddTour";

function Home({adminMode}) {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [showTour, setShowTour] = useState(true);
    const [addTour, setAddTour] = useState(false);
    const [language, setLanguage] = useState('ENG');

    useEffect(() => {
        if (language) {
            axios.get(`http://localhost:8080/tours/tour?language=${language}`)
                .then(response => {
                    const toursWithImages = response.data.tours.map(tour => {
                        const byteCharacters = atob(tour.imageData);
                        const base64String = btoa(byteCharacters);
                        return {...tour, imageData: base64String};
                    });
                    setTours(toursWithImages);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [language]);

    function openTour(tour) {
        setSelectedTour(tour);
        setTours([]);
        setShowTour(false);
    }

    function addNewTour() {
        setAddTour(true);
        setShowTour(false);
    }

    useEffect(() => {
        const selectElement = document.getElementById('language');
        const handleLanguageChange = () => {
            setLanguage(selectElement.value);
        };
        selectElement.addEventListener('change', handleLanguageChange);
        return () => {
            selectElement.removeEventListener('change', handleLanguageChange);
        };
    }, []);

    return (
        <>
            {showTour && (
                <div id='home' className='tab-pane tab fade show active'>
                    {showTour && adminMode && (
                        <button id="add" type="btn" onClick={addNewTour}>Add Tour</button>
                    )}
                    <div id="tours">
                        {tours && (
                            <div id="toursList">
                                {tours.map(tour => (
                                    <div key={tour.name} className="tour" onClick={() => openTour(tour)}>
                                        <div className="header">
                                            <div>
                                                <img src={`data:image/jpeg;base64,${tour.imageData}`}
                                                     alt={tour.name}></img>
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
                                        <div className="price">
                                            <h3>From: {tour.price}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!showTour && addTour && (
                <AddTour/>
            )}
            {selectedTour && !adminMode && (
                <Tour tour={selectedTour}/>
            )}
            {selectedTour && adminMode && (
                <EditTourForm tour={selectedTour}/>
            )}
        </>
    );
}

export default Home;