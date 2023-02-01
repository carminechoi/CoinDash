import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/auth`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            }),
        }),
        logoutUser: builder.mutation({
            query: (refreshToken) => ({
                url: "/logout",
                method: "POST",
                body: { refreshToken },
            }),
        }),
        getAccessToken: builder.mutation({
            query: (refreshToken) => ({
                url: "/refresh-token",
                method: "POST",
                data: { refreshToken },
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetAccessTokenMutation,
} = authApi;
