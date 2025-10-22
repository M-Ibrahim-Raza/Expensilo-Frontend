import { useState, useEffect } from "react";
import { fetchCategories } from "@/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      notifyError("Error loading categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loadCategories,
  };
}
