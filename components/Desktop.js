import React from 'react';

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
      { children }
    </div>
  );
}

export default Desktop;
