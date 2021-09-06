import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patient: null,
  reload: false,
  error: null,
  status: "idle",
};

export const getPatient = createAsyncThunk(
  "medical-records/getPatient",
  async (patientId: any) => {
    try {
      const res = axios.get(
        `http://127.0.0.1:5000/api/v1/patients/${patientId}`
      );
      const patients = (await res).data;
      return patients;
    } catch (error) {
      return error.response.data;
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: "medical-record",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatient.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.patient = action.payload;
    });
    builder.addCase(getPatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPatient.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const medicalRecordsAction = medicalRecordsSlice.actions;
export default medicalRecordsSlice;
