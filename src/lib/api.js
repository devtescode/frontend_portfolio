import axios from 'axios';
import { API_URLS } from '../components/utils/apiConfig';

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

// Projects
export const fetchProjects = async () => {
  const { data } = await axios.get(API_URLS.getprojects);
  // Newest first
  return [...data].sort(
    (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
  );
};

export const createProject = async (payload) => {
  const { data } = await axios.post(API_URLS.upload, payload, {
    headers: { 'Content-Type': 'multipart/form-data', ...authHeader() },
  });
  return data;
};

export const updateProject = async ({ id, data }) => {
  const res = await axios.put(API_URLS.editprojects(id), {
    projectName: data.projectName,
    description: data.description,
    url: data.url,
    deployLink: data.deployLink,
    projectcode: data.projectcode,
  });
  return res.data;
};

export const deleteProject = async (id) => {
  await axios.delete(API_URLS.delectprojects(id));
  return id;
};

export const uploadProjectImage = async ({ id, file }) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axios.put(API_URLS.uploadimage(id), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// Auth
export const login = async ({ email, password }) => {
  const { data } = await axios.post(API_URLS.adminlogin, { email, password });
  return data;
};

// Contact
export const sendContact = async (formData) => {
  const { data } = await axios.post(API_URLS.contact, formData);
  return data;
};
