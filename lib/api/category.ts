import { nextApi } from "./api";

type CategoryType = "income" | "expense";

export const fetchCategories = async (params: {
  type?: CategoryType;
}): Promise<unknown> => {
  const response = await nextApi.get<unknown>("/categories", { params });

  return response.data;
};
