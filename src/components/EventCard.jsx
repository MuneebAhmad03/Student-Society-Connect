import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventCard({ event, onViewEvent }) {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={event.image} alt={event.title} className="event-image" loading="lazy" />
        <span className="event-category-badge">{event.category}</span>
        {event.badge && <span className="event-flag-badge">{event.badge}</span>}
      </div>

      <div className="event-content">
        <div className="event-organizer-row">
          <Building2 size={15} className="text-primary" />
          <Link to={`/societies/${event.societyId}`} className="event-organizer-link">
            {event.societyName}
          </Link>
        </div>

        <h3 className="event-title">{event.title}</h3>

        <div className="event-meta-list">
          <div className="event-meta-item">
            <Calendar size={15} />
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="event-meta-item">
              <Clock size={15} />
              <span>{event.time}</span>
            </div>
          )}
          <div className="event-meta-item">
            <MapPin size={15} />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="event-description-text">{event.description}</p>

        <div className="event-card-actions">
          <button 
            type="button" 
            className="btn-view-event" 
            onClick={() => onViewEvent && onViewEvent(event)}
          >
            <span>View Event</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
