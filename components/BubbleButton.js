import React from 'react';

function BubbleButton({ children, ...props }) {
  return (
    <button {...props}>
      <style jsx>{`
        button {
          padding: 5px !important;
          display: inline-block;
          cursor: pointer;
          border-radius: 50%;
          text-align: center;
          line-height: 1;
          position: relative;
          border: 2px solid transparent;
          background: #ffffff;
          box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
        }
      `}</style>
      {children}
    </button>
  );
}

export default BubbleButton;
