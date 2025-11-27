import React, { useEffect } from 'react';
import { useStore } from '../store/store';

// PUBLIC_INTERFACE
// Toasts renders transient messages from the global store.
export default function Toasts() {
  /** This is a public function component. */
  const { state, dispatch } = useStore();
  useEffect(() => {
    const timers = state.toasts.map((t) =>
      setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id: t.id }), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [state.toasts, dispatch]);

  if (!state.toasts.length) return null;
  return (
    <div style={containerStyle} aria-live="polite" aria-atomic="true">
      {state.toasts.map((t) => (
        <div key={t.id} style={{ ...toastStyle, borderLeftColor: colorByType(t.type) }}>
          <strong style={{ textTransform: 'capitalize' }}>{t.type || 'info'}</strong>
          <div>{t.message}</div>
          <button onClick={() => dispatch({ type: 'REMOVE_TOAST', id: t.id })} style={closeBtnStyle} aria-label="Close">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function colorByType(type) {
  switch ((type || '').toLowerCase()) {
    case 'success':
      return '#28a745';
    case 'warning':
      return '#ffc107';
    case 'error':
      return '#dc3545';
    default:
      return '#17a2b8';
  }
}

const containerStyle = {
  position: 'fixed',
  right: 16,
  bottom: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  zIndex: 1000,
};

const toastStyle = {
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  borderRadius: 8,
  padding: '10px 12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  borderLeft: '4px solid',
  minWidth: 240,
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 6,
  right: 8,
  border: 'none',
  background: 'transparent',
  color: 'var(--text-primary)',
  fontSize: 16,
  cursor: 'pointer',
};
