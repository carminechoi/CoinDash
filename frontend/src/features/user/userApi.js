import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthDetails, removeAuthDetails } from "../auth/authSlice";
import { setUserDetails, removeUserDetails } from "./userSlice";
import { Mutex } from "async-mutex";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const mutex = new Mutex();

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
            await headers.set("Authorization", `Bearer ${accessToken}`);
            console.log("headers", headers);
        }

        return headers;
    },
});

// On 401 Unauthorized error, send an additional request to refresh an access token and retry initial query
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Wait until mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Check whether mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // Try to get a new token
                const refreshResult = await baseQuery(
                    "/refresh",
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    // Store new token
                    api.dispatch(setAuthDetails(refreshResult.data));
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // If refresh token is expired, logout user
                    api.dispatch(removeAuthDetails());
                    api.dispatch(removeUserDetails());
                }
            } finally {
                // Release the mutex after finishing
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
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
