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
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URLS.getprojects); // Your backend URL
      const data = res.data;

      const sorted = data.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
      setProjects(sorted);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  // const deleteProject = (id) => {
  //   const updated = projects.filter((p) => p._id !== id && p.id !== id);
  //   setProjects(updated);
  // };

  const deleteProject = async (id) => {
    try {
      await axios.delete(API_URLS.delectprojects(id));

      // Remove project from UI after successful delete
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  // Add project locally (after upload)
  // const addProject = (project) => {
  //   const newProject = {
  //     ...project,
  //     id: Date.now().toString(),
  //   };
  //   const updated = [newProject, ...projects]; // Add to the top
  //   setProjects(updated);
  //   return newProject;
  // };


  // const updateProject = async (id, updatedData) => {
  //   const res = await axios.put(
  //     API_URLS.editprojects({ _id: id }),
  //     {
  //       projectName: data.projectName,
  //       description: data.description,
  //       url: data.url,
  //       deployLink: data.deployLink,
  //       projectcode: data.projectcode,
  //     }
  //   );

  //   setProjects((prev) =>
  //     prev.map((p) => (p._id === id ? res.data : p))
  //   );

  //   return res.data;
  // };




  const updateProject = async (id, data) => {
    try {
      const res = await axios.put(API_URLS.editprojects(id), {
        projectName: data.projectName,
        description: data.description,
        url: data.url,
        deployLink: data.deployLink,
        projectcode: data.projectcode,
      });

      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );

      return res.data;
    } catch (error) {
      console.error('Error updating project:', error);
      console.log('Error updating project:', error);
      throw error;
    }
  };






  // const getProject = (id) => {
  //   return projects.find((p) => p._id === id || p.id === id);
  // };

  const getProject = (id) => {
    if (!projects || projects.length === 0) return null;
    return projects.find((p) => p._id === id);
  };


  const value = {
    projects,
    // addProject,
    loading,
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
