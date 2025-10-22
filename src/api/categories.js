import api from "@/utils/api";

export async function fetchCategories() {
  try {
    const res = await api.get("/users/category");
    return res.data.categories || [];
  } catch (error) {
    const msg = error?.response?.data?.detail || error?.message || "Error";
    throw new Error(msg);
  }
}
