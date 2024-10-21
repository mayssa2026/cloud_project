import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        profileImage: null,
    });

    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormData({ ...formData, profileImage: reader.result.split(',')[1] });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://skdy6z7843.execute-api.us-east-1.amazonaws.com/dev/actions', {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                profileImage: formData.profileImage, // Base64-encoded string
            });
            console.log(response.data);
            navigate('/login');  // Redirect to login page on success
        } catch (error) {
            console.error('Sign Up Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input type="file" name="profileImage" onChange={handleFileChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
