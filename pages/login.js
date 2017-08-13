import React from 'react';
import { Provider } from 'mobx-react';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initProductStore from '../stores/product';
import LoginView from '../components/login';

function Login({ redirect }) {
  return (
    <div>
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productStore={initProductStore()}
      >
        <LoginView redirect={redirect} />
      </Provider>
    </div>
  );
}

Login.getInitialProps = ({ res, query }) => {
  if (res) {
    res.clearCookie('myf_token');
  }
  return {
    redirect: query.redirect,
  };
};

export default Login;
