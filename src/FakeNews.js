import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

const FakeNews = () => {
    const [content, setContent] = useState('');
    const [prediction, setPrediction] = useState('');

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/fake_news_prediction', {
                content: content
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting:', error);
        }
    };

    return (
        <div className="fake-news-container">
            <h1>Fake News Prediction</h1>
            <div className="textarea-container">
                <label htmlFor="content">Content:</label>
                <textarea id="content" value={content} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Predict</button>
            {prediction && (
                <div className="prediction-container">
                    <h2>Prediction:</h2>
                    <h3>
                        <span
                            className={((100 - prediction * 100) > 50) ? "green-icon" : "orange-icon"}
                        >
                            {`${(100 - prediction * 100).toFixed(2)}%`}
                        </span>
                    </h3>
                </div>
            )}

        </div>
    );
};

export default FakeNews;
