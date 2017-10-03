import React from 'react';

const notMobile = typeof window === 'object' && window.screen.width > 600;

function Mobile({ children }) {
  return (
    <div className="mobile-breakpoint">
      <style jsx>{`
        @media (min-width: 600px) {
          .mobile-breakpoint {
            display: none;
          }
        }
      `}</style>
      { notMobile ? null : children }
    </div>
  );
}

export default Mobile;
