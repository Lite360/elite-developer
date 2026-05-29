import React from 'react';
import Terminal from './components/Terminal';

/**
 * Main application component wrapping the terminal with retro CRT scanline overlays.
 */
function App() {
  return (
    <div className="crt-overlay">
      <div className="crt-effect">
        <Terminal />
      </div>
    </div>
  );
}

export default App;
