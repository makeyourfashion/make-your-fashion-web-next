import React from 'react';

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
      { children }
    </div>
  );
}

export default Mobile;
