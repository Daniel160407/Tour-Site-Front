import axios from "axios";
import {useEffect, useState} from "react";
import '../style/home.scss';

function Home() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/tour')
            .then(response => {
                setTours(response.data.tours);
                console.log(response.data);
            });
    }, []);

    return (
        <div id='home' className='tab-pane fade show active'>
            <div id="tours">
                {tours && (
                <div>
                    {tours.map(tour => (
                        <div key={tour.name} className="tour">
                            <div className="header">
                                <div>
                                    <img src={tour.imgUrl}></img>
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
            )};
            </div>
        </div>
    );
}

export default Home;