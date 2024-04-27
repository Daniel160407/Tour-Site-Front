import React, { useState } from 'react';
import axios from 'axios';
import '/src/style/adminpanel/addTour.scss';
import Home from '../Home';

function AddTour() {
    const [title, setTitle] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [history, setHistory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [addNewTour, setAddNewTour] = useState(true);
    
    function saveTour(event) {
        event.preventDefault();

        if (!image) {
            console.error('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('direction', direction);
        formData.append('history', history);
        formData.append('price', price);
        formData.append('image', image);

        axios.post('http://localhost:8080/tours/adminpanel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Tour saved successfully:', response.data);
        })
        .catch(error => {
            console.error('Error saving tour:', error);
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
            <div id='tours'>
            <img id='arrow' src='/svg/arrow.svg' onClick={() => {
                setAddNewTour(false)
            }}></img>
            <h1>Add Tour</h1>
            <form onSubmit={saveTour}>
                <input className='inputs' type="text" placeholder="Tour title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className='inputs' type="text" placeholder="Tour direction" value={direction} onChange={(e) => setDirection(e.target.value)} />
                <textarea className='inputs' placeholder="Tour description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <textarea className='inputs' placeholder='Tour history' value={history} onChange={(e) => setHistory(e.target.value)}></textarea>
                <input className='inputs' type='text' placeholder='Tour prices' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <input className='inputs' type='file' onChange={handleImageChange}></input>
                <input type='submit' value='Save'></input>
            </form>
        </div>
        )}
        </>
        
    );
}

export default AddTour;
