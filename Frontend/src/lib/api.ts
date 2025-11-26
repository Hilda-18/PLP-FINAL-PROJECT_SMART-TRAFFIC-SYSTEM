const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, opts: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}), ...authHeader() } as Record<string, string>;
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  try {
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function register(username: string, password: string, role = 'operator') {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  });
}

export async function login(username: string, password: string) {
  const res = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  if (res?.token) localStorage.setItem('token', res.token);
  return res;
}

export async function logout() {
  localStorage.removeItem('token');
}

export async function getIntersections() {
  return request('/traffic/intersections');
}

export async function getLights() {
  return request('/traffic/lights');
}

export async function patchLight(id: string, payload: { state?: string; timer?: number }) {
  return request(`/traffic/lights/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function postIntersection(payload: any) {
  return request('/traffic/intersections', { method: 'POST', body: JSON.stringify(payload) });
}

export async function initiateStkPush(payload: any) {
  return request('/payments/stkpush', { method: 'POST', body: JSON.stringify(payload) });
}

export default { register, login, logout, getIntersections, getLights, patchLight, postIntersection, initiateStkPush };
