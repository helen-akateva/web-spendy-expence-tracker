import axios from "axios";

export const spendyApi = axios.create({
  baseURL: "https://spendy-expence-tracker-api.onrender.com",
  withCredentials: true,
});
