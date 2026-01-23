import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const BACKEND_URL = process.env.API_BASE_URL;

export const spendiApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
