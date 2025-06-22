import React from 'react';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

export default function SelectedProject({ project, onDelete, onEdit }) {
  if (!project) {
    return <p className="text-center text-gray-500">No project selected</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 md:mt-16 px-4">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-stone-600 mb-2">
            {project.name || "No Name Provided"}
          </h1>
          <button
            className="text-stone-600 hover:text-red-600 text-sm md:text-base"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400 text-sm md:text-base">
          {project.date ? project.date : "No Date Provided"}
        </p>
        <h2 className="text-black text-base md:text-lg">
          {project.phone_Number ? project.phone_Number : "No Phone Number Provided"}
        </h2>
      </header>
    </div>
  );
}