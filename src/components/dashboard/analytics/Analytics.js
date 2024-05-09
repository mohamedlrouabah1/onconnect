import React from 'react';
import './Analytics.css'; 

const Analytics = ({ progressRate, delayRate }) => {
  const radius = 60; 
  const strokeWidth = 15; 
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progressRate / 100) * circumference;

  return (
    <div className="progress-chart-container">
        
      <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-svg"
      >
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius+20}
          cx={radius}
          cy={radius}
        />
        {/* Foreground circle */}
        <circle
          stroke="#4e73df"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius+20}
          cy={radius+5}
          className="circle-progress"
        />
        {/* Text in the center */}
        <text
          x="50%"
          y="45%"
          dy="0.5rem"
          textAnchor="middle"
          className="progress-text"
        >
          {progressRate}%
        </text>
      </svg>
      {/* Side labels */}
      <div className="progress-labels">
        <div className="progress-label">
          <strong>{progressRate}%</strong> Progress rate
        </div>
        <div className="progress-label">
          <strong>{100 - progressRate}%</strong> Delay rate
        </div>
      </div>
    </div>
  );
};

  

export default Analytics;
