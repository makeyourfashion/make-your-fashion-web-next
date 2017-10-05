import React from 'react';

export default function ({ onClick, children, isActive, ...props }) {
  return (
    <button
      {...props}
      className={`tag-button ${isActive ? 'active-tag' : ''}`}
      onClick={onClick}
    >
      <style>{`
        .tag-button {
          margin-right: 10px;
          padding: 0 5px 0 5px;
          border: solid 1px #dedede;
          background-color: #fff;
        }
        .active-tag {
          background-color: #00b2a6;
          color: #fff;
          border: none;
        }
      `}</style>
      {children}
    </button>
  );
}
