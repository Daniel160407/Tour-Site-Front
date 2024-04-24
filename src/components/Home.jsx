import axios from "axios";
import { useEffect, useState } from "react";
import '../style/home.scss';

function Home() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/tour')
            .then(response => {
                const toursWithImages = response.data.tours.map(tour => {
                    const byteCharacters = atob(tour.imageData);
                    const base64String = btoa(byteCharacters);
                    return { ...tour, imageData: base64String };
                });
                setTours(toursWithImages);
            });
    }, []);

    return (
        <div id='home' className='tab-pane tab fade show active'>
            <div id="tours">
                {tours && (
                    <div id="toursList">
                        {tours.map(tour => (
                            <div key={tour.name} className="tour">
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
