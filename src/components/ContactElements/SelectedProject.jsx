import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

export default function SelectedProject({ project, onDelete, onEdit }) {
  if (!project) {
    return <p className="ml-96 mt-16 text-stone-500">No project selected</p>;
  }

  return (
    <div className="w-[35rem] mt-16 ml-96">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.name || 'No Name Provided'}
          </h1>
          <div className="space-x-2">
            {onEdit && (
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onEdit(project.id)}
              >
                Edit
              </button>
            )}
            <Button
             
              onClick={() => onDelete(project.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        <p className="mb-4 text-stone-400">
          {project.date || 'No Date Provided'}
        </p>
        <h2 className="text-black">
          {project.phone_Number || 'No Phone Number Provided'}
        </h2>
      </header>
    </div>
  );
}
