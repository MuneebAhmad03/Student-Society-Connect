import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Building2, Users, CheckCircle2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventModal({ event, onClose }) {
  const [registered, setRegistered] = useState(false);

  if (!event) return null;

  const handleRegister = () => {
    setRegistered(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-image-header">
          <img src={event.image} alt={event.title} className="modal-header-image" />
          <div className="modal-header-overlay">
            <span className="modal-category-tag">{event.category}</span>
            {event.badge && <span className="modal-flag-badge">{event.badge}</span>}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-society-tag">
            <Building2 size={16} />
            <Link to={`/societies/${event.societyId}`} onClick={onClose}>
              {event.societyName}
            </Link>
          </div>

          <h2 className="modal-title">{event.title}</h2>

          <div className="modal-details-grid">
            <div className="modal-detail-card">
              <Calendar size={18} className="modal-detail-icon" />
              <div>
                <span className="modal-detail-label">Date</span>
                <span className="modal-detail-value">{event.date}</span>
              </div>
            </div>

            <div className="modal-detail-card">
              <Clock size={18} className="modal-detail-icon" />
              <div>
                <span className="modal-detail-label">Time</span>
                <span className="modal-detail-value">{event.time || 'TBA'}</span>
              </div>
            </div>

            <div className="modal-detail-card">
              <MapPin size={18} className="modal-detail-icon" />
              <div>
                <span className="modal-detail-label">Venue</span>
                <span className="modal-detail-value">{event.location}</span>
              </div>
            </div>

            <div className="modal-detail-card">
              <Users size={18} className="modal-detail-icon" />
              <div>
                <span className="modal-detail-label">Capacity</span>
                <span className="modal-detail-value">{event.capacity || 'Open Registration'}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">About This Event</h4>
            <p className="modal-desc">{event.description}</p>
          </div>

          <div className="modal-footer-actions">
            {registered ? (
              <div className="registered-alert">
                <CheckCircle2 size={20} className="check-icon" />
                <div>
                  <strong>You are RSVP'd! (Demo)</strong>
                  <p>Confirmation email sent to student ID. Check your university inbox.</p>
                </div>
              </div>
            ) : (
              <div className="rsvp-action-row">
                <div className="rsvp-info">
                  <Ticket size={18} className="text-muted" />
                  <span>Free entry for enrolled university students</span>
                </div>
                <button type="button" className="btn-primary rsvp-btn" onClick={handleRegister}>
                  Reserve Free Spot
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
