import React from 'react';

const Modal = ({ isOpen, onClose, wins, losses, totalGames,highestStreak, avgStreak, mostPlayed, favoriteHero, }) => {
  

  return (
    <div id="defaultModal" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className='bg-red-300 rounded-lg shadow-xl p-4 w-96 border-size 30px'>
        <div className="flex justify-end">
          <button
            data-modal-hide="defaultModal"
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4 textAlign text-center">
            
        <h1 className="text-xl" style={{ fontFamily: 'Luckiest Guy, Cursive',  fontSize: '50px' }}>HOW TO PLAY</h1>
        <br></br>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '30px'}}>test how does this look like a real game test how does this look like a real game test how does this look like a real game test how does this look like a real game test how does this look like a real game</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

//bg-red rounded-lg shadow-lg p-4 w-96 border-size px