import { createSlice } from "@reduxjs/toolkit";

// initialize accessToken from local storage
const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const initialState = {
    userId: null,
    email: null,
    accessToken: accessToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            if (payload && payload.user && payload.accessToken) {
                state.userId = payload.user.id ?? "";
                state.email = payload.user.email ?? "";
                state.accessToken = payload.accessToken ?? "";

                localStorage.setItem("accessToken", payload.accessToken);
            }
        },
        removeUser: (state) => {
            state.userId = "";
            state.email = "";
            state.accessToken = "";
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
