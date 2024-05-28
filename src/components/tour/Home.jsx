import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import '../../style/tour/home.scss';
import Tour from "../Tour";
import EditTourForm from "../adminpanel/tour/EditTourForm";
import AddTour from "../adminpanel/tour/AddTour";

// eslint-disable-next-line react/prop-types
function Home({adminMode, searchText}) {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [showTour, setShowTour] = useState(true);
    const [addTour, setAddTour] = useState(false);
    const [language, setLanguage] = useState('ENG');
    const [randomTour, setRandomTour] = useState(null);
    const [isPhone, setIsPhone] = useState(false);
    const startTime = useRef(Date.now());
    const clicks = useRef(0);

    useEffect(() => {
        if (!adminMode) {
            axios.get('https://ipinfo.io/json?token=d2261c6bcf22ce')
                .then(response => {                    
                    const userCountry = {
                        ip: response.data.ip,
                        country: response.data.country
                    }

                    axios.post(`http://localhost:8080/states`, userCountry);
                });
                
            const handleBeforeUnload = () => {
                const endTime = Date.now();
                const duration = ((endTime - startTime.current) / 1000 / 60).toFixed(2);
                axios.put(`http://localhost:8080/states?time=${duration}&clicks=${clicks.current}`);
            };

            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, []);

    useEffect(() => {
        if (language && showTour) {
            axios.get(`http://localhost:8080/tours/tour?language=${language}`)
                .then(response => {
                    const toursWithImages = response.data.tours.map(tour => ({
                        ...tour,
                        imageData: tour.imageData
                    }));
                    setTours(toursWithImages);
                    if (toursWithImages.length !== 0) {
                        setRandomTour(Math.floor(Math.random() * toursWithImages.length));
                    }
                });
        }
    }, [language, showTour]);

    useEffect(() => {
        if (searchText !== undefined) {
            axios.get(`http://localhost:8080/tours/tour/search?prefix=${searchText}`)
                .then(response => {
                    if (response !== undefined) {
                        const toursWithImages = response.data.tours.map(tour => ({
                            ...tour,
                            imageData: tour.imageData
                        }));
                        setTours(toursWithImages);
                        if (toursWithImages.length !== 0) {
                            setRandomTour(Math.floor(Math.random() * toursWithImages.length));
                        }
                    }
                });
        }
    }, [searchText]);

    function openTour(tour) {
        clicks.current++;
        setSelectedTour(tour);
        setShowTour(false);
    }

    function exitTour() {
        setSelectedTour(null);
        setShowTour(true);
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
        setIsPhone(/iPhone|iPad|iPod|Android|Windows Phone/i.test(navigator.userAgent));
        return () => {
            selectElement.removeEventListener('change', handleLanguageChange);
        };
    }, []);

    return (
        <>
            {showTour && (
                <div id='home' className='tab-pane tab fade show active'>
                    {adminMode && (
                        <button id="add" type="btn" onClick={addNewTour}>Add Tour</button>
                    )}
                    <div id="tours">
                        {tours.length > 0 && (
                            <div id="toursList">
                                {tours.map(tour => (
                                    <div key={tour.name} className="tour" onClick={() => openTour(tour)}>
                                        <div className="header">
                                            <div>
                                                <img src={`data:image/jpeg;base64,${tour.imageData}`} alt={tour.name}/>
                                            </div>
                                            <div className="titleBox">
                                                <h1 className="title">{tour.name}</h1>
                                            </div>
                                        </div>
                                        <div className="direction">
                                            <h5>{tour.direction}</h5>
                                        </div>
                                        <div className="duration">
                                            <p>{tour.duration}</p>
                                        </div>
                                        <div className="price">
                                            <h3>{language === 'ENG' ? 'From' : 'От'} {tour.price}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {randomTour !== null && !isPhone && tours.length !== 0 && (
                        <div className="card">
                            <div className="container-image">
                                <img className="image-circle"
                                     src={`data:image/jpeg;base64,${tours[randomTour].imageData}`}
                                     alt={tours[randomTour].name}/>
                                <h2>{tours[randomTour].name}</h2>
                            </div>
                            <div className="content">
                                <div className="detail">
                                    <span>{tours[randomTour].name}</span>
                                    <p>{tours[randomTour].price}</p>
                                    <div className="buttons">
                                        <button onClick={() => openTour(tours[randomTour])}>Info</button>
                                        <button onClick={() => setRandomTour(null)}>Close</button>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <div className="box-image">
                                        <img className="img-product"
                                             src={`data:image/jpeg;base64,${tours[randomTour].imageData}`}
                                             alt={tours[randomTour].name}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {addTour && (
                <AddTour/>
            )}
            {selectedTour && !adminMode && (
                <Tour tour={selectedTour} language={language} exit={exitTour}/>
            )}
            {selectedTour && adminMode && (
                <EditTourForm tour={selectedTour} exit={exitTour}/>
            )}
        </>
    );
}

export default Home;
