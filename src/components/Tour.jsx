import {useState} from 'react';
import '../style/tour.scss';

// eslint-disable-next-line react/prop-types
function Tour({tour, language, exit}) {
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
                        <h2>{language === 'ENG' ? 'Direction' : 'Направление'}</h2>
                        <h3>{tour.direction}</h3>
                    </div>
                    <div id="description">
                        <h2>{language === 'ENG' ? 'Description' : 'Описание'}</h2>
                        <p>{tour.description}</p>
                    </div>
                    <div id='duration'>
                        <h2>{language === 'ENG' ? 'Duration' : 'Продолжытельность'}</h2>
                        <p>{tour.duration}</p>
                    </div>
                    <div id="history">
                        <h2>{language === 'ENG' ? 'History' : 'История'}</h2>
                        <p>{tour.history}</p>
                    </div>
                    <div id='requirements'>
                        <h2>{language === 'ENG' ? 'Requirements' : 'Требования'}</h2>
                        <p>{tour.requirements}</p>
                    </div>
                    <div id="price">
                        <h2>{language === 'ENG' ? 'Prices' : 'Цены'}</h2>
                        <h3>{tour.price}</h3>
                    </div>
                </div>
            )}
        </>

    );
}

export default Tour;