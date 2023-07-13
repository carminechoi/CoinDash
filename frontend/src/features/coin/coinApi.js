import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../utils/reauthUtils";
import { setCoins, setDashboardCoins } from "./coinSlice";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/coins`,
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

export const coinApi = createApi({
	reducerPath: "coinApi",
	baseQuery: createBaseQueryWithReauth(baseQuery),
	endpoints: (builder) => ({
		getAllCoins: builder.mutation({
			query: () => ({
				url: "/all",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCoins(data));
				} catch (e) {
					dispatch(setCoins([]));
				}
			},
		}),
		getDashboardCoins: builder.mutation({
			query: () => ({
				url: "dashboard",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setDashboardCoins(data));
				} catch (e) {
					dispatch(setDashboardCoins([]));
				}
			},
		}),
	}),
});

export const { useGetAllCoinsMutation, useGetDashboardCoinsMutation } = coinApi;
