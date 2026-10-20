import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Globe, 
  CheckCircle2, 
  UserCheck, 
  UserPlus, 
  Sparkles, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Clock,
  Share2,
  Bookmark
} from 'lucide-react';
import { societies, upcomingEvents, announcements } from '../data/mockData';
import EventCard from '../components/EventCard';
import AnnouncementCard from '../components/AnnouncementCard';
import SectionHeading from '../components/SectionHeading';
import EventModal from '../components/EventModal';
import NoticeModal from '../components/NoticeModal';

export default function SocietyDetails() {
  const { id } = useParams();
  
  // Find matching society, or default to tech-society
  const targetId = id || 'tech-society';
  const society = societies.find((s) => s.id === targetId) || societies[0];

  // Membership state (demo frontend interaction)
  const [isJoined, setIsJoined] = useState(false);
  const [memberCount, setMemberCount] = useState(society.memberCount);
  const [savedBookmark, setSavedBookmark] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Filter events belonging to this society or generic campus events if fewer than 2
  const societyEvents = upcomingEvents.filter((e) => e.societyId === society.id);
  const displayEvents = societyEvents.length >= 2 
    ? societyEvents 
    : [...societyEvents, ...upcomingEvents.filter((e) => e.societyId !== society.id)].slice(0, 3);

  // Filter announcements belonging to this society or generic campus announcements
  const societyNotices = announcements.filter((a) => a.societyId === society.id);
  const displayNotices = societyNotices.length >= 1 
    ? societyNotices 
    : announcements.slice(0, 2);

  const handleJoinToggle = () => {
    if (!isJoined) {
      setIsJoined(true);
      setMemberCount(prev => prev + 1);
      showToast(`Welcome to ${society.name}! You are now an active member.`);
    } else {
      setIsJoined(false);
      setMemberCount(prev => prev - 1);
      showToast(`You have left ${society.name}.`);
    }
  };

  const handleBookmarkToggle = () => {
    setSavedBookmark(!savedBookmark);
    showToast(savedBookmark ? 'Removed from saved societies' : 'Saved to your favorite societies');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToEvents = () => {
    const el = document.getElementById('society-events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper society-details-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="society-toast">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Navigation Bar */}
      <div className="society-subnav-bar">
        <div className="content-container">
          <div className="subnav-breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <Link to="/societies" className="breadcrumb-link">Societies</Link>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current">{society.name}</span>
          </div>
        </div>
      </div>

      {/* 1. HERO COVER & BANNER SECTION */}
      <section className="society-banner-section">
        <div className="banner-image-container">
          <img 
            src={society.bannerImage} 
            alt={`${society.name} banner`} 
            className="society-banner-img"
          />
          <div className="society-banner-gradient"></div>
        </div>

        <div className="content-container">
          <div className="society-header-card">
            <div className="society-header-top">
              {/* Society Logo / Emblem */}
              <div className="society-avatar-large">
                <img 
                  src={society.logoImage} 
                  alt={society.name} 
                  className="society-avatar-img"
                />
              </div>

              {/* Action Buttons */}
              <div className="society-header-actions">
                <button 
                  type="button" 
                  className={`btn-action-bookmark ${savedBookmark ? 'btn-bookmarked' : ''}`}
                  onClick={handleBookmarkToggle}
                  title="Bookmark Society"
                >
                  <Bookmark size={18} />
                </button>

                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={scrollToEvents}
                >
                  <Calendar size={18} />
                  <span>View Events</span>
                </button>

                <button 
                  type="button" 
                  className={`btn-primary ${isJoined ? 'btn-joined-state' : ''}`}
                  onClick={handleJoinToggle}
                >
                  {isJoined ? (
                    <>
                      <UserCheck size={18} />
                      <span>Joined ✓</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Join Society</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Society Identity Details */}
            <div className="society-identity-info">
              <div className="society-title-badge-row">
                <h1 className="society-page-title">{society.name}</h1>
                {society.verified && (
                  <span className="verified-pill">
                    <CheckCircle2 size={15} />
                    <span>Official Society</span>
                  </span>
                )}
                <span className="category-pill">{society.category}</span>
              </div>

              <p className="society-page-tagline">{society.tagline}</p>
              <p className="society-page-desc">{society.description}</p>

              {/* Fast Facts Bar */}
              <div className="society-quick-stats">
                <div className="quick-stat-item">
                  <Users size={16} className="text-primary" />
                  <span><strong>{memberCount.toLocaleString()}</strong> Active Members</span>
                </div>
                <div className="quick-stat-item">
                  <Award size={16} className="text-primary" />
                  <span>Established in <strong>{society.established}</strong></span>
                </div>
                <div className="quick-stat-item">
                  <Clock size={16} className="text-primary" />
                  <span>{society.meetingSchedule}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & DETAILS SECTION */}
      <section className="section-padding">
        <div className="content-container">
          <div className="details-layout-grid">
            {/* Main Column */}
            <div className="details-main-col">
              {/* About Card */}
              <div className="content-card">
                <h2 className="card-heading">About the Society</h2>
                <p className="about-text-body">{society.about}</p>
                
                <div className="society-highlights-box">
                  <h4 className="highlights-title">What We Offer Members</h4>
                  <ul className="highlights-list">
                    <li>
                      <CheckCircle2 size={18} className="text-primary check-bullet" />
                      <span><strong>Hands-on Experience:</strong> Work on university-wide initiatives, real-world tech stacks, and team projects.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="text-primary check-bullet" />
                      <span><strong>Alumni & Industry Access:</strong> Exclusive mentorship sessions, technical talks, and networking mixers.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="text-primary check-bullet" />
                      <span><strong>Leadership Opportunities:</strong> Step up as event directors, project captains, and committee heads.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. SOCIETY UPCOMING EVENTS */}
              <div id="society-events" className="mt-8">
                <SectionHeading 
                  badge="Calendar"
                  title="Upcoming Society Events"
                  subtitle={`Upcoming workshops, meetups, and competitions hosted by ${society.shortName}.`}
                />

                <div className="events-grid society-events-grid">
                  {displayEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onViewEvent={(ev) => setSelectedEvent(ev)}
                    />
                  ))}
                </div>
              </div>

              {/* 4. SOCIETY ANNOUNCEMENTS */}
              <div className="mt-8">
                <SectionHeading 
                  badge="Bulletin"
                  title="Recent Notices & Announcements"
                  subtitle="Latest dispatches, recruitment calls, and updates."
                />

                <div className="announcements-grid">
                  {displayNotices.map((ann) => (
                    <AnnouncementCard 
                      key={ann.id} 
                      announcement={ann}
                      onReadMore={(notice) => setSelectedNotice(notice)}
                    />
                  ))}
                </div>
              </div>

              {/* 5. GALLERY SECTION */}
              <div className="mt-8">
                <SectionHeading 
                  badge="Life in the Society"
                  title="Society Gallery & Highlights"
                  subtitle="Snapshots of our recent workshops, hackathons, and campus meetups."
                />

                <div className="gallery-grid">
                  {society.gallery && society.gallery.map((img, idx) => (
                    <div key={idx} className="gallery-item-card">
                      <img src={img.url} alt={img.title} className="gallery-img" loading="lazy" />
                      <div className="gallery-caption">
                        <span>{img.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="details-sidebar-col">
              {/* Contact & Meeting Info */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Society Information</h3>
                
                <div className="sidebar-info-list">
                  <div className="sidebar-info-row">
                    <Clock size={16} className="sidebar-icon" />
                    <div>
                      <span className="sidebar-label">Regular Meetings</span>
                      <p className="sidebar-val">{society.meetingSchedule}</p>
                    </div>
                  </div>

                  <div className="sidebar-info-row">
                    <Mail size={16} className="sidebar-icon" />
                    <div>
                      <span className="sidebar-label">Official Email</span>
                      <a href={`mailto:${society.email}`} className="sidebar-link">{society.email}</a>
                    </div>
                  </div>

                  <div className="sidebar-info-row">
                    <Globe size={16} className="sidebar-icon" />
                    <div>
                      <span className="sidebar-label">Website & Portal</span>
                      <a href={society.website} target="_blank" rel="noreferrer" className="sidebar-link">
                        {society.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="sidebar-btn-wrap">
                  <button 
                    type="button" 
                    className={`btn-primary w-full ${isJoined ? 'btn-joined-state' : ''}`}
                    onClick={handleJoinToggle}
                  >
                    {isJoined ? 'Joined as Member ✓' : 'Join Society (Demo)'}
                  </button>
                </div>
              </div>

              {/* 6. TEAM SECTION */}
              <div className="sidebar-card mt-6">
                <div className="sidebar-team-header">
                  <h3 className="sidebar-card-title mb-0">Executive Committee</h3>
                  <span className="team-count-badge">{society.team.length} Leaders</span>
                </div>
                <p className="sidebar-team-desc">Meet the student officers leading this society for the current academic session.</p>

                <div className="team-cards-stack">
                  {society.team.map((member, idx) => (
                    <div key={idx} className="team-member-item">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="team-avatar"
                      />
                      <div className="team-member-info">
                        <h4 className="team-member-name">{member.name}</h4>
                        <span className="team-member-role">{member.role}</span>
                        <span className="team-member-major">{member.major}</span>
                        <p className="team-member-bio">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
