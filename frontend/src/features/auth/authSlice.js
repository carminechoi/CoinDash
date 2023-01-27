import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authActions";

// initialize accessToken from local storage
const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const initialState = {
    loading: false,
    userInfo: null,
    accessToken: accessToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("accessToken"); // delete token from storage
            state.loading = false;
            state.userInfo = null;
            state.accessToken = null;
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
            state.accessToken = action.payload.accessToken;
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
            state.accessToken = action.payload.accessToken;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
