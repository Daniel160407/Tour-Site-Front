import {useState} from 'react';
import '../style/tour.scss';
import Home from './tour/Home';

// eslint-disable-next-line react/prop-types
function Tour({tour, exit}) {
    const [showTour, setShowTour] = useState(true);

    return (
        <>
            {showTour && (
                <div id='tour'>
                    <img src='/svg/arrow.svg' alt={'Go back'} onClick={() => {
                        setShowTour(false);
                        exit();
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
                    <div id='duration'>
                        <h2>Duration</h2>
                        <p>{tour.duration}</p>
                    </div>
                    <div id="history">
                        <h2>History</h2>
                        <p>{tour.history}</p>
                    </div>
                    <div id='requirements'>
                        <h2>Requirements</h2>
                        <p>{tour.requirements}</p>
                    </div>
                    <div id="price">
                        <h2>Prices</h2>
                        <h3>{tour.price}</h3>
                    </div>
                </div>
            )}
        </>

    );
}

export default Tour;