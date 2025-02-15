function handleSelectProject(id) {
  setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: id,
  }));
}

import React from 'react';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

export default function SelectedProject({ project, onDelete }) {
if (!project) {
return <p>No project selected</p>;
}

return (
  <>
<div className="w-[35rem] mt-16 ml-96">
<header className="pb-4 mb-4 border-b-2 border-stone-300">
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-stone-600 mb-2">
      {project.name || "No Name Provided"}
    </h1>
    <button
      className="text-stone-600 hover:text-red-600"
      onClick={() => onDelete(project.id)}
    >
      Delete
    </button>
  </div>
  <p className="mb-4 text-stone-400">
    {project.date ? project.date : "No Date Provided"}
  </p>
  <h2 className="text-black">
    {project.phone_Number ? project.phone_Number : "No Phone Number Provided"}
  </h2>
</header>
</div>
</>
);
}
