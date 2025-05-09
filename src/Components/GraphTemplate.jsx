import React, { useState } from 'react';
import './GraphTemplate.css';
import Graphs from './Graphs';


export default function GraphTemplate() {
  const [selectedMetric, setSelectedMetric] = useState('flowrate');

  return (
    <div className="graph-template-panel">
      <h2 className="sidebar-title">UW Korn Hydro</h2>

      <div className="graph-selector">
        {['flowrate', 'current', 'valve', 'pump'].map(metric => (
          <button
            key={metric}
            className={selectedMetric === metric ? 'active' : ''}
            onClick={() => setSelectedMetric(metric)}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>

      <div className="graph-display">
        <Graphs selectedMetric={selectedMetric} />
      </div>
    </div>
  );
}
