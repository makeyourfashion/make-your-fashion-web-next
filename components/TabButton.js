import React from 'react';

export default function ({ onClick, children, isActive }) {
  return (
    <button
      className={`tag-button ${isActive ? 'active-tag' : ''}`}
      onClick={onClick}
    >
      <style>{`
        .tag-button {
          margin-right: 10px;
          padding: 0 5px 0 5px;
        }
        .active-tag {
          background-color: #00b2a6;
          color: #fff;
        }
      `}</style>
      {children}
    </button>
  );
}
