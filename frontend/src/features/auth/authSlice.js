import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authActions";

// initialize accessToken from local storage
const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const initialState = {
    loading: false,
    success: false,
    error: null,
    accessToken: accessToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("accessToken"); // delete token from storage
            state.loading = false;
            state.success = false;
            state.error = null;
            state.accessToken = null;
        },
    },
    // extraReducers: (builder) => {
    //     // register reducers
    //     builder.addCase(register.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     });
    //     builder.addCase(register.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.success = true;
    //         state.accessToken = action.payload;
    //     });
    //     builder.addCase(register.rejected, (state, action) => {
    //         state.loading = false;
    //         state.success = false;
    //         state.error = action.payload;
    //     });

    //     // login reducers
    //     builder.addCase(login.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     });
    //     builder.addCase(login.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.success = true;
    //         state.accessToken = action.payload;
    //     });
    //     builder.addCase(login.rejected, (state, action) => {
    //         state.loading = false;
    //         state.success = false;
    //         state.error = action.payload;
    //     });
    // },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
