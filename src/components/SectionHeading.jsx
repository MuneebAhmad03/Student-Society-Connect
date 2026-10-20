import React from 'react';

export default function SectionHeading({ badge, title, subtitle, action, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading-center' : ''}`}>
      <div className="section-heading-content">
        {badge && <span className="section-badge">{badge}</span>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}
