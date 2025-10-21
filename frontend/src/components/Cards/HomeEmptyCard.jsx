import React from 'react';
import AddNoNotesWhenLogin from '../../assets/add-notes.svg';

const HomeEmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-150  px-4   animate-fade-in">
      <img
        src={AddNoNotesWhenLogin}
        alt="No notes"
        className="w-60 md:w-72 mb-6 drop-shadow-md transition-transform hover:scale-105"
      />

      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-4">
        Start Your First Note
      </h2>

      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-1">
        Click the <span className="font-semibold text-blue-600">+ Add</span> button below to jot down your thoughts,
      </p>
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl">
        ideas, and reminders. Let's get started 🚀
      </p>
    </div>
  );
};

export default HomeEmptyCard;
