import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/adminpanel/states.scss';

const States = () => {
    const [time, setTime] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [messages, setMessages] = useState(0);
    const [feedbacks, setFeedbacks] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:8080/states')
                .then(response => {
                    const data = response.data;
                    setTime(data.time);
                    setClicks(data.clicks);
                    setMessages(data.messages);
                    setFeedbacks(data.feedbacks);
                });
        };

        fetchData();

        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const clearState = (state) => {
        axios.delete(`http://localhost:8080/states?state=${state}`)
        .then(response => {
            const data = response.data;
            setTime(data.time);
            setClicks(data.clicks);
            setMessages(data.messages);
            setFeedbacks(data.feedbacks);
        });
    }

    return (
        <div id='states' className='tab-pane tab fade'>
            <div className='states-container'>
                <div className='state-item'>
                    <h2>Time Spent</h2>
                    <p>{time} minutes</p>
                    <button className='clear-button' onClick={() => clearState('time')}>Clear</button>
                </div>
                <div className='state-item'>
                    <h2>Clicks</h2>
                    <p>{clicks}</p>
                    <button className='clear-button' onClick={() => clearState('clicks')}>Clear</button>
                </div>
                <div className='state-item'>
                    <h2>Messages</h2>
                    <p>{messages}</p>
                    <button className='clear-button' onClick={() => clearState('messages')}>Clear</button>
                </div>
                <div className='state-item'>
                    <h2>Feedbacks</h2>
                    <p>{feedbacks}</p>
                    <button className='clear-button' onClick={() => clearState('feedbacks')}>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default States;
