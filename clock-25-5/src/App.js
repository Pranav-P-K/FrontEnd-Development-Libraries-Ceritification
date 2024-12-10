import React, { useState, useEffect } from "react";
import "./App.css";
import beepSound from "./beep.mp3";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            audioRef.current.play();
            if (onBreak) {
              setOnBreak(false);
              return sessionLength * 60;
            } else {
              setOnBreak(true);
              return breakLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, onBreak, sessionLength, breakLength]);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setOnBreak(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <div className="controls">
          <div id="break-label" className="control">
            <h2>Break Length</h2>
            <div className="control-buttons">
              <button
                id="break-decrement"
                onClick={() =>
                  setBreakLength((prev) => Math.max(1, prev - 1))
                }
              >
                -
              </button>
              <span id="break-length">{breakLength}</span>
              <button
                id="break-increment"
                onClick={() =>
                  setBreakLength((prev) => Math.min(60, prev + 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div id="session-label" className="control">
            <h2>Session Length</h2>
            <div className="control-buttons">
              <button
                id="session-decrement"
                onClick={() =>
                  setSessionLength((prev) => {
                    const newVal = Math.max(1, prev - 1);
                    if (!isRunning) setTimeLeft(newVal * 60);
                    return newVal;
                  })
                }
              >
                -
              </button>
              <span id="session-length">{sessionLength}</span>
              <button
                id="session-increment"
                onClick={() =>
                  setSessionLength((prev) => {
                    const newVal = Math.min(60, prev + 1);
                    if (!isRunning) setTimeLeft(newVal * 60);
                    return newVal;
                  })
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="timer">
          <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
          <div id="time-left">{formatTime(timeLeft)}</div>
          <div className="timer-controls">
            <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <audio id="beep" ref={audioRef} src={beepSound} />
      </div>
    </div>
  );
};

export default App;
