// import axios, { AxiosError } from "axios";

// export type ApiError = AxiosError<{ error: string }>;

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const nextApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;
export const nextApi = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
