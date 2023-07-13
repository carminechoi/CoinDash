import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	coins: [],
	dashboardCoins: [],
};

const coinSlice = createSlice({
	name: "coin",
	initialState,
	reducers: {
		setCoins: (state, { payload }) => {
			state.coins = payload;
		},
		setDashboardCoins: (state, { payload }) => {
			state.dashboardCoins = payload;
		},
	},
});

export default coinSlice.reducer;

export const { setCoins, setDashboardCoins } = coinSlice.actions;
