
import { baseURL } from "./config";
console.log('Base URL:', baseURL)

export const API_URLS = {
    adminlogin: `${baseURL}/portfolio/login`,
    getprojects:  `${baseURL}/api/projects`,
    delectprojects: (projectId) =>  ` ${baseURL}/api/projects/${projectId}`,
    editprojects: (id) => `${baseURL}/api/projects/${id}`,
    uploadimage: (id) => `${baseURL}/api/uploadimage/${id}`,
    fetchimage: `${baseURL}/api/images`,
    upload: `${baseURL}/api/upload`,
    projectNumbers: `${baseURL}/api/projectnumbers`,
    contact: `${baseURL}/portfolio/contact`
};  
