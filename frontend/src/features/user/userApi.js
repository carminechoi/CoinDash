import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthDetails, removeAuthDetails } from "../auth/authSlice";
import { setUserDetails, removeUserDetails } from "./userSlice";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users`,
    prepareHeaders: (headers, { getState }) => {
        let accessToken = getState().authState.accessToken;
        if (!accessToken) {
            accessToken = localStorage.getItem("accessToken");
        }
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }

        return headers;
    },
    credentials: "include",
});

// On 401 Unauthorized error, send an additional request to refresh an access token and retry initial query
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Try to get a new token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult.data) {
            // Store new token
            api.dispatch(setAuthDetails(refreshResult.data));
            // Retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(removeAuthDetails());
            api.dispatch(removeUserDetails());
        }
    }
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
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
                } catch (e) {}
            },
        }),
    }),
});

export const { useGetUserDetailsMutation } = userApi;
