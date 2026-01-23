import { nextApi } from "./api";

export type CategoryType = "income" | "expense";

export interface Category {
  _id: string;
  name: string;
}

export type CategoriesListResponse = {
  categories: Category[];
};

export const fetchCategories = async (params: {
  type?: CategoryType;
}): Promise<Category[]> => {
  const response = await nextApi.get<CategoriesListResponse>("api/categories", {
    params,
  });

  return response.data.categories;
};
