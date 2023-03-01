import { createSlice } from "@reduxjs/toolkit";

// initialize accessToken from local storage
const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const initialState = {
    accessToken: accessToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthDetails: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            localStorage.setItem("accessToken", payload.accessToken);
        },
        removeAuthDetails: (state) => {
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setAuthDetails, removeAuthDetails } = authSlice.actions;
export default authSlice.reducer;
