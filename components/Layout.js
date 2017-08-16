import React from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from './AppBar';
import Footer from './Footer';

export default function withLayout(WrappedComponent) {
  return inject('identityStore')(observer(class Layout extends React.Component {
    componentDidMount() {
      this.props.identityStore.initSession();
    }

    render() {
      return (
        <div>
          <AppBar />
          <WrappedComponent {...this.props} />
          <Footer />
        </div>
      );
    }
  }));
}
