import api from "@/utils/api";

export async function signup(name, email, password) {
  try {
    const res = await api.post("/auth/signup", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || "Signup failed.");
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
}

export async function login(email, password) {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const res = await api.post("/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token } = res.data;
    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || "Signup failed.");
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
}

export async function verifyToken() {
  try {
    const res = await api.get("/auth/verify-token");
    return res.data;
  } catch (err) {
    console.error("Token verification failed:", err);
  }
}

export function logout() {
  localStorage.removeItem("token");
}
