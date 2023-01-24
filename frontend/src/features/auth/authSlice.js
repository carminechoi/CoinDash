import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // register reducers
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.userToken = action.payload.userToken;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // login reducers
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.userToken = action.payload.userToken;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
