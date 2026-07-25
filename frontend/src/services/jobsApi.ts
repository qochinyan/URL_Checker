import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const jobsApi = {
  createJob: (urls: string[]) => axios.post(`${API_BASE}/jobs`, { urls }),
  getJobs: () => axios.get(`${API_BASE}/jobs`),
  getJobDetail: (id: string) => axios.get(`${API_BASE}/jobs/${id}`),
  cancelJob: (id: string) => axios.delete(`${API_BASE}/jobs/${id}`),
};
