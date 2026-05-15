import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/admin.css';

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    const tabs = [
        { id: 'all', label: 'All Posts' },
        { id: 'blog', label: 'Blogs' },
        { id: 'event', label: 'Events' },
        { id: 'success_lens', label: 'Success Lens' },
        { id: 'driven_by_purpose', label: 'Driven By Purpose' },
        { id: 'founders_unfiltered', label: 'Founders Unfiltered' },
        { id: 'stage_behind_story', label: 'Stage Behind Story' },
    ];

    useEffect(() => {
        if (!token) {
            navigate('/admin');
        }
    }, [token, navigate]);

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

    const filteredPosts = activeTab === 'all' 
        ? posts 
        : posts.filter(post => post.post_type === activeTab);

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-header-actions">
                    <Link to="/admin/editor" className="admin-btn admin-btn-primary">+ Create New Post</Link>
                    <button onClick={handleLogout} className="admin-btn admin-btn-danger">Logout</button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="admin-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            {loading ? <p>Loading posts...</p> : (
                <div className="admin-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                {activeTab === 'all' && <th>Type</th>}
                                <th style={{ textAlign: 'center' }}>Likes</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(post => (
                                <tr key={post.id}>
                                    <td>
                                        {post.image_url ? (
                                            <img src={post.image_url} alt="Preview" className="admin-img-preview" />
                                        ) : (
                                            <div className="admin-img-placeholder">No Img</div>
                                        )}
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{post.title}</td>
                                    {activeTab === 'all' && (
                                        <td>
                                            <span style={{ fontSize: '12px', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', textTransform: 'capitalize' }}>
                                                {post.post_type.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                    )}
                                    <td className="admin-likes-count">
                                        {post.likes_count || 0}
                                    </td>
                                    <td>
                                        <span className={`admin-status-badge ${parseInt(post.is_published) === 1 ? 'admin-status-live' : 'admin-status-draft'}`}>
                                            {parseInt(post.is_published) === 1 ? '• LIVE' : '• DRAFT'}
                                        </span>
                                    </td>
                                    <td style={{ color: '#666', fontSize: '13px' }}>
                                        {new Date(post.published_date).toLocaleDateString()}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <Link to={`/admin/editor/${post.id}`} className="admin-btn-link" style={{ marginRight: '15px' }}>Edit</Link>
                                        <button onClick={() => handleDelete(post.id)} className="admin-btn-link admin-btn-link-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredPosts.length === 0 && (
                                <tr>
                                    <td colSpan={activeTab === 'all' ? "7" : "6"} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                        No posts found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
