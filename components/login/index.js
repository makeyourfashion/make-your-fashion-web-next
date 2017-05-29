import React from 'react';
import Router from 'next/router';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import AppBar from '../AppBar';
import Footer from '../Footer';

export default class LoginView extends React.Component {
  handleRedirect = () => {
    Router.push(this.props.redirect || '/');
  }

  render() {
    return (
      <div>
        <style global jsx>{`
          .form-container {
            margin: auto;
            max-width: 350px;
          }
          @media (min-width: 840px) {
            .create-account-section {
              border-left: 1px solid #dedede;
            }
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
              <LoginForm onSuccess={this.handleRedirect} />
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 create-account-section">
              <CreateAccountForm onSuccess={this.handleRedirect} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
