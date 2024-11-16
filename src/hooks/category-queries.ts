import { CategoriesApi } from "@/app/api/categories-api";
import { useQuery } from "@tanstack/react-query";


export const categoriesKeys = {
  allCategories: ["categories"],
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoriesKeys.allCategories,
    queryFn: () => CategoriesApi.getAllCategories(),
    enabled: true,
  });
}
