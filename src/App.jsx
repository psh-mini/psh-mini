import React, { useEffect, useState, useRef } from 'react';
import Graphs from './Components/Graphs';
import DiagramTemplate from './Components/DiagramTemplate';
import Valve from './Components/Valve';

function App() {

  return (
    <div>
      <Graphs />
      <DiagramTemplate />
      <Valve />
    </div>
  );
}

export default App;
