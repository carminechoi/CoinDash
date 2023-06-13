import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeAuthDetails } from "../auth/authSlice";
import { setUserDetails, removeUserDetails } from "./userSlice";
import { createBaseQueryWithReauth } from "../utils/reauthUtils";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/users`,
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

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: createBaseQueryWithReauth(baseQuery),
	endpoints: (builder) => ({
		getUserDetails: builder.mutation({
			query: () => ({
				url: "/user",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUserDetails(data));
				} catch (e) {
					dispatch(removeAuthDetails());
					dispatch(removeUserDetails());
				}
			},
		}),
	}),
});

export const { useGetUserDetailsMutation } = userApi;
