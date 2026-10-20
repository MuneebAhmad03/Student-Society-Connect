import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Globe, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="brand-icon-box">
                <GraduationCap size={20} className="brand-icon" />
              </div>
              <span className="brand-title">Campus<span className="brand-accent">Connect</span></span>
            </Link>
            <p className="footer-brand-desc">
              The official centralized platform for student societies, campus chapters, university events, and student engagement.
            </p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={15} />
                <span>Student Life Pavilion, Central Campus</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} />
                <span>campusconnect@university.edu</span>
              </div>
              <div className="footer-contact-item">
                <Globe size={15} />
                <span>university.edu/student-life</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Discover Home</Link></li>
              <li><Link to="/societies">Explore Societies</Link></li>
              <li><a href="/#events">Upcoming Events</a></li>
              <li><a href="/#announcements">Campus Notices</a></li>
              <li><Link to="/societies/tech-society">Featured Society</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Societies</h4>
            <ul className="footer-link-list">
              <li><Link to="/societies?cat=Technology">Technology & AI</Link></li>
              <li><Link to="/societies?cat=Sports">Sports & Fitness</Link></li>
              <li><Link to="/societies?cat=Arts+%26+Culture">Arts & Culture</Link></li>
              <li><Link to="/societies?cat=Debating">Debate & Forensics</Link></li>
              <li><Link to="/societies?cat=Social+Impact">Social Impact</Link></li>
            </ul>
          </div>

          {/* University Life */}
          <div className="footer-col">
            <h4 className="footer-col-title">Student Life</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#demo" onClick={(e) => e.preventDefault()} className="external-link-item">
                  <span>Student Handbook</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="#demo" onClick={(e) => e.preventDefault()} className="external-link-item">
                  <span>Societies Constitution</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="#demo" onClick={(e) => e.preventDefault()} className="external-link-item">
                  <span>Activity Grant Guidelines</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="#demo" onClick={(e) => e.preventDefault()} className="external-link-item">
                  <span>Room & Space Booking</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} CampusConnect. University Student Activities Council. All rights reserved.
          </p>
          <div className="footer-made-with">
            <span>Built with care for University Students</span>
            <Heart size={14} className="heart-icon" />
          </div>
        </div>
      </div>
    </footer>
  );
}
