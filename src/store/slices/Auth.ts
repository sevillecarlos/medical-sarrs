import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  error: null,
  status: "idle",
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm: any) => {
    const res = axios.post("http://127.0.0.1:5000/api/v1/users", signInForm);
    const { token } = (await res).data;
    return token;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignIn.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        localStorage.setItem("@$token", action.payload);
      }
    );
    builder.addCase(fetchSignIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.status = "reject";
    });
  },
});

export const authAction = authSlice.actions;
export default authSlice;
