const isProduction = window.location.hostname !== 'localhost'; // Check if it's not localhost

export const baseURL = isProduction 
  ? 'https://portfolio-backend-galc.onrender.com'   
  : 'http://localhost:4000';