import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patient: null,
  medicalRecords: null,
  medicalRecord: null,
  reload: false,
  reloadMedicalRecord: false,
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

export const getMedicalRecord = createAsyncThunk(
  "medical-records/getMedicalRecord",
  async () => {
    try {
      const res = axios.get(`http://127.0.0.1:5000/api/v1/medical_records`);
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);


export const createMedicalRecord = createAsyncThunk(
  "medical-records/createMedicalRecord",
  async (medical_record_info: any) => {
    try {
      const res = axios.post(
        `http://127.0.0.1:5000/api/v1/medical_records`,
        medical_record_info
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);



export const showMedicalRecord = createAsyncThunk(
  "medical-records/showMedicalRecord",
  async (patientId: any) => {
    try {
      const res = axios.get(
        `http://127.0.0.1:5000/api/v1/medical_records/${patientId}`
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const removeInfoMedicalRecord = createAsyncThunk(
  "medical-records/removeInformationMedicalRecord",
  async (medicalRecordInfo: any) => {
    try {
      const res = axios.delete(
        `http://127.0.0.1:5000/api/v1/medical_records_${medicalRecordInfo.info}/${medicalRecordInfo.id}`
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteMedicalRecord = createAsyncThunk(
  "medical-records/deleteMedicalRecord",
  async (medicalRecordInfo: any) => {
    try {
      const res = axios.delete(
        `http://127.0.0.1:5000/api/v1/medical_records/${medicalRecordInfo}`
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addMedicalRecords = createAsyncThunk(
  "medical-records/addMedicalRecordsAlergy",
  async (medicalRecordInfo: any) => {
    try {
      const res = axios.post(
        `http://127.0.0.1:5000/api/v1/medical_records_documents`,
        medicalRecordInfo.medicalRecordInfo
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: "medical-record",
  initialState,
  reducers: {
    clearReload(state) {
      state.reload = false;
    },
    clearReloadMedicalRecord(state) {
      state.reloadMedicalRecord = false;
    },
    clearPatient(state) {
      state.patient = null;
    },
  },

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

    builder.addCase(
      createMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(createMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      getMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.medicalRecords = action.payload;
      }
    );
    builder.addCase(getMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      showMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.medicalRecord = action.payload;
      }
    );
    builder.addCase(showMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(showMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      removeInfoMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reloadMedicalRecord = action.payload;
      }
    );

    builder.addCase(removeInfoMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeInfoMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      deleteMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(deleteMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });
    

    builder.addCase(
      addMedicalRecords.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reloadMedicalRecord = action.payload;
      }
    );

    builder.addCase(addMedicalRecords.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addMedicalRecords.rejected, (state) => {
      state.status = "reject";
    });

   



    
  },
});

export const medicalRecordsAction = medicalRecordsSlice.actions;
export default medicalRecordsSlice;
