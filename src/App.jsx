import React, { useEffect, useState, useRef } from 'react';
import Graphs from './Components/Graphs';
import DiagramTemplate from './Components/DiagramTemplate';
import './App.css';
function App() {

  return (
    <div className="dashboard-layout">
      <DiagramTemplate />
      <div className="side-panel">
        <Graphs />
      </div>
    </div>
  );
}

export default App;
