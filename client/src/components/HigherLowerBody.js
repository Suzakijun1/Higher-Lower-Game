import React from "react";

const HigherLowerBody = ({
  heroOneId,
  heroTwoId,
  heroOneResults,
  heroTwoResults,
  powerStat,
  score,
  highscore,
  handleAnswer,
}) => {
  return (
    <div className="mt-8  h-screen">
      <h2 className="tracking-widest heading-3 text-2xl font-bold mb-4 text-center">
        Current Score: {score} / Highscore: {highscore}
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 ">
        <div className="bg-gray-800 bg-opacity-60 border border-gray-400 rounded-lg p-4 flex flex-col items-center  shadow-xl shadow-blue-500/50 col-span-1">
          <h3 className="tracking-widest heading-3 text-2xl font-bold mb-4">
            Hero One: {heroOneResults.data?.hero?.name}
          </h3>
          {heroOneResults.data && heroOneResults.data.hero && (
            <img
              className="w-40 rounded-lg mb-4"
              src={heroOneResults.data.hero.image.url}
              alt="Hero One"
            />
          )}
        </div>

        <div className="tracking-widest heading-3 bg-gray-800 bg-opacity-60 bg-opacity-60 border border-gray-400 rounded-lg p-4 flex flex-col items-center shadow-xl shadow-blue-500/50">
          <h3 className="text-2xl font-bold mb-4">
            Hero Two: {heroTwoResults.data?.hero?.name}
          </h3>

          {heroTwoResults.data && heroTwoResults.data.hero && (
            <img
              className="w-40 rounded-lg mb-4"
              src={heroTwoResults.data.hero.image.url}
              alt="Hero Two"
            />
          )}

          <div className="flex gap-4">
            <button
              className="tracking-widest heading-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAnswer("higher")}
            >
              Higher
            </button>
            <button
              className="tracking-widest heading-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAnswer("lower")}
            >
              Lower
            </button>
          </div>
          <p className="heading-3 text-lg mt-4 tracking-wide">
            Choose whether the{" "}
            <strong className="font-bold">{powerStat}</strong> of Hero Two is
            higher or lower than Hero One.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HigherLowerBody;
