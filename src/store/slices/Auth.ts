import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  token: null,
  error: null,
  status: "idle",
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm: any) => {
    try {
      const res = axios.post(
        "http://127.0.0.1:5000/api/v1/sessions",
        signInForm
      );
      const token = (await res).data;
      return token;
    } catch (error) {
      return error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearToken(state) {
      localStorage.removeItem("@$token");
      state.token = null;
    },
    getToken(state) {
      const token: any = localStorage.getItem("@$token");
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignIn.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        const { token, reason } = action.payload;
        if (token) {
          localStorage.setItem("@$token", token);
          state.token = token;
        } else {
          state.error = null;
          state.error = reason;
        }
      }
    );
    builder.addCase(fetchSignIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });
  },
});

export const authAction = authSlice.actions;
export default authSlice;
