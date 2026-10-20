import React from 'react';
import { X, Calendar, Bell, Building2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NoticeModal({ announcement, onClose }) {
  if (!announcement) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close notice">
          <X size={20} />
        </button>

        <div className="modal-body p-6">
          <div className="modal-notice-badge">
            <Bell size={16} />
            <span>{announcement.tag || 'Official University Notice'}</span>
          </div>

          <h2 className="modal-title mt-3">{announcement.title}</h2>

          <div className="modal-notice-meta">
            <div className="notice-meta-item">
              <Building2 size={15} />
              <Link to={`/societies/${announcement.societyId}`} onClick={onClose}>
                {announcement.societyName}
              </Link>
            </div>
            <div className="notice-meta-item">
              <Calendar size={15} />
              <span>Published: {announcement.date} ({announcement.timeAgo})</span>
            </div>
          </div>

          <div className="notice-body-content">
            <p className="notice-lead">{announcement.excerpt}</p>
            <p className="notice-paragraph">
              All interested students should ensure their CampusConnect profile details and faculty affiliations are up to date. For additional queries or committee assistance, please reach out to the organizing society executive committee via their dedicated page or official university email.
            </p>
            <div className="notice-callout">
              <CheckCircle2 size={18} className="text-primary" />
              <span>Verified notice released through the Student Activities Directorate.</span>
            </div>
          </div>

          <div className="modal-footer-simple">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Dismiss
            </button>
            <Link 
              to={`/societies/${announcement.societyId}`} 
              className="btn-primary" 
              onClick={onClose}
            >
              Visit Society Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
