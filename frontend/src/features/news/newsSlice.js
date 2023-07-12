import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	news: [],
};

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {
		setNews: (state, { payload }) => {
			state.news = payload;
		},
	},
});

export default newsSlice.reducer;

export const { setNews } = newsSlice.actions;
