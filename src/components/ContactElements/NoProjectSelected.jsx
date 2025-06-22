import React from 'react';
import noProjectImage from '../../assets/no-projects.png';
import Button from '../Buttons/Button';

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-12 md:mt-24 text-center w-full max-w-lg mx-auto px-4">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-12 h-12 md:w-16 md:h-16 object-contain mx-auto"
      />
      <h2 className="text-lg md:text-xl font-bold text-stone-500 my-4">
        No contact selected
      </h2>
      <p className="text-stone-400 mb-4 text-sm md:text-base">
        Select a contact or get started with a new one
      </p>
      <p className="mt-6 md:mt-8">
        <Button onClick={onStartAddProject}>Create new contact</Button>
      </p>
    </div>
  );
}