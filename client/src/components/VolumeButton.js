import React, { useState, useRef, useEffect } from "react";

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
    }
  }, [volume]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleToggleDropdown}
      >
        {isDropdownOpen ? "Volume" : isMuted ? "Unmute" : "Music"}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
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

      <audio
        ref={audioRef}
        src="../sounds/alex-productions-epic-cinematic-trailer-elite.mp3"
      ></audio>
    </div>
  );
};

export default VolumeButton;
