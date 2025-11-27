import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';

// PUBLIC_INTERFACE
function App() {
  /** Main application shell hosting the router and theme toggling. */
  const [theme, setTheme] = useState(() => localStorage.getItem('ercp-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ercp-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** This is a public function to toggle theme. */
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <AppRouter />
    </div>
  );
}

export default App;
