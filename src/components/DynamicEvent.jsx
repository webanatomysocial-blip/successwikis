import React, { Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventMetadata } from '../events/metadata.js';
import { Helmet } from 'react-helmet-async';

// Import all event modules recursively from ../events/
const eventModules = import.meta.glob('../events/**/*.jsx');

export default function DynamicEvent() {
  const { eventSlug } = useParams(); 

  // 1. Find metadata
  const metadata = useMemo(() => {
    if (!eventSlug) return null;
    return eventMetadata.find(e => 
        e.slug === eventSlug || e.id === eventSlug
    ) || null;
  }, [eventSlug]);

  // 2. Determine module key
  const moduleKey = useMemo(() => {
     if (metadata) {
         const key = Object.keys(eventModules).find(k => k.includes(`/${metadata.id}.jsx`));
         return key;
     }
     return null;
  }, [metadata]);


  // 3. Lazy Load
  const EventComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(eventModules[moduleKey]);
  }, [moduleKey]);

  if (!EventComponent) {
    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <h1>Event Not Found</h1>
            <p>We couldn't find the event you're looking for.</p>
            <Link to="/events" style={{ textDecoration: 'underline', color: 'blue' }}>Back to Events</Link>
        </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{metadata ? `${metadata.title} | Success Wikis` : 'Event | Success Wikis'}</title>
      </Helmet>
      
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
        <EventComponent />
      </Suspense>
    </>
  );
}
