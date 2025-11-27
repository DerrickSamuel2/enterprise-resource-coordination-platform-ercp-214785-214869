# ERCP Monolithic React Application

A lightweight React (CRA) frontend scaffolding core pages and routes for ERCP: Tasks, Workflows, Resources, Integrations, Reports, Audit, Settings, and Health. Includes a layout shell, feature flag support, global error boundary, a simple toast system, and an API client reading environment variables.

## Quick Start

- `npm start` — run in development
- `npm test` — run tests
- `npm run build` — production build

Open http://localhost:3000

## Core Structure

- `src/routes/AppRouter.js` — route definitions with code splitting (React.lazy)
- `src/components/Layout.js` — responsive shell with topbar and sidebar navigation
- `src/components/ErrorBoundary.js` — global error catcher
- `src/components/Toasts.js` — lightweight global toast alerts
- `src/store/store.js` — simple context-based global store (feature flags, toasts)
- `src/services/apiClient.js` — API client using env vars for base URL and health check
- `src/pages/*` — placeholder pages for each section

## Routes

- `/` Home
- `/tasks`
- `/workflows` (visibility controlled by feature flags)
- `/resources`
- `/integrations`
- `/reports` (visibility controlled by feature flags)
- `/audit`
- `/settings`
- `/health`

## Environment Variables

The following variables are referenced. Provide them in `.env` as needed (do not commit secrets):

- `REACT_APP_API_BASE` — Preferred base URL for backend API.
- `REACT_APP_BACKEND_URL` — Fallback base URL if API_BASE is not set.
- `REACT_APP_FRONTEND_URL` — Optional, for future use (links, metadata).
- `REACT_APP_WS_URL` — Optional, for future realtime features.
- `REACT_APP_NODE_ENV` — Environment name.
- `REACT_APP_NEXT_TELEMETRY_DISABLED` — Not used by CRA, safe to leave.
- `REACT_APP_ENABLE_SOURCE_MAPS` — Enable/disable source maps.
- `REACT_APP_PORT` — Dev server port (CRA uses 3000 by default).
- `REACT_APP_TRUST_PROXY` — Optional.
- `REACT_APP_LOG_LEVEL` — Optional logging level (future use).
- `REACT_APP_HEALTHCHECK_PATH` — Health endpoint path (default `/health`).
- `REACT_APP_FEATURE_FLAGS` — Controls feature visibility (see below).
- `REACT_APP_EXPERIMENTS_ENABLED` — Enables experiment toggles.

### Feature Flags

`REACT_APP_FEATURE_FLAGS` accepts:
- Comma-separated list: `workflows,reports`
- JSON array: `["workflows","reports"]`
- JSON object: `{"workflows": true, "reports": false}`

Visibility:
- Workflows route hidden if `workflows` flag is explicitly `false`
- Reports route hidden if `reports` flag is explicitly `false`

### Health Check

The Health page calls the configured endpoint using:
- `REACT_APP_HEALTHCHECK_PATH` (default `/health`)
- Base URL from `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL`

## Extending Pages

- Add a new file under `src/pages/YourPage.js`
- Export a default React component
- Register a route in `src/routes/AppRouter.js`
- Add navigation links in `src/components/Layout.js`

## Styling

- Base theme is defined in `src/App.css` with CSS variables supporting light/dark mode.
- Layout styles in `src/components/layout.css`

## Notes

- This project intentionally avoids heavy UI frameworks.
- No backend logic is included; API endpoints are assumed to be available at the configured base URL.
