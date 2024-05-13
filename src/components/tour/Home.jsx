// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../style/tour/home.scss';
import Tour from "../Tour";
import EditTourForm from "../adminpanel/tour/EditTourForm";
import AddTour from "../adminpanel/tour/AddTour";

// eslint-disable-next-line react/prop-types
function Home({ adminMode }) {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [showTour, setShowTour] = useState(true);
    const [addTour, setAddTour] = useState(false);
    const [language, setLanguage] = useState('ENG');
    const [randomTour, setRandomTour] = useState(null);

    useEffect(() => {
        if (language) {
            axios.get(`http://localhost:8080/tours/tour?language=${language}`)
                .then(response => {
                    const toursWithImages = response.data.tours.map(tour => {
                        const byteCharacters = atob(tour.imageData);
                        const base64String = btoa(byteCharacters);
                        return { ...tour, imageData: base64String };
                    });
                    setTours(toursWithImages);
                    setRandomTour(Math.floor(Math.random() * toursWithImages.length));
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
                                        <div className="price">
                                            <h3>{language === 'ENG' ? 'From' : 'От'} {tour.price}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {randomTour !== null && (
                        <div className="card">
                            <div className="container-image">
                                <img className="image-circle" src={`data:image/jpeg;base64,${tours[randomTour].imageData}`}></img>
                                <h2>{tours[randomTour].name}</h2>
                            </div>
                            <div className="content">
                                <div className="detail">
                                    <span>{tours[randomTour].name}</span>
                                    <p>{tours[randomTour].price}</p>
                                    <div className="buttons">
                                        <button onClick={() => {openTour(tours[randomTour])}}>Info</button>
                                        <button onClick={() => {setRandomTour(null)}}>Close</button>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <div className="box-image">
                                        <img className="img-product" src={`data:image/jpeg;base64,${tours[randomTour].imageData}`}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
