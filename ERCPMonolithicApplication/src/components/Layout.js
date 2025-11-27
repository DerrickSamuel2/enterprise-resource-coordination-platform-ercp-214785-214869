import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store/store';
import './layout.css';

// PUBLIC_INTERFACE
// Layout provides the responsive shell with sidebar and top navigation.
export default function Layout({ children }) {
  /** This is a public function component that renders the app layout. */
  const { state } = useStore();
  const flags = state.featureFlags || {};

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">ERCP</div>
        <nav className="topnav">
          <NavLink to="/" end className="toplink">Home</NavLink>
          <NavLink to="/health" className="toplink">Health</NavLink>
          <NavLink to="/settings" className="toplink">Settings</NavLink>
        </nav>
      </header>

      <div className="content-wrap">
        <aside className="sidebar">
          <nav className="sidenav">
            <NavLink to="/tasks" className="sidelink">Tasks</NavLink>
            {flags['workflows'] !== false && (
              <NavLink to="/workflows" className="sidelink">Workflows</NavLink>
            )}
            <NavLink to="/resources" className="sidelink">Resources</NavLink>
            <NavLink to="/integrations" className="sidelink">Integrations</NavLink>
            {flags['reports'] !== false && (
              <NavLink to="/reports" className="sidelink">Reports</NavLink>
            )}
            <NavLink to="/audit" className="sidelink">Audit</NavLink>
          </nav>
        </aside>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
