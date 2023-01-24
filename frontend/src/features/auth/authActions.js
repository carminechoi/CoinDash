import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000";

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }, thunkAPI) => {
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let {
                data: { data },
            } = await axios.post(
                `${API_URL}/api/auth/register`,
                { email, password },
                config
            );

            localStorage.setItem("userToken", data.userToken);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let {
                data: { data },
            } = await axios.post(
                `${API_URL}/api/auth/login`,
                { email, password },
                config
            );

            localStorage.setItem("userToken", data.data.userToken);

            return data.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
});
