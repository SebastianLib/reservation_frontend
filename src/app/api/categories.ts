import { api } from "./client";
import { CategoryEntity } from "@/models/category";

export namespace CategoriesApi {
  export const getAllCategories = async () => {
    const res = await api.get<CategoryEntity[]>(`/categories`);
    return res.data;
  };
}
