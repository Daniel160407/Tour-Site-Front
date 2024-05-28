import React, {useState} from "react";
import axios from "axios";
import '/src/style/adminpanel/tour/EditTourForm.scss';

// eslint-disable-next-line react/prop-types
function EditTourForm({tour, exit}) {
    const [editedTour, setEditedTour] = useState({...tour});

    const [descriptionSize, setDescriptionSize] = useState(1000);
    const [historySize, setHistorySize] = useState(1000);

    const handleChange = (target) => {
        const {name, value} = target;
        setEditedTour(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/tours/adminpanel`, editedTour)
        .then(() => exit());
    };

    function deleteTour() {
        axios.delete(`http://localhost:8080/tours/adminpanel?name=${editedTour.name}`)
        .then(() => exit());
    }

    return (
        <>
            <div className="edit-tour-form">
            <img src='/svg/arrow.svg' onClick={() => {
                exit();
            }}></img>
            <h2>Edit Tour</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={editedTour.name} onChange={(e) => handleChange(e.target)} required/>
                <label>Description:</label>
                <textarea name="description" value={editedTour.description} onChange={(e) => {
                    handleChange(e.target);
                    if (1000 - e.target.value.length >= 0) {
                        setDescriptionSize(1000 - e.target.value.length);
                        document.getElementById('descriptionSize').style.color = 'green';
                    } else {
                        setDescriptionSize('Data is too long!');
                        document.getElementById('descriptionSize').style.color = 'red';
                    }
                }} required/>
                <p id="descriptionSize" className="size">{descriptionSize}</p>
                <label>Direction:</label>
                <input type="text" name="direction" value={editedTour.direction} onChange={(e) => handleChange(e.target)} required/>
                <label>Duration:</label>
                <input type="text" name="duration" value={editedTour.duration} onChange={(e) => handleChange(e.target)} required/>
                <label>History:</label>
                <textarea name="history" value={editedTour.history} onChange={(e) => {
                    handleChange(e.target);
                    if (1000 - e.target.value.length >= 0) {
                        setHistorySize(1000 - e.target.value.length);
                        document.getElementById('historySize').style.color = 'green';
                    } else {
                        setHistorySize('Data is too long!');
                        document.getElementById('historySize').style.color = 'red';
                    }
                }} required/>
                <p id="historySize" className="size">{historySize}</p>
                <label>Requirements:</label>
                <textarea name="requirements" value={editedTour.requirements} onChange={(e) => handleChange(e.target)} required></textarea>
                <label>Price:</label>
                <input type="text" name="price" value={editedTour.price} onChange={(e) => handleChange(e.target)} required/>
                <button type="submit">Save</button>
            </form>
            <button type="btn" onClick={() => deleteTour()}>Delete Tour</button>
        </div>
        </>
        
    );
}

export default EditTourForm;
