import api from "./Api";

export async function registerUser(formData) {
  const response = await api.post("api/v1/register/", {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirm_password,
  });

  return response.data;
}

export async function loginUser(username, password) {
  const response = await api.post("api/token/", {
    username,
    password,
  });

  const { access, refresh } = response.data;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  window.dispatchEvent(new Event("authChanged"));

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.dispatchEvent(new Event("authChanged"));
}

export async function getCurrentUser() {
  const response = await api.get("api/me/");
  return response.data;
}