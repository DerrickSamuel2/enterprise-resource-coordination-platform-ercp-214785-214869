//
// PUBLIC_INTERFACE
// apiClient provides a lightweight wrapper around fetch using environment variables for base URLs
// Reads REACT_APP_API_BASE first, falls back to REACT_APP_BACKEND_URL
//

const API_BASE =
  (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim()) ||
  (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) ||
  '';

/**
 * Build a full URL relative to the configured base.
 * PUBLIC_INTERFACE
 * @param {string} path - path beginning with / or relative path
 * @returns {string}
 */
export function buildUrl(path = '') {
  /** This is a public function that builds a URL against the API base. */
  if (!path) return API_BASE;
  if (path.startsWith('http')) return path;
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * PUBLIC_INTERFACE
 * Perform a GET request.
 * @param {string} path - API path
 * @param {RequestInit} options - fetch options
 */
export async function apiGet(path, options = {}) {
  /** This is a public function. */
  const res = await fetch(buildUrl(path), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  return handleResponse(res);
}

/**
 * PUBLIC_INTERFACE
 * Perform a POST request.
 */
export async function apiPost(path, body = {}, options = {}) {
  /** This is a public function. */
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse(res);
}

/**
 * PUBLIC_INTERFACE
 * Perform a health check using REACT_APP_HEALTHCHECK_PATH if provided, otherwise /health.
 */
export async function healthCheck() {
  /** This is a public function. */
  const healthPath =
    (process.env.REACT_APP_HEALTHCHECK_PATH && process.env.REACT_APP_HEALTHCHECK_PATH.trim()) ||
    '/health';
  try {
    const res = await fetch(buildUrl(healthPath), { method: 'GET' });
    if (!res.ok) {
      return { ok: false, status: res.status, message: 'Unhealthy' };
    }
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    return { ok: true, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, message: e?.message || 'Network error' };
  }
}

async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const err = new Error((data && (data.message || data.error)) || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export default {
  buildUrl,
  get: apiGet,
  post: apiPost,
  healthCheck,
};
