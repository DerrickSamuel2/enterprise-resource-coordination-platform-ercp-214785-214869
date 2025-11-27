import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/apiClient';
import { useStore } from '../store/store';

// PUBLIC_INTERFACE
export default function Tasks() {
  /** This is a public function component for Tasks page. */
  const { dispatch } = useStore();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await apiGet('/tasks');
        if (mounted) {
          setTasks(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        setErr(e);
        dispatch({ type: 'ADD_TOAST', toast: { type: 'error', message: `Failed to load tasks: ${e.message}` } });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [dispatch]);

  return (
    <div>
      <h1>Tasks</h1>
      <p>Manage creation, assignment, prioritization, and progress tracking.</p>
      {loading && <p>Loading tasks...</p>}
      {err && <p style={{ color: '#dc3545' }}>Error: {String(err.message || err)}</p>}
      {!loading && !err && (
        <ul>
          {tasks.length ? tasks.map((t, idx) => (
            <li key={t.id || idx}>
              <strong>{t.title || `Task #${idx + 1}`}</strong>{' '}
              <em>{t.status || 'pending'}</em>
            </li>
          )) : <li>No tasks found.</li>}
        </ul>
      )}
    </div>
  );
}
