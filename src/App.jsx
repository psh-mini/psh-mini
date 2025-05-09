import React, { useEffect, useState, useRef } from 'react';
import GraphTemplate from './Components/GraphTemplate';
import DiagramTemplate from './Components/DiagramTemplate';
import './App.css';
function App() {

  return (
    <div className="dashboard-layout">
      <div className="diagram-panel">
        <DiagramTemplate />
      </div>
      <div className="graph-panel">
        <GraphTemplate />
      </div>
    </div>
  );
}

export default App;
