import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./userSlice";

const BASE_URL = process.env.SERVER_ENPOINT;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/users`,
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "user",
                credentials: "include",
            }),
            transformResponse: (result) => result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {}
            },
        }),
    }),
});
