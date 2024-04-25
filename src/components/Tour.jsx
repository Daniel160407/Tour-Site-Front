import {useState} from 'react';
import '../style/tour.scss';
import Home from './Home';

function Tour({tour}) {
    const [returnPage, setReturnPage] = useState(null);
    const [showTour, setShowTour] = useState(true);

    return (
        <>
            {showTour && (
                <div id='tour'>
                    <img src='/svg/arrow.svg' onClick={() => {
                        setReturnPage('return')
                        setShowTour(false);
                    }}></img>
                    <div id='name'>
                        <h1>{tour.name}</h1>
                    </div>
                    <div id='direction'>
                        <h2>Directions</h2>
                        <h3>{tour.direction}</h3>
                    </div>
                    <div id="description">
                        <h2>Description</h2>
                        <p>{tour.description}</p>
                    </div>
                    <div id="history">
                        <h2>History</h2>
                        <p>{tour.history}</p>
                    </div>
                    <div id="price">
                        <h2>Prices</h2>
                        <h3>{tour.price}</h3>
                    </div>
                </div>
            )}

            {returnPage && (
                <Home/>
            )}
        </>

    );
}

export default Tour;