const API_BASE = "/api";

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getHeaders(),
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const authAPI = {
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/auth/me"),
  createAdmin: (body) => request("/auth/create-admin", { method: "POST", body: JSON.stringify(body) }),
};

export const doctorsAPI = {
  getAll: () => request("/doctors"),
  getById: (id) => request(`/doctors/${id}`),
  create: (body) => request("/doctors", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/doctors/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/doctors/${id}`, { method: "DELETE" }),
};

export const patientsAPI = {
  getAll: () => request("/patients"),
  getById: (id) => request(`/patients/${id}`),
  create: (body) => request("/patients", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/patients/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/patients/${id}`, { method: "DELETE" }),
};

export const appointmentsAPI = {
  getAll: (params) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/appointments${query}`);
  },
  getById: (id) => request(`/appointments/${id}`),
  create: (body) => request("/appointments", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/appointments/${id}`, { method: "DELETE" }),
  updateStatus: (id, status) =>
    request(`/appointments/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

export const notificationsAPI = {
  getAll: () => request("/notifications"),
  markRead: (id) => request(`/notifications/${id}/read`, { method: "PATCH" }),
};

export const dashboardAPI = {
  getStats: () => request("/dashboard/stats"),
};
