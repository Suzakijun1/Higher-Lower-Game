import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const VolumeButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [volume, setVolume] = useState(50); // initial volume value
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const isMusicPlaying = useRef(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
      isMusicPlaying.current = true;
    } else {
      isMusicPlaying.current = false;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const handleMuteToggle = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    audioRef.current.muted = muted;
  };

  useEffect(() => {
    if (isMusicPlaying.current) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, []);

  return (
    <div className="inline-block">
      <div className="flex cursor-pointer ml-3" onClick={handleToggleDropdown}>
        <div>
          <FontAwesomeIcon className="mx-3" icon={faMusic} />
        </div>

        {isDropdownOpen ? "Volume" : isMuted ? "Unmute" : "Music"}
      </div>

      {/* <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleToggleDropdown}
      >
        {isDropdownOpen ? "Volume" : isMuted ? "Unmute" : "Music"}
      </button> */}

      {isDropdownOpen && (
        <div className="absolute text-center pb-2 px-2 top-full mt-2 bg-gray-800 bg-opacity-60 border border-gray-500 rounded-md shadow-md">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="block w-full p-2"
          />

          <button
            type="button"
            onClick={handleMuteToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      )}

      <audio ref={audioRef} autoPlay>
        <source
          src="../sounds/alex-productions-epic-cinematic-trailer-elite.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default VolumeButton;
