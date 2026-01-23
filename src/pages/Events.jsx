import React from 'react';
import { Link } from 'react-router-dom';
import { eventMetadata } from '../events/metadata';
import '../css/events.css';
import { Helmet } from 'react-helmet-async';

const Events = () => {
    return (
        <div className="events-page">
            <Helmet>
                <title>Events | Success Wikis</title>
                <meta name="description" content="Join Success Wikis events - Meet and network with amazing founders." />
            </Helmet>   

            <div className="events-container">
                <div className="events-grid">
                    {eventMetadata.map((event) => (
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
