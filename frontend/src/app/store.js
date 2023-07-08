import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userApi } from "../features/user/userApi";
import { coinApi } from "../features/coin/coinApi";
import { walletApi } from "../features/wallet/walletApi";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import coinReducer from "../features/coin/coinSlice";
import walletReducer from "../features/wallet/walletSlice";

export default configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[coinApi.reducerPath]: coinApi.reducer,
		[walletApi.reducerPath]: walletApi.reducer,
		authState: authReducer,
		userState: userReducer,
		coinState: coinReducer,
		walletState: walletReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			userApi.middleware,
			coinApi.middleware,
			walletApi.middleware,
		]),
});
