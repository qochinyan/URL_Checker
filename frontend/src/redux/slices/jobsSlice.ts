import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { jobsApi } from "../../services/jobsApi";
import type { Job } from "../../../../backend/src/jobs/interfaces/job.interface";

interface JobsState {
  list: Job[];
  activeJob: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  list: [],
  activeJob: null,
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await jobsApi.getJobs();
  return response.data;
});

export const fetchJobDetail = createAsyncThunk("jobs/fetchJobDetail", async (id: string) => {
  const response = await jobsApi.getJobDetail(id);
  return response.data;
});

export const createJob = createAsyncThunk("jobs/createJob", async (urls: string[]) => {
  const response = await jobsApi.createJob(urls);
  return response.data;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setActiveJob: (state, action: PayloadAction<Job | null>) => {
      state.activeJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.activeJob = action.payload;
      });
  },
});

export const { setActiveJob } = jobsSlice.actions;
export default jobsSlice.reducer;
