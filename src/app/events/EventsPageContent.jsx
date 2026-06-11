"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { eventMetadata } from '../../events/metadata';
import { getApiBaseUrl } from '../../lib/api';

const EventsPageContent = () => {
    const [dynamicEvents, setDynamicEvents] = useState([]);

    useEffect(() => {
        const fetchDynamicEvents = async () => {
            try {
                const apiBaseURL = getApiBaseUrl();
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

    // Merge static and dynamic events
    const sortedEvents = [...dynamicEvents, ...eventMetadata];

    return (
        <div className="events-page">
            <div className="events-container">
                <div className="events-grid">
                    {sortedEvents.map((event) => (
                        <Link href={`/events/${event.slug}`} key={event.id} className="event-card">
                             <div className="event-poster-wrapper" style={{ position: "relative" }}>
                                 <Image
                                     src={event.poster.src || event.poster}
                                     alt={event.title}
                                     fill
                                     sizes="(max-width: 768px) 100vw, 400px"
                                     style={{ objectFit: "cover" }}
                                     unoptimized
                                 />
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

export default EventsPageContent;
