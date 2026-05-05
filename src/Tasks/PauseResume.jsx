import { useState, useEffect } from "react";

function PauseResume() {
  const [count, setCount] = useState(100);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let timer;

    if (!paused) {
      timer = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [paused]);

  const handlePauseResume = () => {
    setPaused(!paused);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handlePauseResume}>{paused ? "Resume" : "Pause"}</button>
    </div>
  );
}

export default PauseResume;