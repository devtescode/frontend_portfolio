import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '../components/utils/apiConfig';

const ProjectsContext = createContext(null);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URLS.getprojects); // Your backend URL
      const data = res.data;

      // Sort by newest first (assuming _id creation time or timestamp)
      const sorted = data.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
      setProjects(sorted);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add project locally (after upload)
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    const updated = [newProject, ...projects]; // Add to the top
    setProjects(updated);
    return newProject;
  };

  const updateProject = (id, updatedData) => {
    const updated = projects.map((p) =>
      p._id === id || p.id === id ? { ...p, ...updatedData } : p
    );
    setProjects(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p._id !== id && p.id !== id);
    setProjects(updated);
  };

  const getProject = (id) => {
    return projects.find((p) => p._id === id || p.id === id);
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    latestProjects: projects.slice(-3), // First 3 latest projects
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
