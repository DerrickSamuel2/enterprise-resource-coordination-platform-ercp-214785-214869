import React from 'react';
import { useStore } from '../store/store';

// PUBLIC_INTERFACE
export default function Home() {
  /** This is a public function component for Home page. */
  const { state } = useStore();
  const apiBase =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim()) ||
    (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) ||
    '';
  return (
    <div>
      <h1>Welcome to ERCP</h1>
      <p>Centralized platform for task management, workflow automation, resource planning, integrations, reporting, and audit/compliance.</p>
      <ul>
        <li>API Base: <code>{apiBase || '(not set)'}</code></li>
        <li>Experiments Enabled: <strong>{String(state.experimentsEnabled)}</strong></li>
        <li>Feature Flags: <code>{JSON.stringify(state.featureFlags)}</code></li>
      </ul>
    </div>
  );
}
