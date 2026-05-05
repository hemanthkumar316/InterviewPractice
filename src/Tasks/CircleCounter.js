import React, { useState } from 'react';

function Circle({ onCircleClick }) {
  const [isGray, setIsGray] = useState(false);

  function handleClick() {
    const next = !isGray;
    setIsGray(next);
    onCircleClick(next); // pass updated value directly (avoids stale state bug)
  }

  const circleStyle = {
    backgroundColor: isGray ? 'gray' : 'red',
    borderRadius: '50%',         // 50% = perfect circle (60% is slightly off)
    width: '100px',
    height: '100px',
    margin: '10px',
    cursor: 'pointer',
    display: 'inline-block',
  };

  return <div style={circleStyle} onClick={handleClick} />;
}

function CircleCounter() {
  const [numCircles, setNumCircles] = useState(0);
  const [numGrayCircles, setNumGrayCircles] = useState(0);

  function handleCircleClick(isGray) {
    setNumGrayCircles(prev => prev + (isGray ? 1 : -1));
  }

  function handleButtonClick() {
    setNumCircles(prev => prev + 1);
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Add Circle</button>
      <p>Total circles: {numCircles}</p>
      <p>Gray circles: {numGrayCircles}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {[...Array(numCircles)].map((_, index) => (
          <Circle key={index} onCircleClick={handleCircleClick} />
        ))}
      </div>
    </div>
  );
}

export default CircleCounter;
