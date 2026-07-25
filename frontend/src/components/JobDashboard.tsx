import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchJobs, setActiveJob } from '../redux/slices/jobsSlice';

export const JobDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.jobs.list);
  const activeJob = useSelector((state: RootState) => state.jobs.activeJob);

  useEffect(() => {
    dispatch(fetchJobs());
    const interval = setInterval(() => dispatch(fetchJobs()), 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <h2 style={{ marginBottom: '1rem' }}>Jobs Dashboard</h2>
      <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem', paddingRight: '0.5rem' }}>
        {jobs.slice().reverse().map((job) => (
          <div 
            key={job.id} 
            onClick={() => dispatch(setActiveJob(job))} 
            className={`job-card ${activeJob?.id === job.id ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9em', fontFamily: 'JetBrains Mono' }}><strong>ID:</strong> {job.id.slice(0, 8)}...</span>
              <span style={{ textTransform: 'uppercase', fontSize: '0.8em', fontWeight: 'bold' }}>{job.status}</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.9em', color: 'var(--text-muted)' }}>
              Progress: {job.stats.processed} / {job.stats.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};