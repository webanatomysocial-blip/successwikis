import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/admin.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const apiBaseURL = import.meta.env.VITE_API_URL ?? ''; // Adjust as needed based on local dev
            const res = await fetch(`${apiBaseURL}/api/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.status === 'success') {
                localStorage.setItem('admin_token', data.csrf_token); // store token if needed, or rely on cookies
                localStorage.setItem('admin_role', data.role);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
    };

    return (
        <div className="admin-page admin-login-page">
            <h1>Admin Login</h1>
            {error && <p className="admin-error-msg">{error}</p>}
            <form onSubmit={handleLogin} className="admin-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                    className="admin-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="admin-input"
                />
                <button type="submit" className="admin-btn admin-btn-secondary">
                    Login
                </button>
            </form>
        </div>
    );
}
