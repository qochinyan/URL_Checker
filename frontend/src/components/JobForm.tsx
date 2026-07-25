import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob, fetchJobs } from '../redux/slices/jobsSlice';
import type { AppDispatch } from '../redux/store';

export const JobForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() !== '') {
      await dispatch(createJob([url]));
      dispatch(fetchJobs());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', background: 'var(--surface-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to check..."
        style={{
          width: '100%',
          background: 'var(--bg-dark)',
          color: 'var(--text-main)',
          border: '1px solid var(--border)',
          padding: '0.75rem',
          borderRadius: '4px',
          fontFamily: 'JetBrains Mono',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />
      <button type="submit" style={{ marginTop: '0.75rem', width: '100%' }}>Initialize New Check</button>
    </form>
  );
};