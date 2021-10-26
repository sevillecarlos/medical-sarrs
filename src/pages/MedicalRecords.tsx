import React, { useState, useEffect } from "react";
import { Table, Button, Image, FormControl } from "react-bootstrap";
import {
  getPatient,
  getMedicalRecord,
  medicalRecordsAction,
  showMedicalRecord,
  removeInfoMedicalRecord,
  addMedicalRecords,
} from "../store/slices/medicalRecords";
import { BiCommentDetail } from "react-icons/bi";

import { GrFormAdd } from "react-icons/gr";

import {
  getPatients,
  appointmentAction,
  getAppointments,
  getPatientAppointments,
  deleteAppointments,
} from "../store/slices/appointments";

import AddMedicalRecord from "../components/MedicalRecordModal/AddMedicalRecord";
import AddDocument from "../components/MedicalRecordModal/AddDocument";
import AddAlergy from "../components/MedicalRecordModal/AddAlergy";
import AddAilment from "../components/MedicalRecordModal/AddAilment";
import AddMedicines from "../components/MedicalRecordModal/AddMedicines";
import ShowDetailMedicalRecord from "../components/MedicalRecordModal/ShowDetailMedicalRecord";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import "./style/MedicalRecords.css";

interface MedicalRecordsForm {
  patient_id: string;
  blood_type: string;
  patient_photo: string | Blob;
}

