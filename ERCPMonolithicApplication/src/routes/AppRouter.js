import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import Toasts from '../components/Toasts';
import { useStore } from '../store/store';

const Home = lazy(() => import('../pages/Home'));
const Tasks = lazy(() => import('../pages/Tasks'));
const Workflows = lazy(() => import('../pages/Workflows'));
const Resources = lazy(() => import('../pages/Resources'));
const Integrations = lazy(() => import('../pages/Integrations'));
const Reports = lazy(() => import('../pages/Reports'));
const Audit = lazy(() => import('../pages/Audit'));
const Settings = lazy(() => import('../pages/Settings'));
const Health = lazy(() => import('../pages/Health'));

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** This is a public function component that wires all routes. */
  const { state } = useStore();
  const flags = state.featureFlags || {};
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              {flags['workflows'] !== false && <Route path="/workflows" element={<Workflows />} />}
              <Route path="/resources" element={<Resources />} />
              <Route path="/integrations" element={<Integrations />} />
              {flags['reports'] !== false && <Route path="/reports" element={<Reports />} />}
              <Route path="/audit" element={<Audit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/health" element={<Health />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toasts />
      </ErrorBoundary>
    </Router>
  );
}
