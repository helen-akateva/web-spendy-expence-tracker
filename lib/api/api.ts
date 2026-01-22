import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3002" ||
  "http://localhost:3001";

export const nextApi = axios.create({
  baseURL: API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
