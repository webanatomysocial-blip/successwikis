import React, { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [userName, setUserName] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);

    const API_URL = '/api/comment.php';

    const fetchComments = async () => {
        if (!postId) return;
        try {
            const response = await fetch(`${API_URL}?post_id=${encodeURIComponent(postId)}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: postId,
                    user_name: userName || 'Anonymous',
                    content: content
                })
            });

            const data = await response.json();
            if (data.error) {
                setMessage({ type: 'error', text: data.error });
            } else {
                setMessage({ type: 'success', text: 'Comment posted!' });
                setUserName('');
                setContent('');
                fetchComments(); // Refresh list
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        }
    };

    return (
        <div className="comment-section-container">
            <h3 className="comment-section-title">Community Comments</h3>
            
            <form className="comment-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Your Name (Optional)" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="comment-input-name"
                />
                <textarea 
                    placeholder="Share your thoughts..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    className="comment-textarea"
                    required
                />
                {message.text && (
                    <p className={`comment-message ${message.type}`}>{message.text}</p>
                )}
                <button type="submit" className="comment-submit-btn">Post Comment</button>
            </form>

            <div className="comments-list">
                {loading ? (
                    <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <div className="comment-header">
                                <span className="comment-user">{comment.user_name}</span>
                                <span className="comment-time">
                                    {/* Simplified date display if date-fns is not available or just use timestamp */}
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
