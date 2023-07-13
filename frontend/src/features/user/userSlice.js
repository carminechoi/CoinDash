import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userId: null,
	email: null,
	role: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserDetails: (state, { payload }) => {
			state.userId = payload.id;
			state.email = payload.email;
			state.role = payload.role;
		},
		removeUserDetails: (state) => {
			state.userId = null;
			state.email = null;
			state.role = null;
		},
	},
});

export default userSlice.reducer;

export const { setUserDetails, removeUserDetails } = userSlice.actions;
