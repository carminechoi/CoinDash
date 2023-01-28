import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "../user/userApi";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/auth`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getUser.initiate(null));
                } catch (error) {}
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = authApi;
