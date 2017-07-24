import React from 'react';
import MAppBar from './MAppBar';
import DAppBar from './DAppBar';
import Mobile from './Mobile';
import Desktop from './Desktop';

function AppBar({ transparent }) {
  return (
    <div>
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
