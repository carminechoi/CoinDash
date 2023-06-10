import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setAuthDetails, removeAuthDetails } from "../auth/authSlice";
import { removeUserDetails } from "../user/userSlice";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

// Create a mutex instance
const mutex = new Mutex();

const authBaseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/auth`,
	credentials: "include",
});

// Define the base query function with reauthentication logic
const baseQueryWithReauth = async (args, api, extraOptions, queryFn) => {
	// Wait until the mutex is available without locking it
	await mutex.waitForUnlock();

	let result = await queryFn(args, api, extraOptions);
	console.log(result);
	if (
		result.error &&
		(result.error.status === 401 ||
			result.error.data.message === "jwt expired")
	) {
		// Check whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				// Try to get a new token
				const refreshResult = await authBaseQuery(
					"/refresh",
					api,
					extraOptions
				);
				if (refreshResult.data) {
					// Store the new token
					api.dispatch(setAuthDetails(refreshResult.data));
					// Retry the initial query
					result = await queryFn(args, api, extraOptions);
				} else {
					// If the refresh token is expired, log out the user
					api.dispatch(removeAuthDetails());
					api.dispatch(removeUserDetails());
				}
			} finally {
				// Release the mutex after finishing
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await queryFn(args, api, extraOptions);
		}
	}
	return result;
};

// Export the reusable baseQueryWithReauth function
export const createBaseQueryWithReauth =
	(baseQuery) => (args, api, extraOptions, queryFn) =>
		baseQueryWithReauth(
			args,
			api,
			extraOptions,
			(args, api, extraOptions) =>
				baseQuery(args, api, extraOptions, queryFn)
		);
