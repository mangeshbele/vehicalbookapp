// Form.js
import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = () => {
        if (formData.firstName && formData.lastName) {
            alert('Proceeding to the next step');
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div className="form-container">
            <h1>First, what’s your name?</h1>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </div>
            <button className="next-button" onClick={handleNext}>Next</button>
        </div>
    );
};

export default Form;
