import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Calendar, 
  Award, 
  ChevronRight, 
  Compass,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SocietyCard from '../components/SocietyCard';
import EventCard from '../components/EventCard';
import AnnouncementCard from '../components/AnnouncementCard';
import EventModal from '../components/EventModal';
import NoticeModal from '../components/NoticeModal';
import { societies, upcomingEvents, announcements, platformStats } from '../data/mockData';

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Take the 4 featured societies as requested: Tech Society, Sports Society, Debating Society, Arts & Culture Society
  const featuredSocieties = societies.slice(0, 4);

  // 3 upcoming events for the homepage
  const homeEvents = upcomingEvents.slice(0, 3);

  // 3 recent announcements
  const homeAnnouncements = announcements.slice(0, 3);

  const handleDiscoverEventsClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-pill-badge">
                <Sparkles size={15} className="sparkle-icon" />
                <span>Official Student Societies Network</span>
              </div>

              <h1 className="hero-title">
                Your Campus. <br />
                <span className="hero-title-highlight">Your Community.</span>
              </h1>

              <p className="hero-subtitle">
                Discover societies, explore events, and stay connected with everything happening at your university.
              </p>

              <div className="hero-actions-row">
                <Link to="/societies" className="btn-primary btn-hero">
                  <span>Explore Societies</span>
                  <ArrowRight size={18} />
                </Link>

                <button 
                  type="button" 
                  className="btn-secondary btn-hero" 
                  onClick={handleDiscoverEventsClick}
                >
                  <Calendar size={18} />
                  <span>Discover Events</span>
                </button>
              </div>

              {/* Platform metrics */}
              <div className="hero-stats-strip">
                {platformStats.map((stat, idx) => (
                  <div key={idx} className="hero-stat-item">
                    <span className="hero-stat-number">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-card">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" 
                  alt="University students collaborating and smiling on campus" 
                  className="hero-main-image"
                />
                <div className="hero-image-overlay"></div>

                {/* Floating Metric 1 */}
                <div className="floating-metric-card top-float">
                  <div className="metric-icon-box bg-blue">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="float-metric-title">Campus Hackathon 2026</span>
                    <span className="float-metric-sub">Tech Society • 300+ Registered</span>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="floating-metric-card bottom-float">
                  <div className="metric-avatar-group">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="float-metric-title">12,500+ Students</span>
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <span className="float-metric-sub">Active in 45 verified chapters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SOCIETIES SECTION */}
      <section className="section-padding bg-subtle">
        <div className="content-container">
          <SectionHeading 
            badge="Featured Communities"
            title="Explore University Societies"
            subtitle="Connect with peers, hone real-world skills, and lead campus initiatives."
            action={
              <Link to="/societies" className="section-link-action">
                <span>View all societies</span>
                <ChevronRight size={18} />
              </Link>
            }
          />

          <div className="societies-grid">
            {featuredSocieties.map((society) => (
              <SocietyCard key={society.id} society={society} />
            ))}
          </div>

          <div className="section-bottom-cta">
            <Link to="/societies" className="btn-secondary">
              <Compass size={18} />
              <span>Browse All Categories ({societies.length} Societies)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS SECTION */}
      <section id="events" className="section-padding">
        <div className="content-container">
          <SectionHeading 
            badge="Live Schedule"
            title="Upcoming Campus Events"
            subtitle="Mark your calendar for hackathons, varsity matches, debate rounds, and cultural showcases."
            action={
              <button 
                type="button" 
                className="section-link-action" 
                onClick={() => setSelectedEvent(upcomingEvents[0])}
              >
                <span>Latest Highlights</span>
                <ChevronRight size={18} />
              </button>
            }
          />

          <div className="events-grid">
            {homeEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewEvent={(ev) => setSelectedEvent(ev)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENT ANNOUNCEMENTS SECTION */}
      <section id="announcements" className="section-padding bg-subtle">
        <div className="content-container">
          <SectionHeading 
            badge="Official Notices"
            title="Recent Campus Announcements"
            subtitle="Stay informed with verified updates from society committees and the Student Council."
          />

          <div className="announcements-grid">
            {homeAnnouncements.map((ann) => (
              <AnnouncementCard 
                key={ann.id} 
                announcement={ann}
                onReadMore={(notice) => setSelectedNotice(notice)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. JOIN COMMUNITY BANNER */}
      <section className="section-padding cta-section">
        <div className="content-container">
          <div className="cta-card">
            <div className="cta-content">
              <span className="cta-badge">Get Involved</span>
              <h2 className="cta-title">Ready to find your student community?</h2>
              <p className="cta-text">
                Join over 12,000 students discovering passions, building lifelong friendships, and organizing landmark campus experiences.
              </p>
              <div className="cta-button-group">
                <Link to="/societies" className="btn-primary btn-cta">
                  <span>Browse All Societies</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/societies/tech-society" className="btn-secondary btn-cta-outline">
                  <span>View Tech Society Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Notice Details Modal */}
      {selectedNotice && (
        <NoticeModal 
          announcement={selectedNotice} 
          onClose={() => setSelectedNotice(null)} 
        />
      )}
    </div>
  );
}
