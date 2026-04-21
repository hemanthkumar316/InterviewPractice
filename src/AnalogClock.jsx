import React, { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const styles = {
    clock: {
      width: "200px",
      height: "200px",
      border: "8px solid black",
      borderRadius: "50%",
      position: "relative",
      margin: "50px auto",
    },
    hand: {
      position: "absolute",
      bottom: "50%",
      left: "50%",
      transformOrigin: "bottom",
      transform: "translateX(-50%)",
    },
    hour: {
      width: "6px",
      height: "50px",
      backgroundColor: "black",
    },
    minute: {
      width: "4px",
      height: "70px",
      backgroundColor: "blue",
    },
    second: {
      width: "2px",
      height: "90px",
      backgroundColor: "red",
    },
    centerDot: {
      width: "10px",
      height: "10px",
      backgroundColor: "black",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div style={styles.clock}>
      <div
        style={{
          ...styles.hand,
          ...styles.hour,
          transform: `translateX(-50%) rotate(${hourDeg}deg)`,
        }}
      />
      <div
        style={{
          ...styles.hand,
          ...styles.minute,
          transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
        }}
      />
      <div
        style={{
          ...styles.hand,
          ...styles.second,
          transform: `translateX(-50%) rotate(${secondDeg}deg)`,
        }}
      />
      <div style={styles.centerDot}></div>
    </div>
  );
};

export default AnalogClock;