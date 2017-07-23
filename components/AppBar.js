import React from 'react';
import MAppBar from './MAppBar';
import DAppBar from './DAppBar';
import Mobile from './Mobile';
import Desktop from './Desktop';

function AppBar() {
  return (
    <div>
      <Mobile>
        <MAppBar />
      </Mobile>
      <Desktop>
        <DAppBar />
      </Desktop>
    </div>
  );
}

export default AppBar;
