import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const spendyApi = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  withCredentials: true,
});
