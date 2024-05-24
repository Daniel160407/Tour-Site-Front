import React, {useState} from "react";
import axios from "axios";
import '/src/style/adminpanel/tour/EditTourForm.scss';
import Home from "../../tour/Home.jsx";

function EditTourForm({tour}) {
    const [editedTour, setEditedTour] = useState({...tour});
    const [returnPage, setReturnPage] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedTour(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/tours/adminpanel`, editedTour);
    };

    function deleteTour() {
        axios.delete(`http://localhost:8080/tours/adminpanel?name=${editedTour.name}`);
    }

    return (
        <>
        {!returnPage && (
            <div className="edit-tour-form">
            <img src='/svg/arrow.svg' onClick={() => {
                setReturnPage(true)
            }}></img>
            <h2>Edit Tour</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={editedTour.name} onChange={handleChange} required/>
                <label>Description:</label>
                <textarea name="description" value={editedTour.description} onChange={handleChange} required/>
                <label>Direction:</label>
                <input type="text" name="direction" value={editedTour.direction} onChange={handleChange} required/>
                <label>Duration:</label>
                <input type="text" name="duration" value={editedTour.duration} onChange={handleChange} required/>
                <label>History:</label>
                <textarea name="history" value={editedTour.history} onChange={handleChange} required/>
                <label>Requirements</label>
                <textarea name="requirements" value={editedTour.requirements} onChange={handleChange} required></textarea>
                <label>Price:</label>
                <input type="text" name="price" value={editedTour.price} onChange={handleChange} required/>
                <button type="submit">Save</button>
            </form>
            <button type="btn" onClick={() => deleteTour()}>Delete Tour</button>
        </div>
        )}
        {returnPage && (
            <Home adminMode={true}/>
        )}
        </>
        
    );
}

export default EditTourForm;
