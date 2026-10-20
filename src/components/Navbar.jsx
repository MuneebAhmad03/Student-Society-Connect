import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  Compass, 
  Calendar, 
  Bell, 
  Home as HomeIcon,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/societies?search=${encodeURIComponent(navSearch.trim())}`);
      setMobileMenuOpen(false);
    } else {
      navigate('/societies');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Logo and Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-box">
            <GraduationCap size={22} className="brand-icon" />
            <span className="brand-dot"></span>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Campus<span className="brand-accent">Connect</span></span>
            <span className="brand-tagline">University Societies</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <HomeIcon size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/societies" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <Compass size={16} />
            <span>Explore Societies</span>
          </NavLink>

          <a href="/#events" className="nav-link">
            <Calendar size={16} />
            <span>Events</span>
          </a>

          <a href="/#announcements" className="nav-link">
            <Bell size={16} />
            <span>Announcements</span>
          </a>
        </nav>

        {/* Search Field */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <Search size={16} className="nav-search-icon" />
          <input 
            type="text" 
            placeholder="Search societies or clubs..." 
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            className="nav-search-input"
          />
        </form>

        {/* User / Sign In Actions */}
        <div className="navbar-actions">
          {isSignedIn ? (
            <div className="profile-dropdown-wrapper">
              <button 
                type="button" 
                className="profile-trigger-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Student profile menu"
              >
                <div className="avatar-img-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Student Profile" 
                    className="avatar-img"
                  />
                  <span className="status-indicator"></span>
                </div>
                <div className="profile-btn-info">
                  <span className="profile-name">Alex Chen</span>
                  <span className="profile-role">Student</span>
                </div>
                <ChevronDown size={14} className="profile-chevron" />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown-menu">
                  <div className="profile-menu-header">
                    <p className="profile-menu-name">Alex Chen</p>
                    <p className="profile-menu-email">alex.chen@university.edu</p>
                    <span className="profile-badge">
                      <ShieldCheck size={12} />
                      Verified Student
                    </span>
                  </div>
                  <div className="profile-menu-divider"></div>
                  <Link 
                    to="/societies/tech-society" 
                    className="profile-menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Sparkles size={16} />
                    <span>My Societies (TechSoc)</span>
                  </Link>
                  <Link 
                    to="/societies" 
                    className="profile-menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Compass size={16} />
                    <span>Browse All Societies</span>
                  </Link>
                  <div className="profile-menu-divider"></div>
                  <button 
                    type="button" 
                    className="profile-menu-item text-danger"
                    onClick={() => {
                      setIsSignedIn(false);
                      setShowProfileMenu(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out (Demo)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              type="button" 
              className="btn-signin"
              onClick={() => setIsSignedIn(true)}
            >
              <User size={16} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <Search size={16} className="nav-search-icon" />
            <input 
              type="text" 
              placeholder="Search societies..." 
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="nav-search-input"
            />
          </form>

          <nav className="mobile-nav-links">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
              onClick={closeMobileMenu}
            >
              <HomeIcon size={18} />
              <span>Home</span>
            </NavLink>

            <NavLink 
              to="/societies" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
              onClick={closeMobileMenu}
            >
              <Compass size={18} />
              <span>Explore Societies</span>
            </NavLink>

            <a href="/#events" className="mobile-nav-link" onClick={closeMobileMenu}>
              <Calendar size={18} />
              <span>Upcoming Events</span>
            </a>

            <a href="/#announcements" className="mobile-nav-link" onClick={closeMobileMenu}>
              <Bell size={18} />
              <span>Announcements</span>
            </a>
          </nav>

          <div className="mobile-user-status">
            {isSignedIn ? (
              <div className="mobile-profile-card">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Student Profile" 
                  className="avatar-img"
                />
                <div className="mobile-profile-details">
                  <span className="profile-name">Alex Chen</span>
                  <span className="profile-role">Computer Science Senior</span>
                </div>
                <button 
                  className="btn-sm btn-outline"
                  onClick={() => setIsSignedIn(false)}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                className="btn-primary w-full"
                onClick={() => {
                  setIsSignedIn(true);
                  closeMobileMenu();
                }}
              >
                Sign In as Student
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
