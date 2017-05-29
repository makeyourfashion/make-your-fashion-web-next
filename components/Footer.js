import React from 'react';

function Footer() {
  return (
    <div>
      <style jsx>{`
        .footer {
          border-top: 1px solid #dedede;
          margin: auto;
          margin-top: 40px;
        }

        .contact-list {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          color: #333;
        }

        .contact-info {
          padding: 0 10px 0 10px;
        }
        .footer-icon {
          display: inline-table;
          vertical-align: middle;
          margin-right: 5px;
        }
      `}</style>
      <div className="footer">
        <div className="contact-list">
          <div className="contact-info">联系我们:</div>
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
