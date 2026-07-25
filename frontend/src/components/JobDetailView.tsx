import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchJobDetail } from '../redux/slices/jobsSlice';
import { jobsApi } from '../services/jobsApi';

export const JobDetailView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeJob = useSelector((state: RootState) => state.jobs.activeJob);

  useEffect(() => {
    if (!activeJob) return;

    const interval = setInterval(() => {
      dispatch(fetchJobDetail(activeJob.id));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeJob, dispatch]);

  if (!activeJob) return <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', height: '100%' }}>Select a job to view details</div>;

  const handleCancel = async () => {
    await jobsApi.cancelJob(activeJob.id);
    dispatch(fetchJobDetail(activeJob.id));
  };

  const isTerminal = activeJob.status === 'completed' || activeJob.status === 'cancelled' || activeJob.status === 'failed';

  return (
    <div style={{ background: 'var(--surface-dark)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <h3>Job: <span style={{ fontFamily: 'JetBrains Mono' }}>{activeJob.id}</span></h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
        <p style={{ margin: 0 }}>Status: <strong style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>{activeJob.status}</strong></p>
        <button 
          onClick={handleCancel} 
          disabled={isTerminal}
          style={{ cursor: isTerminal ? 'not-allowed' : 'pointer' }}
        >
          Cancel Job
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {activeJob.urls.map((u, i) => (
            <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9em' }}>
              <div style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>{u.url}</div>
              <div style={{ marginTop: '0.25rem' }}>
                Status: {u.status} {u.httpStatus ? `(${u.httpStatus})` : ''} {u.error ? <span style={{ color: 'var(--danger)' }}>- Error: {u.error}</span> : ''}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};