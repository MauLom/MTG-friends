'use client';

import React from 'react';
import { Box } from '@mantine/core';

export interface SkipLinksProps {
  links: Array<{
    id: string;
    label: string;
  }>;
}

/**
 * SkipLinks - Accessibility component providing keyboard shortcuts to main page sections
 * Skip links are hidden until focused, allowing keyboard users to bypass repetitive content
 */
export default function SkipLinks({ links }: SkipLinksProps) {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      component="nav"
      aria-label="Skip navigation links"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
      }}
    >
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => handleSkipClick(e, link.id)}
          className="skip-to-link"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '0',
            zIndex: 9999,
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0 0 0.5rem 0',
            fontWeight: 600,
            fontSize: '1rem',
            whiteSpace: 'nowrap',
          }}
        >
          {link.label}
        </a>
      ))}
      <style jsx>{`
        .skip-to-link:focus {
          left: 0 !important;
          outline: 3px solid rgba(102, 126, 234, 0.8);
          outline-offset: 2px;
        }
      `}</style>
    </Box>
  );
}
