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
        const response = await axios.get(`http://localhost:8080/api/contacts/${emailLogin}`);
        if (response.status === 200) {
          setProjectsState((prevState) => ({
            ...prevState,
            projects: response.data,
          }));
        }
      } catch (err) {
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
    console.log(newProject.id);
    try {
      const response = await axios.post(`http://localhost:8080/api/addcontacts/${emailLogin}`, newProject);
      if (response.status === 201) {
        setProjectsState((prev) => ({
          ...prev,
          selectedProjectId: undefined,
          projects: [...prev.projects, newProject],
        }));
      }
    } catch (err) {
      setError('Failed to add project. Please try again.');
    }
  };

  const handleDeleteProject = async () => {
    const { selectedProjectId } = projectsState;
    console.log(selectedProjectId);
    console.log(projectsState);
    if (!selectedProjectId) return;

    try {
      await axios.delete(`http://localhost:8080/api/contacts/${selectedProjectId}`);
      setProjectsState((prev) => ({
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== selectedProjectId),
      }));
    } catch (err) {
      setError('Failed to delete project. Please try again.');
    }
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content;
  if (loading) {
    content = <p>Loading contacts...</p>;
  } else if (error) {
    content = <p className="text-red-500">{error}</p>;
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;
  }

  return (
    <>    
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
    </>
  );
}

export default AddContacts;
