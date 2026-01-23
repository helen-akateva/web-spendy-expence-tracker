// import axios, { AxiosError } from "axios";

// export type ApiError = AxiosError<{ error: string }>;

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const nextApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

import axios, { AxiosError } from "axios";
import { LoginRequest, LoginResponse } from "../types/user";
const NEXT_API = process.env.NEXT_PUBLIC_API_URL;

export type ApiError = AxiosError<{ error: string }>;
export const nextApi = axios.create({
  baseURL: NEXT_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export async function loginUser(
  userData: LoginRequest,
): Promise<LoginResponse> {
  console.log(NEXT_API);
  const res = await nextApi.post<LoginResponse>("/auth/login", userData);
  return res.data;
}
