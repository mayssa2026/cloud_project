import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
