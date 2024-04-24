import React, { useState } from 'react';
import axios from 'axios';
import '/src/style/adminpanel/addTour.scss';

function AddTour() {
    const [title, setTitle] = useState('');
    const [direction, setDirection] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

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
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    return (
        <div id='Tours' className='tab-pane fade show active'>
            <h1>Add Tour</h1>
            <form onSubmit={saveTour}>
                <input type="text" placeholder="Tour title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Tour direction" value={direction} onChange={(e) => setDirection(e.target.value)} />
                <textarea placeholder="Tour description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type='file' onChange={handleImageChange}></input>
                <input type='submit' value='Save'></input>
            </form>
        </div>
    );
}

export default AddTour;
