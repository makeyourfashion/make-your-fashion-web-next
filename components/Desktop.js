import React from 'react';

const notDesktop = typeof window === 'object' && window.screen.width < 600;

function Desktop({ children }) {
  return (
    <div className="mobile-breakpoint">
      <style jsx>{`
        @media (max-width: 600px) {
          .mobile-breakpoint {
            display: none;
          }
        }
      `}</style>
      { notDesktop ? null : children }
    </div>
  );
}

export default Desktop;
