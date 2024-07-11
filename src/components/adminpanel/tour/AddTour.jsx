import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '/src/style/adminpanel/tour/addTour.scss';

function AddTour({exit}) {
    const [title, setTitle] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [history, setHistory] = useState('');
    const [requirements, setRequirements] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('ENG');
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

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
        console.log(formData.get('image'))

        axios.post('http://localhost:8080/tours/adminpanel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
            }
        })
            .then(() => {
                const inputs = document.getElementsByClassName('inputs');
                for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }

            exit(true);
        })       
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    const handleAddImagesChange = (e) => {
        setImages(e.target.files);
    }

    const onAddImagesClick = () => {
        const formData = new FormData();
        for(let i = 0; i < images.length; i++){
            formData.append('images', images[i]);
        }

        console.log(formData.get('images'));
        axios.post('http://localhost:8080/tours/adminpanel/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${Cookies.get('token') ? Cookies.get('token') : null}`
            }
        })
        .then(response => {
            console.log(response.status);
        })
    }

    return (
        <>
            <div id='addTours'>
            <img id='arrow' src='/svg/arrow.svg' onClick={() => {
                exit(true)
            }}></img>
            <h1>Add Tour</h1>
            <form onSubmit={saveTour}>
                <input className='inputs' type="text" placeholder="Tour title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <input className='inputs' type="text" placeholder="Tour direction" value={direction} onChange={(e) => setDirection(e.target.value)} required/>
                <textarea className='inputs' placeholder="Tour description" value={description} onChange={(e) => {
                    setDescription(e.target.value);
                    if (1000 - e.target.value.length >= 0) {
                        setDescriptionSize(1000 - e.target.value.length);
                        document.getElementById('descriptionSize').style.color = 'green';
                    } else {
                        setDescriptionSize('Data is too long!');
                        document.getElementById('descriptionSize').style.color = 'red';
                    }
                    
                }} required></textarea>
                <p id='descriptionSize' className='size'>{descriptionSize}</p>
                <input className='inputs' type='text' placeholder='Tour duration' value={duration} onChange={(e) => setDuration(e.target.value)} required></input>
                <textarea className='inputs' placeholder='Tour history' value={history} onChange={(e) => {
                    setHistory(e.target.value)
                    if (1000 - e.target.value.length >= 0) {    
                        setHistorySize(1000 - e.target.value.length);
                        document.getElementById('historySize').style.color = 'green';
                    } else {
                        setHistorySize('Data is too long!');
                        document.getElementById('historySize').style.color = 'red';
                    }
                }} required></textarea>
                <p id='historySize' className='size'>{historySize}</p>
                <textarea className='inputs' placeholder='Tour requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)} required></textarea>
                <input className='inputs' type='text' placeholder='Tour price' value={price} onChange={(e) => setPrice(e.target.value)} required></input>
                <select id='adminLanguage' onChange={(e) => setLanguage(e.target.value)}>
                    <option>ENG</option>
                    <option>RUS</option>
                </select>
                <input className='inputs' type='file' onChange={handleImageChange} required></input>
                <input className='inputs' type="file" id="imagesInput" name="files[]" onChange={handleAddImagesChange} multiple></input>
                <button id='addImagesButton' onClick={onAddImagesClick}>Add Images</button>
                <input type='submit' value='Save'></input>
            </form>
        </div>
        </>
        
    );
}

export default AddTour;
