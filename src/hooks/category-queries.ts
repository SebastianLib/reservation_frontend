import { BusinessApi } from "@/app/api/business-api";
import { CategoriesApi } from "@/app/api/categories";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const categoriesKeys = {
  allCategories: ["categories"],
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoriesKeys.allCategories,
    queryFn: () => CategoriesApi.getAllCategories(),
    enabled: true, // Możesz ustawić na false, jeśli chcesz, aby zapytanie było wyłączone domyślnie
  });
}
