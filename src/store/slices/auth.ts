import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  token: null,
  error: null,
  msg: "",
  status: "idle",
  usernames: Array<any>(),
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
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const res = axios.get("http://127.0.0.1:5000/api/v1/users");
    const user = (await res).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (signUpForm: any) => {
    try {
      const res = axios.post("http://127.0.0.1:5000/api/v1/users", signUpForm);
      const user = (await res).data;
      return user;
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
    clearMsg(state) {
      state.msg = "";
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
        if (action.payload?.token) {
          localStorage.setItem("@$token", action.payload.token);
          state.token = action.payload.token;
        } else {
          state.error = null;
          state.error = action.payload?.reason;
        }
      }
    );
    builder.addCase(fetchSignIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.usernames = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(
      fetchSignUp.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.msg = action.payload.reason;
      }
    );
    builder.addCase(fetchSignUp.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignUp.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });
  },
});

export const authAction = authSlice.actions;
export default authSlice;
