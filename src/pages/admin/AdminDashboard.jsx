import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    if (!token) {
        navigate('/admin');
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const fetchPosts = async () => {
        try {
            const apiBaseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
            const res = await fetch(`${apiBaseURL}/api/posts.php?include_drafts=true`);
            const data = await res.json();
            if (data.status === 'success') {
                setPosts(data.data);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            const apiBaseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');
            const res = await fetch(`${apiBaseURL}/api/posts.php?id=${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.status === 'success') {
                fetchPosts();
            } else {
                alert(data.message || 'Failed to delete');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard</h1>
                <div>
                    <Link to="/admin/editor" style={{ padding: '10px 20px', background: '#007BFF', color: '#fff', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>Create New Post</Link>
                    <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
            
            {loading ? <p>Loading posts...</p> : (
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Type</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{post.title}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textTransform: 'capitalize' }}>{post.post_type.replace(/_/g, ' ')}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px', 
                                        fontWeight: 'bold',
                                        background: parseInt(post.is_published) === 1 ? '#e6fffa' : '#fff5f5',
                                        color: parseInt(post.is_published) === 1 ? '#2c7a7b' : '#c53030',
                                        border: `1px solid ${parseInt(post.is_published) === 1 ? '#81e6d9' : '#feb2b2'}`
                                    }}>
                                        {parseInt(post.is_published) === 1 ? 'LIVE' : 'DRAFT'}
                                    </span>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{post.published_date}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <Link to={`/admin/editor/${post.id}`} style={{ marginRight: '10px', color: 'blue' }}>Edit</Link>
                                    <button onClick={() => handleDelete(post.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>No posts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
