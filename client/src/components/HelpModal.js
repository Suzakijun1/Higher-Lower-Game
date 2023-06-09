import React from 'react';

const Modal = ({ isOpen, onClose, wins, losses, totalGames,highestStreak, avgStreak, mostPlayed, favoriteHero, }) => {
  

  return (
    <div id="defaultModal" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className='bg-gray-800 rounded-lg shadow-xl p-4 w-96 border-size 30px'>
        <div className="flex justify-end">
          <button
            data-modal-hide="defaultModal"
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-2 textAlign text-center">
            
        <h1 className="text-xl" style={{ fontFamily: 'Luckiest Guy, Cursive',  fontSize: '34px' }}>HOW TO PLAY</h1>
        <br></br>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '20px',color:''}}>Choose between the Higher Lower or Draft game to start. </p><br></br>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '30px'}}>Draft:  </p>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '20px'}}>You will be prompted with two characters to select from in order to build a team of 5 each with their own individual stats. Once your team is drafted you will go head to head with another team and choose which attack you would like to use and with which character in order to reduce their health to zero!  </p><br></br>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '30px'}}>Higher Lower:  </p>
          <p className="text-sm" style={{ fontFamily: 'VT323, Monospace', fontSize: '20px'}}>You will be given 2 heroes and are prompted to choose whether the given heroes listed attribute is higher or lower than the other heroes same attribute.  </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

//bg-red rounded-lg shadow-lg p-4 w-96 border-size px