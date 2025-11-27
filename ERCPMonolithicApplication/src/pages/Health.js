import React, { useEffect, useState } from 'react';
import { healthCheck } from '../services/apiClient';

// PUBLIC_INTERFACE
export default function Health() {
  /** This is a public function component for Health page. */
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setLoading(true);
      try {
        const r = await healthCheck();
        if (mounted) setResult(r);
      } catch (e) {
        if (mounted) setErr(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      <p>Path: <code>{(process.env.REACT_APP_HEALTHCHECK_PATH && process.env.REACT_APP_HEALTHCHECK_PATH.trim()) || '/health'}</code></p>
      {loading && <p>Checking health...</p>}
      {err && <p style={{ color: '#dc3545' }}>Error: {String(err.message || err)}</p>}
      {!loading && !err && result && (
        <div>
          <p>Status: <strong style={{ color: result.ok ? '#28a745' : '#dc3545' }}>{result.ok ? 'Healthy' : 'Unhealthy'}</strong></p>
          <pre style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 8, overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
