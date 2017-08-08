import React from 'react';
import MAppBar from './MAppBar';
import DAppBar from './DAppBar';
import Mobile from './Mobile';
import Desktop from './Desktop';

function AppBar({ transparent }) {
  return (
    <div className="wrapper">
      <style jsx>{`
        .wrapper {
          background-color: #fff;
        }
      `}</style>
      <Mobile>
        <MAppBar transparent={transparent} />
      </Mobile>
      <Desktop>
        <DAppBar />
      </Desktop>
    </div>
  );
}

export default AppBar;
