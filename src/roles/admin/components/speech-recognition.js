import React, { useState } from "react";

// Assets
import MicSvg from "../../../assets/svg/mic.svg";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SearchSpeech = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false); 
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false); 
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  return (
    <>
      {isListening ? (
        <div className="speech-indicator">Listening...</div>
      ) : (
        <img
          src={MicSvg}
          className="search-mic"
          alt="Mic Icon"
          tabIndex={0}
          onClick={startListening} 
        />
      )}
    </>
  );
};

export default SearchSpeech;
