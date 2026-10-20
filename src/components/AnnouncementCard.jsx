import React from 'react';
import { Calendar, Bell, Building2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementCard({ announcement, onReadMore }) {
  return (
    <div className="announcement-card">
      <div className="announcement-header">
        <div className="announcement-tag-wrapper">
          <span className="announcement-badge">
            <Bell size={13} className="bell-icon" />
            {announcement.tag || 'Notice'}
          </span>
          <span className="announcement-time">{announcement.timeAgo}</span>
        </div>
        <div className="announcement-date">
          <Calendar size={14} />
          <span>{announcement.date}</span>
        </div>
      </div>

      <h3 className="announcement-title">{announcement.title}</h3>

      <div className="announcement-society-row">
        <Building2 size={14} className="text-primary" />
        <Link to={`/societies/${announcement.societyId}`} className="announcement-society-link">
          {announcement.societyName}
        </Link>
      </div>

      <p className="announcement-excerpt">{announcement.excerpt}</p>

      <div className="announcement-footer">
        <button 
          type="button" 
          className="btn-read-announcement"
          onClick={() => onReadMore && onReadMore(announcement)}
        >
          <span>Read Full Notice</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
