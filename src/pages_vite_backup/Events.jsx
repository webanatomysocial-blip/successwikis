import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventMetadata } from '../events/metadata';
import '../css/events.css';
import { Helmet } from 'react-helmet-async';

const Events = () => {
    const [dynamicEvents, setDynamicEvents] = useState([]);

    useEffect(() => {
        const fetchDynamicEvents = async () => {
            try {
                const apiBaseURL = import.meta.env.VITE_API_URL ?? '';
                const res = await fetch(`${apiBaseURL}/api/posts.php?type=event`);
                const data = await res.json();
                if (data.status === 'success') {
                    const mapped = data.data.map(dbPost => ({
                        id: `dynamic-${dbPost.id}`,
                        title: dbPost.title,
                        slug: dbPost.slug,
                        poster: dbPost.image_url || 'https://via.placeholder.com/400x500?text=Event',
                        date: dbPost.published_date,
                        isDynamic: true
                    }));
                    setDynamicEvents(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch dynamic events", err);
            }
        };
        fetchDynamicEvents();
    }, []);

    // Merge new first
    const sortedEvents = [...dynamicEvents, ...eventMetadata];

    return (
        <div className="events-page">
            <Helmet>
                <title>Events | Success Wikis</title>
                <meta name="description" content="Join Success Wikis events - Meet and network with amazing founders." />
            </Helmet>   

            <div className="events-container">
                <div className="events-grid">
                    {sortedEvents.map((event) => (
                        <Link to={`/events/${event.slug}`} key={event.id} className="event-card">
                            <div className="event-poster-wrapper">
                                <img src={event.poster} alt={event.title} />
                            </div>
                            <div className="event-info">
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-date">{event.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
