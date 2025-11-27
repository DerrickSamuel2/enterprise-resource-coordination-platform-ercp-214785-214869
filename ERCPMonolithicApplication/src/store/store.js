import React, { createContext, useContext, useMemo, useReducer } from 'react';

// PUBLIC_INTERFACE
// GlobalStore provides a simple global state for feature flags and toasts, without external deps.

const initialState = {
  toasts: [], // { id, type, message }
  featureFlags: parseFeatureFlags(process.env.REACT_APP_FEATURE_FLAGS || ''),
  experimentsEnabled: parseBoolean(process.env.REACT_APP_EXPERIMENTS_ENABLED || 'false'),
};

function parseFeatureFlags(flagsString) {
  // Accept JSON or comma-separated list ("workflows,reports")
  try {
    if (flagsString.trim().startsWith('{') || flagsString.trim().startsWith('[')) {
      const parsed = JSON.parse(flagsString);
      if (Array.isArray(parsed)) {
        return Object.fromEntries(parsed.map((k) => [String(k).toLowerCase(), true]));
      }
      if (parsed && typeof parsed === 'object') {
        return Object.fromEntries(
          Object.entries(parsed).map(([k, v]) => [String(k).toLowerCase(), !!v])
        );
      }
    }
  } catch {
    // fall back to CSV
  }
  if (!flagsString) return {};
  const map = {};
  flagsString
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .forEach((k) => {
      map[k] = true;
    });
  return map;
}

function parseBoolean(v) {
  return ['1', 'true', 'yes', 'on'].includes(String(v).trim().toLowerCase());
}

const StoreContext = createContext({ state: initialState, dispatch: () => {} });

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      const toast = { id: `${Date.now()}-${Math.random()}`, type: action.toast.type, message: action.toast.message };
      return { ...state, toasts: [toast, ...state.toasts].slice(0, 5) };
    }
    case 'REMOVE_TOAST': {
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    }
    case 'SET_FLAG': {
      return {
        ...state,
        featureFlags: { ...state.featureFlags, [String(action.key).toLowerCase()]: !!action.value },
      };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function StoreProvider({ children }) {
  /** This is a public function that provides the global store. */
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  /** This is a public function to access global store. */
  return useContext(StoreContext);
}
