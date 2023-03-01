import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeUserDetails } from "../user/userSlice";
import { setAuthDetails, removeAuthDetails } from "./authSlice";
const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/auth`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAuthDetails(data));
                } catch (e) {}
            },
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAuthDetails(data));
                } catch (e) {}
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "DELETE",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(removeAuthDetails());
                    dispatch(removeUserDetails());
                } catch (e) {}
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetAccessTokenMutation,
} = authApi;
