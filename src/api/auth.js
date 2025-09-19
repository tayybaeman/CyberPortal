// src/api/auth.js
const API_BASE = "http://127.0.0.1:8000/api";

export async function registerAPI({ username, email, password }) {
  const res = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function loginAPI({ usernameOrEmail, password }) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameOrEmail, email: usernameOrEmail, password })
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export function saveTokens({ access, refresh }) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}
