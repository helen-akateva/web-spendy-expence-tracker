import { nextApi } from "@/lib/api/api";
import { UserData } from "../stores/authStore";

export const authApi = {
	register: async (payload: {
		email: string;
		password: string;
		name: string;
	}): Promise<UserData> => {
		const { data } = await nextApi.post<UserData>(
			"/api/auth/register",
			payload
		);
		return data;
	},

	login: async (payload: {
		email: string;
		password: string;
	}): Promise<UserData> => {
		const { data } = await nextApi.post<UserData>("/api/auth/login", payload);
		return data;
	},

	logout: async (): Promise<void> => {
		await nextApi.post("/api/auth/logout");
	},

	refresh: async (): Promise<boolean> => {
		const { data } = await nextApi.post<{ success: boolean }>(
			"/api/auth/refresh",
			{}
		);

		return data.success;
	},
};
