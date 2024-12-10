/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import drumSounds from "./drum-sounds";

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key);
    audio.currentTime = 0;
    audio.play();
    handleDisplay(sound.id);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === sound.key) playSound();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sound]);

  return (
    <div id={sound.id} className="drum-pad" onClick={playSound}>
      {sound.key}
      <audio id={sound.key} className="clip" src={sound.src}></audio>
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState("");

  const handleDisplay = (text) => {
    setDisplay(text);
  };

  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">
        {display || "Play a sound!"}
      </div>
      <div className="pads">
        {drumSounds.map((sound) => (
          <DrumPad key={sound.id} sound={sound} handleDisplay={handleDisplay} />
        ))}
      </div>
    </div>
  );
};

export default App;
