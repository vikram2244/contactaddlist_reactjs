import React from 'react';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-full md:w-72 bg-stone-900 text-stone-50 px-4 md:px-8 py-8 md:py-16 rounded-xl md:rounded-r-xl fixed md:static top-0 left-0 h-screen md:h-auto z-10">
      <h2 className="mb-6 md:mb-8 font-bold uppercase text-lg md:text-xl text-stone-200">Contacts</h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Contact</Button>
      </div>
      <ul className="mt-6 md:mt-8 max-h-[60vh] overflow-y-auto">
        {(projects || []).map((project, index) => {
          const projectId = project.id || `temp-id-${index}`;
          let cssClasses =
            'w-full text-left px-2 py-2 md:py-3 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-sm md:text-base';
          if (projectId === selectedProjectId) {
            cssClasses += ' bg-stone-800 text-stone-200';
          } else {
            cssClasses += ' text-stone-400';
          }
          return (
            <li key={projectId}>
              <button className={cssClasses} onClick={() => onSelectProject(projectId)}>
                {project.name || `Contact ${index + 1}`}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 md:mt-52 flex justify-center md:justify-start">
        <Link className="text-black" to="/login">
          <Button>Logout</Button>
        </Link>
      </div>
    </aside>
  );
}