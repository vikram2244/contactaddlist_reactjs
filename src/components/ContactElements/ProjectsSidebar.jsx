import React from 'react';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

export default function ProjectsSidebar({ onStartAddProject, projects, onSelectProject, selectedProjectId }) {
    return (
        <>
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl absolute">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 bg-black">
                Contacts
            </h2>
            <div>
                <Button onClick={onStartAddProject}>+ Add Contact</Button>
            </div>
            {/* Add overflow and max height for the scrollable list */}
            <ul className="mt-8 max-h-[70vh] overflow-y-auto">
                {(projects || []).map((project, index) => {
                    let cssClasses = "w-full text-left px-2 py-3 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
                    if (project.id === selectedProjectId) {
                        cssClasses += ' bg-stone-800 text-stone-200';
                    } else {
                        cssClasses += ' text-stone-400';
                    }
                    return (
                        <li key={project.id || index}>
                            <button
                                className={cssClasses}
                                onClick={() => onSelectProject(project.id)}
                            >
                                {project.name || "Unnamed Project"}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className='mt-52 ml-20 relative'><Link className='text-black' to="/login">
            <Button>Logout</Button></Link></div>
        </aside>
        </>
    );
}
