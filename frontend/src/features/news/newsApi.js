import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../utils/reauthUtils";
import { setNews } from "./newsSlice";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/news`,
	credentials: "include",
	prepareHeaders: async (headers, { getState }) => {
		headers.set("Accept", "application/json");

		let accessToken = getState().authState.accessToken;
		if (!accessToken) {
			accessToken = localStorage.getItem("accessToken");
		}
		if (accessToken) {
			await headers.set("Authorization", `Bearer ${accessToken}`);
		}

		return headers;
	},
});

export const newsApi = createApi({
	reducerPath: "newsApi",
	baseQuery: createBaseQueryWithReauth(baseQuery),
	endpoints: (builder) => ({
		getCryptoNews: builder.mutation({
			query: () => ({
				url: "/crypto",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setNews(data));
				} catch (e) {
					dispatch(setNews([]));
				}
			},
		}),
	}),
});

export const { useGetCryptoNewsMutation } = newsApi;
