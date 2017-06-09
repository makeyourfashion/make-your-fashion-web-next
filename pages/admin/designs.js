import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../../components/Head';
import initIdentityStore from '../../stores/identity';
import DesignsView from '../../components/admin/designs';

function Designs() {
  return (
    <div>
      <Head />
      <Provider identityStore={initIdentityStore()}>
        <DesignsView />
      </Provider>
    </div>
  );
}

export default Designs;
