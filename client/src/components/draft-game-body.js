import React from "react";

const DraftBody = () => {
  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      {/* HEADING */}
      <h1 className="text-2xl font-bold mb-4">Pick One</h1>

      <div className="flex gap-6 mt-4">
        {/* Left Superhero/Villain Card - Will hold image*/}
        <div className="w-40 h-40 bg-gray-200 rounded"></div>

        {/* Right Superhero/Villain Card - Will hold image */}
        <div className="w-40 h-40 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-6">
        {/* Left Column - Player */}
        <div className="flex flex-col">
          <div className="w-100 h-100 bg-gray-200"></div>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 1</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 2</span>
          </div>
          {/* Add more names here */}
        </div>

        {/* Left and right column divider "VS" */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-500">VS</h2>
        </div>

        {/* Right Column - Computer */}
        <div className="flex flex-col">
          <div className="w-100 h-100 bg-gray-200"></div>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 1</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 2</span>
          </div>
          {/* Add more names here */}
        </div>
      </div>
    </div>
  );
};

export default DraftBody;
