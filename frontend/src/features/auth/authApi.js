import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, removeUser } from "./authSlice";
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
                withCredentials: true,
                credentials: "include",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (e) {}
            },
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
                withCredentials: true,
                credentials: "include",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (e) {}
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "DELETE",
                withCredentials: true,
                credentials: "include",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(removeUser());
                } catch (e) {}
            },
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
