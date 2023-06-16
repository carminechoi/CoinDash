import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../utils/reauthUtils";
import { setWallets } from "./walletSlice";

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
		getUserWallets: builder.mutation({
			query: () => ({
				url: "/all",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setWallets(data));
				} catch (e) {
					dispatch(setWallets([]));
				}
			},
		}),
		addNewWallet: builder.mutation({
			query: (payload) => ({
				url: "/add",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setWallets(data));
				} catch (e) {
					dispatch(setWallets([]));
				}
			},
		}),
	}),
});

export const {
	useGetWalletTypesQuery,
	useGetUserWalletsMutation,
	useAddNewWalletMutation,
} = walletApi;
