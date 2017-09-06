import React from 'react';
import Router from 'next/router';
import LoginForm from './LoginForm';
import withLayout from '../Layout';

@withLayout
export default class LoginView extends React.Component {
  handleRedirect = () => {
    Router.push(this.props.redirect || '/');
  }

  render() {
    return (
      <div>
        <style global jsx>{`
          .login-card {
            max-width: 400px;
            background-color: #fff;
            margin: auto;
            margin-top: 20px;
            padding: 20px 20px 40px 20px;
          }
          @media (min-width: 600px) {
            .login-card {
              margin-top: 64px;
            }
          }
        `}</style>
        <div className="container">
          <div className="mdc-elevation--z1 login-card">
            <LoginForm onRegister={this.handleRegister} onSuccess={this.handleRedirect} />
          </div>
        </div>
      </div>
    );
  }
}
