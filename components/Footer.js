import React from 'react';

function Footer() {
  return (
    <div>
      <style jsx>{`
        .footer {
          border-top: 1px solid #dedede;
          margin: auto;
          margin-top: 20px;
          background: #dedede;
          min-height: 5vh;
          padding: 0 0 60px 0;
        }

        .contact-list {
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          color: #333;
        }

        .contact-info {
          padding: 0 10px 0 10px;
        }
        @media (min-width: 600px) {
          .contact-label {
            margin: 0;
            font-size: 1em;
          }
        }
        @media (max-width: 600px) {
          .contact-label {
            width: 100%;
            margin: 0 0 20px 0;
            text-align: center;
            letter-spacing: .1rem;
            font-weight: bold;
            font-size: 1.125em;
          }
        }
        .footer-icon {
          display: inline-table;
          vertical-align: middle;
          margin-right: 5px;
        }
      `}</style>
      <div className="footer">
        <div className="contact-list">
          <div className="contact-info contact-label">联系我们:</div>
          <div className="contact-info">
            <i className="material-icons footer-icon">phone</i>
            <span>12345678</span>
          </div>
          <div className="contact-info">
            <i className="material-icons footer-icon">email</i>
            <span>support@tshe.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
