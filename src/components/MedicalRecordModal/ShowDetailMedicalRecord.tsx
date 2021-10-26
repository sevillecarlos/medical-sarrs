import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  medicalRecordsAction,
  deleteMedicalRecord,
  deleteDocumentMedicalRecords,
} from "../../store/slices/medicalRecords";
import RemoveConfModal from "../../ui/RemoveConfModal";


import { getPatients } from "../../store/slices/appointments";
import {
  Button,
  OverlayTrigger,
  Popover,
  Image,
  Form,
  Modal,
  InputGroup,
  FormControl,
  Tabs,
  Tab,
} from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import { GrFormAdd, GrFormEdit } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { updatePatient } from "../../store/slices/appointments";
import { AiOutlineUserAdd } from "react-icons/ai";

const ShowDetailMedicalRecord = (props: any) => {
  const {
    showMedicalRecordDetail,
    setShowMedicalRecordDetail,
    medicalRecord,
    medicalRecordDetail,
    findPatient,
    removeInfoMedicalRecords,
    setShowAddMedicalRecordAlergy,
    setShowAddMedicalRecordAilment,
    setShowAddMedicalRecordMedicine,
    setShowAddDocument,
    appointment,
    showRemoveAppointment,
    setShowRemoveAppointment,
    removeAppointment,
  } = props;

  const dispatch = useDispatch();
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [edit, setEdit] = useState(false);

  const [modifyPatient, setModifyPatient] = useState(false);

  const [patientForm, setPatientForm] = useState({
    patient_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    patient_gender: "",
    phone_number: "",
    address: "",
  });

  const handleChangePatientDate = (date: any) =>
    setPatientForm((prevState: any) => {
      const formatDate = new Date(date).toDateString();
      return { ...prevState, birth_date: formatDate };
    });

  const submitUpdatePatient = (e: any) => {
    e.preventDefault();

    const patientData = { id: medicalRecordDetail?.patient_id, ...patientForm };

    dispatch(updatePatient(patientData));

    setModifyPatient(false);
  };

  const changePatientForm = (e: any) =>
    setPatientForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  const [showInfoDocument, setShowInfoDocument] = useState({
    document_date: "",
    document_detail: "",
    document_name: "",
    document_photo: "",
    document_type: "",
  });

  const selectDocument = (info: any) => {
    setShowInfoDocument({ ...info });
  };

  useEffect(() => {
    setPatientForm({
      patient_id: findPatient(medicalRecordDetail?.patient_id)?.patient_id,
      first_name: findPatient(medicalRecordDetail?.patient_id)?.first_name,
      last_name: findPatient(medicalRecordDetail?.patient_id)?.last_name,
      birth_date: findPatient(medicalRecordDetail?.patient_id)?.birth_date,
      patient_gender: findPatient(medicalRecordDetail?.patient_id)
        ?.patient_gender,
      phone_number: findPatient(medicalRecordDetail?.patient_id)?.phone_number,
      address: findPatient(medicalRecordDetail?.patient_id)?.address,
    });
  }, [medicalRecordDetail]);

  const removeMedicalRecord = () => {
    dispatch(deleteMedicalRecord(medicalRecordDetail.id));
    setShowRemoveModal(false);
    setShowMedicalRecordDetail(false);
  };

  useEffect(() => {
    if (appointment.reload) {
      dispatch(getPatients());
      medicalRecordsAction.clearReload();
    }
  }, [appointment.reload, dispatch]);

  const removeDocument = (id: any) => {
    dispatch(deleteDocumentMedicalRecords(id));
  };

  console.log(medicalRecord?.medicalRecord?.medical_document)

  return (
    <>
      <Modal
        show={showMedicalRecordDetail}
        className="modal-add-supply"
        onHide={() => setShowMedicalRecordDetail(false)}
        size="lg"
        backdrop="static"
        contentClassName="modal-add-supply-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>Medical Record Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="basic-info"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="basic-info" title="Basic Information">
              {modifyPatient ? (
                <Form
                  onSubmit={submitUpdatePatient}
                  className="update-patient-form"
                  autoComplete="off"
                >
                  <Form.Group controlId="formFile" className="photo-container">
                    <Image
                      className="patient-photo-medi"
                      src={medicalRecordDetail?.patient_photo?.url}
                      rounded
                    />{" "}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID Number</Form.Label>
                    <Form.Control
                      className="form-input-add-supply"
                      value={patientForm.patient_id}
                      type="text"
                      required
                      onChange={changePatientForm}
                      name="patient_id"
                      placeholder="Enter patient ID"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className="form-input-add-supply"
                      type="text"
                      value={patientForm.first_name}
                      onChange={changePatientForm}
                      required
                      name="first_name"
                      placeholder="Enter first name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      className="form-input-add-supply"
                      type="text"
                      value={patientForm.last_name}
                      onChange={changePatientForm}
                      name="last_name"
                      required
                      placeholder="Enter last name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Birth Date</Form.Label>
                    <DatePicker
                      onChange={handleChangePatientDate}
                      value={patientForm.birth_date}
                      className="date-input patient-form"
                      required
                      placeholderText="Enter your birth day"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Select
                      className="form-input-add-supply"
                      onChange={changePatientForm}
                      name="patient_gender"
                      value={patientForm.patient_gender}
                      required
                    >
                      <option value="">Select your gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Numero de telefono</Form.Label>
                    <InputGroup className="mb-3 phone-number-input">
                      <FormControl
                        placeholder="Enter your Numero de telefono"
                        className="form-input-add-supply "
                        name="phone_number"
                        onChange={changePatientForm}
                        value={patientForm.phone_number}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={changePatientForm}
                      className="form-input-add-supply"
                      required
                      value={patientForm.address}
                      placeholder="Enter a detail of the item"
                      name="address"
                      style={{ height: "90px" }}
                    />
                  </Form.Group>
                  <div className="modal-btn-container">
                    <Button type="submit" className="update-data-btn">
                      Actualizar informacion
                      <AiOutlineUserAdd />
                    </Button>
                    <br />
                    <Button
                      onClick={() => setModifyPatient(false)}
                      className="return-btn"
                    >
                      <BiArrowBack />
                      Volver a datos iniciales
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Form.Group controlId="formFile" className="photo-container">
                    <Image
                      className="patient-photo-medi"
                      src={medicalRecordDetail?.patient_photo?.url}
                      rounded
                    />{" "}
                  </Form.Group>
                  <div>
                    <span>Patient Name</span>
                    <h5>
                      {`${
                        findPatient(medicalRecordDetail?.patient_id)?.first_name
                      } 
             ${findPatient(medicalRecordDetail?.patient_id)?.last_name}`}
                    </h5>
                    <br />
                    <span>Patient Id</span>
                    <h5>
                      {findPatient(medicalRecordDetail?.patient_id)?.patient_id}
                    </h5>
                    <br />
                    <span>Birth Date</span>
                    <h5>
                      {findPatient(medicalRecordDetail?.patient_id)?.birth_date}{" "}
                    </h5>
                    <br />
                    <span>Gender</span>
                    <h5>
                      {
                        findPatient(medicalRecordDetail?.patient_id)
                          ?.patient_gender
                      }{" "}
                    </h5>
                    <br />
                    <span>Numero de telefono</span>
                    <h5>
                      {
                        findPatient(medicalRecordDetail?.patient_id)
                          ?.phone_number
                      }{" "}
                    </h5>
                    <br />
                    <span>Address</span>
                    <h5>
                      {findPatient(medicalRecordDetail?.patient_id)?.address}{" "}
                    </h5>
                    <Button
                      className="modify-patient-info-btn"
                      onClick={() => setModifyPatient(true)}
                    >
                      Modificar informacion del paciente
                      <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
                    </Button>
                    <br />
                    <br />

                    <Button
                      className="delete-medical-record delete"
                      onClick={() => setShowRemoveModal(true)}
                    >
                      Eliminar Historial
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              )}
            </Tab>
            <Tab eventKey="medical-info" title="Medical Information">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Blood Type
                </Form.Label>
                <span className="added-items">
                  {medicalRecordDetail.blood_type?.toUpperCase()}
                </span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>Alergies</Form.Label>
              </Form.Group>
              <div>
                <span className="added-items-title"></span>{" "}
                <>
                  {medicalRecord?.medicalRecord?.medical_alergy?.map(
                    (v: any, i: number) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Popover
                            className="tooltip-medical-record"
                            id="button-tooltip-medical-record"
                          >
                            <div className="popover-tool">
                              <h5>Alergic Type</h5>
                              <span>{v.alergy_type.toUpperCase()} </span>
                              <br />
                              <h5>Alergia a</h5>
                              <span>{v.alergy_to} </span>
                              <br />
                              <h5>Alergic Detail</h5>
                              <span>{v.alergy_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items">
                          {v.alergy_to}
                          {edit && (
                            <GiCancel
                              onClick={() =>
                                removeInfoMedicalRecords(v.id, "alergies")
                              }
                            />
                          )}
                        </span>
                      </OverlayTrigger>
                    )
                  )}
                </>
              </div>
              <br />
              <div>
                <Button
                  className="add-medical-record btn"
                  onClick={() => setShowAddMedicalRecordAlergy(true)}
                >
                  Agregar alergia
                  <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                </Button>
              </div>
              <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>Ailments</Form.Label>
              </Form.Group>
              <div>
                <span className="added-items-title"></span>{" "}
                {medicalRecord?.medicalRecord?.medical_ailment?.length !==
                  0 && (
                  <>
                    {medicalRecord?.medicalRecord?.medical_ailment?.map(
                      (v: any, i: number) => (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Popover
                              className="tooltip-medical-record"
                              id="button-tooltip-medical-record"
                            >
                              <div className="popover-tool">
                                <h5>Ailment Type</h5>
                                <span>{v.ailment_type.toUpperCase()} </span>
                                <br />
                                <h5>Ailment of</h5>
                                <span>{v.ailment_to} </span>
                                <br />
                                <h5>Detalle del Padecimiento</h5>
                                <span>{v.ailment_detail} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="added-items">
                            {v.ailment_to}{" "}
                            {edit && (
                              <GiCancel
                                onClick={() =>
                                  removeInfoMedicalRecords(v.id, "ailments")
                                }
                              />
                            )}
                          </span>
                        </OverlayTrigger>
                      )
                    )}
                  </>
                )}
              </div>
              <br />
              <div>
                <Button
                  className="add-medical-record btn"
                  onClick={() => setShowAddMedicalRecordAilment(true)}
                >
                  Agregar Padecimiento
                  <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                </Button>
              </div>
              <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Medicines
                </Form.Label>
              </Form.Group>
              <div>
                <span className="added-items-title"></span>{" "}
                {medicalRecord?.medicalRecord?.medical_medicine?.length !==
                  0 && (
                  <>
                    {medicalRecord?.medicalRecord?.medical_medicine?.map(
                      (v: any, i: number) => (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Popover
                              className="tooltip-medical-record"
                              id="button-tooltip-medical-record"
                            >
                              <div className="popover-tool">
                                <h5>Tipo de medicina</h5>
                                <span>{v.medicine_type.toUpperCase()} </span>
                                <br />
                                <h5>Nombre de la medicina</h5>
                                <span>{v.medicine_to} </span>
                                <br />
                                <h5>Detalle de la medicina</h5>
                                <span>{v.medicine_detail} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="added-items" key={i}>
                            {v.medicine_to}{" "}
                            {edit && (
                              <GiCancel
                                onClick={() =>
                                  removeInfoMedicalRecords(v.id, "medicines")
                                }
                              />
                            )}
                          </span>
                        </OverlayTrigger>
                      )
                    )}
                  </>
                )}
              </div>
              <br />
              <Button
                className="add-medical-record btn"
                onClick={() => setShowAddMedicalRecordMedicine(true)}
              >
                Add Medicines
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
              <br />
              <br />
              <br />

              <Button
                className="add-medical-record edit btn"
                onClick={() => setEdit(!edit)}
              >
                Edit Medical Information
                <GrFormEdit style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </Tab>
            <Tab
              eventKey="medical-background-tests"
              title="HISTORIAL MÉDICO & Tests"
            >
              <Form className='document-info'>
                <Form.Group
                  controlId="formFile"
                  className="tests-photo-container"
                >
                  <Image
                    className="test-photo"
                    rounded
                    src={showInfoDocument?.document_photo}
                  />{" "}
                  <br />
                  <Button className="download-image-btn">
                    <a
                      href={showInfoDocument?.document_photo}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Download Image
                    </a>
                  </Button>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type of Document</Form.Label>
                  <p>
                    {" "}
                    <strong>
                      {showInfoDocument?.document_type.toUpperCase()}
                    </strong>{" "}
                  </p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name of the Document</Form.Label>
                  <p>
                    {" "}
                    <strong>
                      {" "}
                      {showInfoDocument?.document_name.toUpperCase()}
                    </strong>{" "}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Detalle del Documento</Form.Label>
                  <p>
                    {" "}
                    <strong> {showInfoDocument?.document_detail}</strong>{" "}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <p>
                    {" "}
                    <strong>{showInfoDocument?.document_date}</strong>{" "}
                  </p>
                </Form.Group>
                <div>
                  <span className="added-items-title">Document Added</span>{" "}
                  {medicalRecord?.medicalRecord?.medical_document.length !==
                    0 && (
                    <>
                      {medicalRecord?.medicalRecord?.medical_document.map(
                        (v: any, i: number) => (
                          <span className="add-container">
                            <GiCancel
                              className="remove-added-item"
                              onClick={() => removeDocument(v.id)}
                            />
                            <Image
                              onClick={() => selectDocument(v)}
                              className="test-photo-added"
                              src={v.document_photo}
                              rounded
                            />{" "}
                          </span>
                        )
                      )}
                    </>
                  )}
                </div>
                <div className="add-medical-container">
                  <Button
                    className="add-medical-record btn add-medical"
                    onClick={() => setShowAddDocument(true)}
                  >
                    Add Document
                    <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="confirmation" title="Medicals Appointments">
              <div>
                <h3>Register Appointment</h3>
                <br />
                <span className="added-items-title"></span>{" "}
                {appointment.patientAppointments.length !== 0 && (
                  <>
                    {appointment.patientAppointments.map(
                      (v: any, i: number) => (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Popover
                              className="tooltip-medical-record"
                              id="button-tooltip-medical-record"
                            >
                              <div className="popover-tool">
                                <h5>Date</h5>
                                <span>{v.date} </span>
                                <br />
                                <h5>Reason</h5>
                                <span>{v.reason} </span>
                                <br />
                                <h5>Time</h5>
                                <span>{v.time} </span>
                                <br />
                                <h5>Created</h5>
                                <span>
                                  {new Date(v.created_at).toLocaleDateString()}{" "}
                                </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="added-items">
                            {v.date} {v.reason}
                            {showRemoveAppointment && (
                              <GiCancel
                                onClick={() => removeAppointment(v.id)}
                              />
                            )}
                          </span>
                        </OverlayTrigger>
                      )
                    )}
                    <br />
                    <br />

                    <br />

                    <div>
                      <Button
                        className="add-medical-record btn edit"
                        onClick={() =>
                          setShowRemoveAppointment(!showRemoveAppointment)
                        }
                      >
                        Edit Appointment
                        <GrFormEdit style={{ marginLeft: "5px" }} size={20} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      <RemoveConfModal
        show={showRemoveModal}
        handleClose={() => setShowRemoveModal(false)}
        onClickRemove={removeMedicalRecord}
      />
    </>
  );
};

export default ShowDetailMedicalRecord;
