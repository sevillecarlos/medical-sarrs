import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: Array<any>(),
  msg: "",
  reload: false,
  error: null,
  status: "idle",
};

export const getPatients = createAsyncThunk("auth/getPatient", async () => {
  try {
    const res = axios.get("http://127.0.0.1:5000/api/v1/patients");
    const patients = (await res).data;
    return patients;
  } catch (error) {
    return error.response.data;
  }
});

export const createPatient = createAsyncThunk(
  "auth/createPatient",
  async (patientsData: any) => {
    try {
      const res = axios.post(
        "http://127.0.0.1:5000/api/v1/patients",
        patientsData
      );
      const patients = (await res).data;
      return patients;
    } catch (error) {
      return error.response.data;
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearReload(state) {
      state.reload = false;
    },
    clearMsg(state) {
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPatients.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.patients = action.payload;
      }
    );
    builder.addCase(getPatients.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPatients.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      createPatient.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.msg = action.payload.reason;
      }
    );
    builder.addCase(createPatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createPatient.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const appointmentAction = appointmentSlice.actions;
export default appointmentSlice;
