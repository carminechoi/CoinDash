import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userApi } from "../features/user/userApi";
import { coinApi } from "../features/coin/coinApi";
import { walletApi } from "../features/wallet/walletApi";
import { newsApi } from "../features/news/newsApi";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import coinReducer from "../features/coin/coinSlice";
import walletReducer from "../features/wallet/walletSlice";
import newsReducer from "../features/news/newsSlice";

export default configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[coinApi.reducerPath]: coinApi.reducer,
		[walletApi.reducerPath]: walletApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		authState: authReducer,
		userState: userReducer,
		coinState: coinReducer,
		walletState: walletReducer,
		newsState: newsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			userApi.middleware,
			coinApi.middleware,
			walletApi.middleware,
			newsApi.middleware,
		]),
});
