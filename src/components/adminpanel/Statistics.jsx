import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/adminpanel/statistics.scss';

const Statistics = () => {
    const [time, setTime] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [users, setUsers] = useState(0);
    const [messages, setMessages] = useState(0);
    const [feedbacks, setFeedbacks] = useState(0);
    const [countryStats, setCountryStats] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:8080/statistics')
                .then(response => {
                    const data = response.data;
                    setTime(data.time);
                    setClicks(data.clicks);
                    setUsers(data.users);
                    setMessages(data.messages);
                    setFeedbacks(data.feedbacks);
                })
                .catch(error => console.error('Error fetching statistics:', error));

            axios.get('http://localhost:8080/statistics/countries')
                .then(response => {
                    const countryData = response.data || [];
                    if (Array.isArray(countryData)) {
                        const countryCount = countryData.reduce((acc, user) => {
                            const country = user.country;
                            acc[country] = (acc[country] || 0) + 1;
                            return acc;
                        }, {});

                        const totalCountries = Object.values(countryCount).reduce((acc, count) => acc + count, 0);

                        const countryStats = Object.keys(countryCount).map(country => ({
                            country,
                            count: countryCount[country],
                            percentage: ((countryCount[country] / totalCountries) * 100).toFixed(2)
                        }));

                        setCountryStats(countryStats);
                    }
                })
                .catch(error => console.error('Error fetching country data:', error));
        };

        fetchData();

        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const clearState = (state) => {
        axios.delete(`http://localhost:8080/statistics?statistic=${state}`)
        .then(response => {
            const data = response.data;
            setTime(data.time);
            setClicks(data.clicks);
            setUsers(data.users);
            setMessages(data.messages);
            setFeedbacks(data.feedbacks);
        })
        .catch(error => console.error('Error clearing statistic:', error));
    }

    const clearCountries = () => {
        axios.delete('http://localhost:8080/statistics/countries');
        setCountryStats([]);
    }

    return (
        <div id='statistics' className='tab-pane tab fade'>
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
                    <h2>Users Registered</h2>
                    <p>{users}</p>
                    <button className='clear-button' onClick={() => clearState('users')}>Clear</button>
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
            <div className='country-stats-container'>
                <h2>Country Statistics</h2>
                {countryStats.map(stat => (
                    <div key={stat.country} className='country-stat-item'>
                        <p>{stat.country}: {stat.percentage}%</p>
                        <div className='progress-bar'>
                            <div className='progress' style={{ width: `${stat.percentage}%` }}></div>
                        </div>
                    </div>
                ))}
                <button className='clear-button' onClick={clearCountries}>Clear</button>
            </div>
        </div>
    );
}

export default Statistics;
