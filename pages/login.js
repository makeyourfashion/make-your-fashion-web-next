import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import LoginView from '../components/login';
import initProductDetailStore from '../stores/productDetail';

function Login({ redirect }) {
  return (
    <div>
      <Head />
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productDetailStore={initProductDetailStore()}
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
