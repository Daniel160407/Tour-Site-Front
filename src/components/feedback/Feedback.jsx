import axios from "axios";
import {useEffect, useState} from "react";
import '../../style/feedback/feedback.scss';

function Feedback({adminMode}) {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tours/feedback')
            .then(response => {
                const data = response.data;
                setFeedbacks([]);
                for (let i = 0; i < data.length; i++) {
                    setFeedbacks(feedbacks => [...feedbacks, data[i]]);
                }
            });
    }, []);

    const addFeedback = () => {
        const feedback = {
            name: document.getElementById('commentator').value,
            time: new Date().toLocaleDateString(),
            comment: document.getElementById('comment').value
        }

        document.getElementById('commentator').value = '';
        document.getElementById('comment').value = '';
        
        axios.post('http://localhost:8080/tours/feedback', feedback)
        .then(response => {
            const data = response.data;
            setFeedbacks([]);
            for(let i=0; i<data.length; i++){
                setFeedbacks(feedbacks => [...feedbacks, data[i]]);
            }
        });
    }

    const deleteFeedback = (comment) => {
        axios.delete(`http://localhost:8080/tours/feedback?comment=${comment}`)
        .then(response => {
            const data = response.data;
            setFeedbacks([]);
            for(let i=0; i<data.length; i++){
                setFeedbacks(feedbacks => [...feedbacks, data[i]]);
            }
        });
    }

    return (
        <div id='feedbacks' className='tab-pane tab fade'>
            {feedbacks.map((feedback, index) => (
                <div className='feedback' key={index}>
                {adminMode && (
                    <div className="trash-container">
                        <img className="trash" src="svg/trash.svg" onClick={() => deleteFeedback(feedback.comment)}></img>
                    </div>
                )}
                    <p className='name'>{feedback.name}</p>
                    <p className='time'>{feedback.time}</p>
                    <p className='comment'>{feedback.comment}</p>
                </div>
            ))}
            <div className='newFeedback'>
                <input id="commentator" type="text" placeholder="Name"></input>
                <textarea id="comment" className='newFeedbackText' placeholder='Write your feedback'></textarea>
                <button className="animated-button" onClick={() => {
                    addFeedback()
                }}>
                    <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                    <span className="text">Comment</span>
                    <span className="circle"></span>
                    <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Feedback;