import { nextApi } from "@/lib/api/api";
import { UserData } from "../stores/authStore";

export const authApi = {
	register: async (payload: {
		email: string;
		password: string;
		name: string;
	}): Promise<UserData> => {
		const response = await nextApi.post<UserData>(
			"/api/auth/register",
			payload
		);

		return response.data;
	},

	login: async (payload: {
		email: string;
		password: string;
	}): Promise<UserData> => {
		const response = await nextApi.post<UserData>("/api/auth/login", payload);

		return response.data;
	},

	logout: async (): Promise<void> => {
		await nextApi.post("/api/auth/logout");
	},

	refresh: async (): Promise<UserData> => {
		const response = await nextApi.post<UserData>("/api/auth/refresh");
		return response.data;
	},
};
