import React from 'react';

const Modal = ({ isOpen, onClose, wins, losses, totalGames,highestStreak, avgStreak, mostPlayed, favoriteHero, }) => {
  

  return (
    <div id="defaultModal" className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-end">
          <button
            data-modal-hide="defaultModal"
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-2">
          <h1>User Stats</h1>
          <p>Wins: {wins}</p>
          <p>Losses: {losses}</p>
          <p>Total Games Played: {totalGames}</p>
          <p>Highest Streak: {highestStreak}</p>
          <p>Average Streak: {avgStreak}</p>
          <p>Most Played: {mostPlayed}</p>
          <p>Favorite Hero: {favoriteHero}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
