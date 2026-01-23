import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const LikeButton = ({ postId }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false); // Start as false to show UI immediately

    const API_URL = '/api/like.php';

    useEffect(() => {
        if (!postId) return;
        const fetchLikes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}?post_id=${postId}`);
                if (response.ok) {
                    const data = await response.json();
                    setLikes(data.total_likes);
                    setIsLiked(data.user_liked);
                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        if (loading) return;
        
        // --- Optimistic Update ---
        const prevLiked = isLiked;
        const prevLikes = likes;
        
        setIsLiked(!prevLiked);
        setLikes(prevLiked ? prevLikes - 1 : prevLikes + 1);

        try {
            const formData = new URLSearchParams();
            formData.append('post_id', postId);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
            
            if (response.ok) {
                const data = await response.json();
                // Update with actual server data to be safe
                setLikes(data.total_likes);
                setIsLiked(data.user_liked);
            } else {
                throw new Error("Failed to sync like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on error
            setIsLiked(prevLiked);
            setLikes(prevLikes);
        }
    };

    return (
        <button 
            className={`like-button-modern ${isLiked ? 'liked' : ''}`} 
            onClick={handleLike}
            disabled={loading}
            title={isLiked ? "Unlike" : "Like"}
        >
            {isLiked ? <AiFillHeart size={24} color="#ff3b30" /> : <AiOutlineHeart size={24} />}
            <span className="like-count">{likes}</span>
        </button>
    );
};

export default LikeButton;