const MedicalRecords = () => {
  const appointment = useSelector((state: RootStateOrAny) => state.appointment);

  const medicalRecord = useSelector(
    (state: RootStateOrAny) => state.medicalRecord
  );

  const dispatch = useDispatch();
  const [showMedicalRecordDetail, setShowMedicalRecordDetail] = useState(false);

  const [showAddMedicalRecordAlergy, setShowAddMedicalRecordAlergy] =
    useState(false);

  const [showAddMedicalRecordAilment, setShowAddMedicalRecordAilment] =
    useState(false);

  const [showAddMedicalRecordMedicine, setShowAddMedicalRecordMedicine] =
    useState(false);

  const [showModalAdd, setShowModalAdd] = useState(false);

  const [medicalRecordID, setMedicalRecordID] = useState<any>(-1);

  const [showAddDocument, setShowAddDocument] = useState(false);

  const [medicalRecordsForm, setMedicalRecordsForm] =
    useState<MedicalRecordsForm>({
      patient_id: "",
      blood_type: "",
      patient_photo: "",
    });

  const [medicalRecordInfoAlergies, setMedicalRecordInfoAlergies] = useState({
    alergy_type: "",
    alergy_to: "",
    alergy_detail: "",
  });

  const removeAppointment = (appointmentId: any) => {
    dispatch(deleteAppointments(appointmentId));
  };
  const [medicalRecordDetail, setMedicalRecordDetail] = useState<any>({});

  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    setMedicalRecords(medicalRecord.medicalRecords);
  }, [medicalRecord.medicalRecords]);

  const filterPatients = () => {
    const medicalPatientId = medicalRecord.medicalRecords?.map(
      (v: any) => v.patient_id
    );

    return appointment.patients?.filter(
      (v: any) => !medicalPatientId?.includes(v.id)
    );
  };

  const [medicalRecordInfoAilment, setMedicalRecordInfoAilment] = useState({
    ailment_type: "",
    ailment_to: "",
    ailment_detail: "",
  });

  const [medicalRecordInfoMedicine, setMedicalRecordInfoMedicine] = useState({
    medicine_type: "",
    medicine_to: "",
    medicine_detail: "",
  });

  const [medicalRecordHistoryTest, setMedicalRecordHistoryTest] = useState({
    document_prev_photo: "",
    document_photo: null,
    document_type: "",
    document_name: "",
    document_detail: "",
    document_date: "",
  });

  const handleCloseAdd = () => setShowModalAdd(false);

  const [showRemoveAppointment, setShowRemoveAppointment] = useState(false);

  const removeInfoMedicalRecords = (id: any, info: any) => {
    dispatch(removeInfoMedicalRecord({ id, info }));
  };

  useEffect(() => {
    dispatch(getAppointments());
    dispatch(appointmentAction.clearReload());
  }, [appointment.reload, dispatch]);



  const uploadHistoryTestsPhotoPrev = (e: any) => {
    const photo = e.target.files[0];
    setMedicalRecordHistoryTest((prevState: any) => {
      return { ...prevState, document_photo: photo };
    });
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e: any) => {
      setMedicalRecordHistoryTest((prevState: any) => {
        return { ...prevState, document_prev_photo: e.target.result };
      });
    };
  };

  const findPatient = (patientId: number) => {
    const [patient] = appointment.patients?.filter(
      (v: any) => v.id === patientId
    );
    return patient;
  };

  const onChangeMedRecordFormAlergies = (e: any) => {
    setMedicalRecordInfoAlergies((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeMedRecordFormAilment = (e: any) => {
    setMedicalRecordInfoAilment((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeMedRecordFormMedicines = (e: any) => {
    setMedicalRecordInfoMedicine((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeMedRecordFormHistroyTest = (e: any) => {
    setMedicalRecordHistoryTest((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeMedRecordFormHistroyTestDate = (date: any) => {
    setMedicalRecordHistoryTest((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();
      return { ...prevState, document_date: formatDate };
    });
  };

  const MedicalRecordDetail = (medicalRecord: any) => {
    setShowMedicalRecordDetail(true);
    setMedicalRecordDetail({ ...medicalRecord });
    setMedicalRecordID(medicalRecord.id);
    dispatch(showMedicalRecord(medicalRecord.id));
    dispatch(getPatientAppointments(medicalRecord.patient_id));
  };

  const addInfoMedicalRecord = (medicalFormInfo: any, info: any) => {
    setShowAddMedicalRecordAlergy(false);
    setShowAddMedicalRecordAilment(false);
    setShowAddMedicalRecordMedicine(false);
    setMedicalRecordInfoAlergies({
      alergy_type: "",
      alergy_to: "",
      alergy_detail: "",
    });
    setMedicalRecordInfoAilment({
      ailment_type: "",
      ailment_to: "",
      ailment_detail: "",
    });
    setMedicalRecordInfoMedicine({
      medicine_type: "",
      medicine_to: "",
      medicine_detail: "",
    });

    const medicalRecordInfo = {
      ...medicalFormInfo,
      medical_record_id: medicalRecordID,
    };

    dispatch(addMedicalRecords({ medicalRecordInfo, info }));
  };

  useEffect(() => {
    if (medicalRecordsForm.patient_id !== "") {
      dispatch(getPatient(medicalRecordsForm.patient_id));
    }
  }, [medicalRecordsForm, dispatch]);

  useEffect(() => {
    dispatch(getAppointments());
    dispatch(getPatients());

    dispatch(getMedicalRecord());
  }, [dispatch]);

  useEffect(() => {
    if (medicalRecord.reload) {
      dispatch(getMedicalRecord());
      dispatch(medicalRecordsAction.clearReload());
    }
  }, [medicalRecord.reload, dispatch]);

  useEffect(() => {
    if (medicalRecord.reloadMedicalRecord) {
      dispatch(showMedicalRecord(medicalRecordDetail.id));
      dispatch(medicalRecordsAction.clearReloadMedicalRecord());
    }
  }, [medicalRecord.reloadMedicalRecord, medicalRecordDetail.id, dispatch]);

  const filterMedicalRecord = (e: any) => {
    const query = e.target.value;
    if (query === "") {
      setMedicalRecords(medicalRecord.medicalRecords);
    } else {
      const d = medicalRecord.medicalRecords
        .map((v: any) => findPatient(v.patient_id))
        .filter(
          (v: any) =>
            v.first_name
              .replace(/\s/g, "")
              .toLowerCase()
              .indexOf(query.toLowerCase()) !== -1
        )
        .map((c: any) => c.id);

      const filterArray = medicalRecord.medicalRecords.filter((v: any) =>
        d.includes(v.patient_id)
      );

      setMedicalRecords(filterArray);
    }
  };

  return (
    <div>
      <AddMedicalRecord
        showModalAdd={showModalAdd}
        handleCloseAdd={handleCloseAdd}
        medicalRecordInfoAlergies={medicalRecordInfoAlergies}
        setMedicalRecordInfoAlergies={setMedicalRecordInfoAlergies}
        medicalRecordInfoAilment={medicalRecordInfoAilment}
        medicalRecordInfoMedicine={medicalRecordInfoMedicine}
        setMedicalRecordInfoAilment={setMedicalRecordInfoAilment}
        setMedicalRecordInfoMedicine={setMedicalRecordInfoMedicine}
        medicalRecordHistoryTest={medicalRecordHistoryTest}
        setMedicalRecordHistoryTest={setMedicalRecordHistoryTest}
        medicalRecordsForm={medicalRecordsForm}
        setMedicalRecordsForm={setMedicalRecordsForm}
        setShowModalAdd={setShowModalAdd}
        medicalRecord={medicalRecord}
        filterPatients={filterPatients}
        onChangeMedRecordFormAlergies={onChangeMedRecordFormAlergies}
        onChangeMedRecordFormAilment={onChangeMedRecordFormAilment}
        onChangeMedRecordFormMedicines={onChangeMedRecordFormMedicines}
        uploadHistoryTestsPhotoPrev={uploadHistoryTestsPhotoPrev}
        onChangeMedRecordFormHistroyTest={onChangeMedRecordFormHistroyTest}
        onChangeMedRecordFormHistroyTestDate={
          onChangeMedRecordFormHistroyTestDate
        }
      />

      <ShowDetailMedicalRecord
        showMedicalRecordDetail={showMedicalRecordDetail}
        setShowMedicalRecordDetail={setShowMedicalRecordDetail}
        medicalRecord={medicalRecord}
        medicalRecordDetail={medicalRecordDetail}
        findPatient={findPatient}
        removeInfoMedicalRecords={removeInfoMedicalRecords}
        setShowAddMedicalRecordAlergy={setShowAddMedicalRecordAlergy}
        setShowAddMedicalRecordAilment={setShowAddMedicalRecordAilment}
        setShowAddMedicalRecordMedicine={setShowAddMedicalRecordMedicine}
        setShowAddDocument={setShowAddDocument}
        appointment={appointment}
        showRemoveAppointment={showRemoveAppointment}
        setShowRemoveAppointment={setShowRemoveAppointment}
        removeAppointment={removeAppointment}
      />

      <AddAlergy
        showAddMedicalRecordAlergy={showAddMedicalRecordAlergy}
        setShowAddMedicalRecordAlergy={setShowAddMedicalRecordAlergy}
        onChangeMedRecordFormAlergies={onChangeMedRecordFormAlergies}
        medicalRecordInfoAlergies={medicalRecordInfoAlergies}
        addInfoMedicalRecord={addInfoMedicalRecord}
      />

      <AddAilment
        addInfoMedicalRecord={addInfoMedicalRecord}
        showAddMedicalRecordAilment={showAddMedicalRecordAilment}
        setShowAddMedicalRecordAilment={setShowAddMedicalRecordAilment}
        onChangeMedRecordFormAilment={onChangeMedRecordFormAilment}
        medicalRecordInfoAilment={medicalRecordInfoAilment}
      />

      <AddMedicines
        addInfoMedicalRecord={addInfoMedicalRecord}
        medicalRecordInfoMedicine={medicalRecordInfoMedicine}
        showAddMedicalRecordMedicine={showAddMedicalRecordMedicine}
        setShowAddMedicalRecordMedicine={setShowAddMedicalRecordMedicine}
        onChangeMedRecordFormMedicines={onChangeMedRecordFormMedicines}
      />

      <AddDocument
        onChangeMedRecordFormHistroyTestDate={
          onChangeMedRecordFormHistroyTestDate
        }
        medicalRecordID={medicalRecordID}
        setMedicalRecordHistoryTest={setMedicalRecordHistoryTest}
        onChangeMedRecordFormHistroyTest={onChangeMedRecordFormHistroyTest}
        uploadHistoryTestsPhotoPrev={uploadHistoryTestsPhotoPrev}
        showAddDocument={showAddDocument}
        setShowAddDocument={setShowAddDocument}
        medicalRecordHistoryTest={medicalRecordHistoryTest}
      />

      <Table borderless hover className="inventory-table medical-record-table">
        <thead>
          <tr>
            <th>
              <Button
                className="add-suply btn btn-table"
                onClick={() => setShowModalAdd(true)}
              >
                Add Medical Record
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              <FormControl
                autoFocus
                onChange={filterMedicalRecord}
                className="filter-input"
                placeholder="Type the name of the patient"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Name</td>
            <td>ID Number</td>
            <td>Photo</td>
            <td>More Info</td>
          </tr>
          {medicalRecords?.map((v: any) => {
            const patient = findPatient(v.patient_id);
            return (
              <tr>
                <td>
                  <strong>{`${patient?.first_name} ${patient?.last_name}`}</strong>
                </td>
                <td>{patient?.patient_id}</td>
                <td>
                  {" "}
                  <Image
                    className="patient-photo-medical-record"
                    src={v.patient_photo.url}
                    rounded
                  />{" "}
                </td>
                <td>
                  <Button
                    className="show-detail-btn"
                    onClick={() => MedicalRecordDetail(v)}
                  >
                    Show Detail <BiCommentDetail />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MedicalRecords;
