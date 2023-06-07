import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../utils/reauthUtils";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/wallet`,
	credentials: "include",
	prepareHeaders: async (headers, { getState }) => {
		headers.set("Accept", "application/json");

		let accessToken = getState().authState.accessToken;
		if (!accessToken) {
			accessToken = localStorage.getItem("accessToken");
		}
		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}

		return headers;
	},
});

export const walletApi = createApi({
	reducerPath: "walletApi",
	baseQuery: createBaseQueryWithReauth(baseQuery),
	endpoints: (builder) => ({
		getWalletTypes: builder.query({
			query: () => ({
				url: "/types",
				method: "GET",
			}),
		}),
		addNewWallet: builder.mutation({
			query: (payload) => ({
				url: "/add",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const { useGetWalletTypesQuery, useAddNewWalletMutation } = walletApi;
