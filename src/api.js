const rawApiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export default API_BASE_URL;
