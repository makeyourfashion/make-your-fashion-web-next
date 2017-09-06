import React from 'react';
import { Provider } from 'mobx-react';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initProductStore from '../stores/product';
import CreateAccountView from '../components/createAccount';

function CreateAccount({ redirect }) {
  return (
    <div>
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productStore={initProductStore()}
      >
        <CreateAccountView redirect={redirect} />
      </Provider>
    </div>
  );
}

CreateAccount.getInitialProps = ({ res, query }) => {
  if (res) {
    res.clearCookie('myf_token');
  }
  return {
    redirect: query.redirect,
  };
};

export default CreateAccount;
