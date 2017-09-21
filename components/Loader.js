import React from 'react';

export default function () {
  return (
    <div className="loading-wrapper">
      <style jsx>{`
        .loading-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .loading-spinner {
          position: absolute;
          display: inline-block;
          left: 0px;
        }
        .loading-spinner {
          top: 50%;
          margin-top: -21px;
          width: 100%;
          text-align: center;
          position: absolute;
        }
        .circular {
          width: 42px;
          height: 42px;
          animation: loading-rotate 2s linear infinite;
        }
        .loading-spinner .path {
          animation: loading-dash 1.5s ease-in-out infinite;
          stroke-dasharray: 90,150;
          stroke-dashoffset: 0;
          stroke-width: 2;
          stroke: #ff5a5f;
          stroke-linecap: round;
        }
        .loading-text {
          color: #ff5a5f;
          margin: 3px 0;
          font-size: 14px;
        }
        @keyframes loading-rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loading-dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40px;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120px;
          }
        }
      `}</style>
      <div className="loading-spinner" >
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <p className="loading-text">努力加载中...</p>
      </div>
    </div>
  );
}
