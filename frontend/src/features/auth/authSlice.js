import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authActions";

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
        setUser: (state, payload) => {
            state.userId = payload.userId;
            state.email = payload.email;
        },
        removeUser: (state) => {
            state.userId = "";
            state.email = "";
        },
    },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
