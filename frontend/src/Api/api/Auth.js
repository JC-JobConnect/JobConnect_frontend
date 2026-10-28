
import api from "./Api";

export async function registerUser(formData) {
  const response = await api.post("register/", {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirm_password,
  });

  return response.data;
}

export async function loginUser(username, password) {
  const response = await api.post("token/", {
    username,
    password,
  });

  const { access, refresh } = response.data;

  sessionStorage.setItem("access_token", access);
  sessionStorage.setItem("refresh_token", refresh);

  window.dispatchEvent(new Event("authChanged"));

  return response.data;
}

export function logoutUser() {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");

  window.dispatchEvent(new Event("authChanged"));
}

export async function getCurrentUser() {
  const response = await api.get("me/");
  return response.data;
}
