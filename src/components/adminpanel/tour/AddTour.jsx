import React, { useState } from 'react';
import axios from 'axios';
import '/src/style/adminpanel/tour/addTour.scss';
import Home from '../../tour/Home.jsx';

function AddTour() {
    const [title, setTitle] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [history, setHistory] = useState('');
    const [requirements, setRequirements] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('ENG');
    const [image, setImage] = useState(null);
    const [addNewTour, setAddNewTour] = useState(true);

    const [descriptionSize, setDescriptionSize] = useState(1000);
    const [historySize, setHistorySize] = useState(1000);
    
    function saveTour(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('direction', direction);
        formData.append('duration', duration);
        formData.append('history', history);
        formData.append('requirements', requirements);
        formData.append('price', price);
        formData.append('language', language);
        formData.append('image', image);

        axios.post('http://localhost:8080/tours/adminpanel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const inputs = document.getElementsByClassName('inputs');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        setAddNewTour(false);
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    return (
        <>
        {!addNewTour && (
            <>
                <Home adminMode={true}/>
            </>
        )}
        {addNewTour && (
            <div id='addTours'>
            <img id='arrow' src='/svg/arrow.svg' onClick={() => {
                setAddNewTour(false)
            }}></img>
            <h1>Add Tour</h1>
            <form onSubmit={saveTour}>
                <input className='inputs' type="text" placeholder="Tour title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className='inputs' type="text" placeholder="Tour direction" value={direction} onChange={(e) => setDirection(e.target.value)} />
                <textarea className='inputs' placeholder="Tour description" value={description} onChange={(e) => {
                    setDescription(e.target.value)
                    if (1000 - e.target.value.length > 0) {
                        setDescriptionSize(1000 - e.target.value.length);
                        document.getElementById('descriptionSize').style.color = 'green';
                    } else {
                        setDescriptionSize('Data is too long!');
                        document.getElementById('descriptionSize').style.color = 'red';
                    }
                    
                }}></textarea>
                <p id='descriptionSize' className='size'>{descriptionSize}</p>
                <input className='inputs' type='text' placeholder='Tour duration' value={duration} onChange={(e) => setDuration(e.target.value)}></input>
                <textarea className='inputs' placeholder='Tour history' value={history} onChange={(e) => {
                    setHistory(e.target.value)
                    if (1000 - e.target.value.length > 0) {
                        setHistorySize(1000 - e.target.value.length);
                        document.getElementById('historySize').style.color = 'green';
                    } else {
                        setHistorySize('Data is too long!');
                        document.getElementById('historySize').style.color = 'red';
                    }
                }}></textarea>
                <p id='historySize' className='size'>{historySize}</p>
                <textarea className='inputs' placeholder='Tour requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)}></textarea>
                <input className='inputs' type='text' placeholder='Tour price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <select id='adminLanguage' onChange={(e) => setLanguage(e.target.value)}>
                    <option>ENG</option>
                    <option>RUS</option>
                </select>
                <input className='inputs' type='file' onChange={handleImageChange}></input>
                <input type='submit' value='Save'></input>
            </form>
        </div>
        )}
        </>
        
    );
}

export default AddTour;
