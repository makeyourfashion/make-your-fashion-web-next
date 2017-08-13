import React from 'react';
import AppBar from './AppBar';
import Footer from './Footer';

export default function withLayout(WrappedComponent) {
  return props => (
    <div>
      <AppBar />
      <WrappedComponent {...props} />
      <Footer />
    </div>
  );
}
