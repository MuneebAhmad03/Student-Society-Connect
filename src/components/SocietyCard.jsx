import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, CheckCircle2, Code2, Trophy, MessageSquare, Palette, HeartHandshake, Cpu } from 'lucide-react';

const iconMap = {
  Code2,
  Trophy,
  MessageSquare,
  Palette,
  HeartHandshake,
  Cpu
};

export default function SocietyCard({ society }) {
  const IconComponent = iconMap[society.iconName] || Users;

  return (
    <div className="society-card">
      <div className="society-card-header">
        <div className="society-icon-wrapper" style={{ backgroundColor: `${society.accentColor}15`, color: society.accentColor }}>
          <IconComponent size={24} strokeWidth={2.2} />
        </div>
        <span className="society-category-tag">{society.category}</span>
      </div>

      <div className="society-card-body">
        <div className="society-title-row">
          <h3 className="society-title">{society.name}</h3>
          {society.verified && (
            <span title="Official University Society" className="verified-badge">
              <CheckCircle2 size={16} />
            </span>
          )}
        </div>
        <p className="society-desc">{society.description}</p>
      </div>

      <div className="society-card-footer">
        <div className="society-members">
          <Users size={16} className="text-muted" />
          <span><strong>{society.memberCount.toLocaleString()}</strong> active members</span>
        </div>

        <Link to={`/societies/${society.id}`} className="btn-explore-society">
          <span>Explore Society</span>
          <ArrowRight size={16} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
}
