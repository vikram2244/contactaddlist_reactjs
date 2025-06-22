import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import SelectedProject from '../ContactElements/SelectedProject';
import NewProject from '../ContactElements/NewProject';
import NoProjectSelected from '../ContactElements/NoProjectSelected';
import ProjectsSidebar from '../ContactElements/ProjectsSidebar';

function AddContacts({ emailLogin }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://contactaddlist springboot.onrender.com/api/contacts/${encodeURIComponent(emailLogin)}`
        );
        
        console.log('Received contacts:', response.data);
        
        const projectsArray = Array.isArray(response.data) ? response.data : [];
        
        setProjectsState((prevState) => ({
          ...prevState,
          projects: projectsArray.map(project => ({
            id: project.id,
            name: project.name,
            phone_number: project.phone_Number,
            email: project.email,
            date: project.date
          })),
          selectedProjectId: undefined
        }));
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch contacts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    if (emailLogin) fetchContacts();
  }, [emailLogin]);

  const handleSelectProject = (id) =>
    setProjectsState((prev) => ({ ...prev, selectedProjectId: id }));

  const handleStartAddProject = () =>
    setProjectsState((prev) => ({ ...prev, selectedProjectId: null }));

  const handleCancelAddProject = () =>
    setProjectsState((prev) => ({ ...prev, selectedProjectId: undefined }));

  const handleAddProject = async (projectData) => {
    const newProject = { ...projectData, id: uuidv4() };
    try {
      const response = await axios.post(
        `https://contactaddlist springboot.onrender.com/api/addcontacts/${encodeURIComponent(emailLogin)}`,
        newProject
      );
      console.log('Add project response:', response.data);
      if (response.status === 201) {
        setProjectsState((prev) => ({
          ...prev,
          selectedProjectId: undefined,
          projects: [...prev.projects, response.data || newProject],
        }));
      }
    } catch (err) {
      console.error('Add project error:', err);
      setError(`Failed to add project: ${err.message}. Please try again.`);
    }
  };

  const handleDeleteProject = async () => {
    const { selectedProjectId } = projectsState;
    if (!selectedProjectId) return;

    try {
      await axios.delete(
        `https://contactaddlist springboot.onrender.com/api/contacts/${selectedProjectId}`
      );
      setProjectsState((prev) => ({
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== selectedProjectId),
      }));
    } catch (err) {
      console.error('Delete project error:', err);
      setError(`Failed to delete project: ${err.message}. Please try again.`);
    }
  };

  const selectedProject = Array.isArray(projectsState.projects) 
    ? projectsState.projects.find((project) => project.id === projectsState.selectedProjectId)
    : null;

  let content;
  if (loading) {
    content = <p className="text-center text-gray-500">Loading contacts...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500">{error}</p>;
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;
  }

  return (
    <main className="flex flex-col md:flex-row h-screen my-8 gap-4 md:gap-8 px-4 md:px-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      <div className="flex-1">{content}</div>
    </main>
  );
}

export default AddContacts;