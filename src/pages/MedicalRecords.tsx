import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Image,
  Form,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { getPatient } from "../store/slices/medicalRecords";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";

import { getPatients } from "../store/slices/appointments";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import DropDownFilter from "../ui/DropDownFilter";

import "./style/MedicalRecords.css";

const MedicalRecords = () => {
  const appointment = useSelector((state: RootStateOrAny) => state.appointment);

  const medicalRecord = useSelector(
    (state: RootStateOrAny) => state.medicalRecord
  );

  const dispatch = useDispatch();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [medicalRecordsForm, setMedicalRecordsForm] = useState({
    patient_id: null,
  });

  const [patientPhotoPrev, setPatientPhotoPrev] = useState<string>("");
//   const [patientPhoto, setPatientPhoto] = useState<Blob | null>(null);

  const handleCloseAdd = () => setShowModalAdd(false);

  const uploadPhotoUser = (e: any) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e: any) => {
      setPatientPhotoPrev(e.target.result);
    };
  };
  useEffect(() => {
    if (medicalRecordsForm.patient_id !== null) {
      dispatch(getPatient(medicalRecordsForm.patient_id));
    }
  }, [medicalRecordsForm, dispatch]);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  console.log(medicalRecord.patient);

  return (
    <div>
      <Modal
        show={showModalAdd}
        className="modal-add-supply"
        onHide={handleCloseAdd}
        size="lg"
        backdrop="static"
        contentClassName="modal-add-supply-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>Initial Information of New Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="basic-info"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="basic-info" title="Basic Information">
              {medicalRecord.patient === null && (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Patient</Form.Label>
                  <DropDownFilter
                    items={appointment.patients}
                    appointmentFormPatient={setMedicalRecordsForm}
                  />
                </Form.Group>
              )}
              {medicalRecord.patient !== null && (
                <div>
                  <Form.Group controlId="formFile" className="photo-container">
                    <Image
                      className="patient-photo"
                      src={patientPhotoPrev}
                      rounded
                    />{" "}
                    <Form.Control
                      type="file"
                      className="control-patient-photo"
                      onChange={uploadPhotoUser}
                    />
                  </Form.Group>
                  <div>
                    <span>Patient Name</span>
                    <h5>
                      {`${medicalRecord.patient?.first_name} 
                       ${medicalRecord.patient?.last_name}`}
                    </h5>
                    <br />
                    <span>Patient Id</span>
                    <h5>
                      {medicalRecord.patient?.patient_id?.slice(0, 4) +
                        "-" +
                        medicalRecord.patient?.patient_id?.slice(4, 8) +
                        "-" +
                        medicalRecord.patient?.patient_id?.slice(8, 15)}
                    </h5>
                    <br />
                    <span>Birth Date</span>
                    <h5>{medicalRecord.patient?.birth_date} </h5>
                    <br />
                    <span>Gender</span>
                    <h5>{medicalRecord.patient?.gender} </h5>
                    <br />
                    <span>Phone Number</span>
                    <h5>{medicalRecord.patient?.phone_number} </h5>
                    <br />
                    <span>Address</span>
                    <h5>{medicalRecord.patient?.address} </h5>
                  </div>
                  <div className="modify-patient-info-btn-container">
                    <Button className="modify-patient-info-btn">
                      Modify Patient Information{" "}
                      <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </Tab>
            <Tab eventKey="medical-info" title="Medical Information">
                
            </Tab>
            <Tab
              eventKey="medical-background-tests"
              title="Medical Background and Tests"
            ></Tab>
            <Tab eventKey="confirmation" title="Confirmation"></Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      <Table borderless hover className="inventory-table medical-record-table">
        <thead>
          <tr>
            <th>
              <Button
                className="add-suply btn"
                onClick={() => setShowModalAdd(true)}
              >
                Add Medical Record
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Name</td>
            <td>ID Number</td>
            <td>Photo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MedicalRecords;
