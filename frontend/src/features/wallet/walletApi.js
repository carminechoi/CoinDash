import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const walletApi = createApi({
    reducerPath: "walletApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/wallet`,
    }),
    endpoints: (builder) => ({
        getWalletTypes: builder.query({
            query: (user) => ({
                url: "/types",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetWalletTypesQuery } = walletApi;
