import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Popover,
  Image,
  Form,
  Modal,
  Tabs,
  Tab,
  FormControl,
} from "react-bootstrap";
import {
  getPatient,
  createMedicalRecord,
  getMedicalRecord,
  medicalRecordsAction,
  showMedicalRecord,
  removeInfoMedicalRecord,
  addMedicalRecords,
} from "../store/slices/medicalRecords";
import { BiCommentDetail } from "react-icons/bi";

import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import DatePicker from "react-datepicker";

import { getPatients } from "../store/slices/appointments";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import DropDownFilter from "../ui/DropDownFilter";

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

  const [medicalRecordID, setMedicalRecordID] = useState(-1);

  const [medicalRecordsForm, setMedicalRecordsForm] =
    useState<MedicalRecordsForm>({
      patient_id: "",
      blood_type: "",
      patient_photo: "",
    });

  const [patientPhotoPrev, setPatientPhotoPrev] = useState<string>("");
  const [documentPhotoPrev, setDocumentPhotoPrev] = useState<string>("");

  const [medicalRecordInfoAlergies, setMedicalRecordInfoAlergies] = useState({
    alergy_type: "",
    alergy_to: "",
    alergy_detail: "",
  });

  const [medicalRecordDetail, setMedicalRecordDetail] = useState<any>({});

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
    document_photo: "",
    document_prev_photo: "",
    document_type: "",
    document_name: "",
    document_detail: "",
    document_date: "",
  });
  const [alergies, setAlergies] = useState(Array<any>());

  const [ailments, setAilments] = useState(Array<any>());

  const [medicines, setMedicines] = useState(Array<any>());

  const [document, setDocument] = useState(Array<any>());

  const handleCloseAdd = () => setShowModalAdd(false);

  const removeInfoMedicalRecords = (id: any, info: any) => {
    dispatch(removeInfoMedicalRecord({ id, info }));
  };

  const addMedicalRecord = () => {
    const { patient_id, blood_type, patient_photo } = medicalRecordsForm;

    const formData = new FormData();
    formData.append("patient_id", patient_id);
    formData.append("blood_type", blood_type);
    formData.append("patient_photo", patient_photo);
    formData.append("alergies", JSON.stringify(alergies));
    formData.append("ailments", JSON.stringify(ailments));
    formData.append("medicines", JSON.stringify(medicines));
    formData.append("document", JSON.stringify(document));

    dispatch(createMedicalRecord(formData));

    setMedicalRecordsForm({
      patient_id: "",
      blood_type: "",
      patient_photo: "",
    });
    setPatientPhotoPrev("");
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
    setMedicalRecordHistoryTest({
      document_photo: "",
      document_type: "",
      document_name: "",
      document_detail: "",
      document_date: "",
      document_prev_photo: "",
    });

    setAlergies(Array<any>());

    setAilments(Array<any>());

    setMedicines(Array<any>());

    setDocument(Array<any>());

    setShowModalAdd(false);

    dispatch(medicalRecordsAction.clearPatient());
  };

  const uploadPhotoUser = (e: any) => {
    const photo = e.target.files[0];
    setMedicalRecordsForm((prevState: any) => {
      return { ...prevState, patient_photo: photo };
    });
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e: any) => {
      setPatientPhotoPrev(e.target.result);
    };
  };

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

  const addAlergies = () => {
    setAlergies((prevState) => {
      return [...prevState, medicalRecordInfoAlergies];
    });

    setMedicalRecordInfoAlergies({
      alergy_type: "",
      alergy_to: "",
      alergy_detail: "",
    });
  };

  const addAilments = () => {
    setAilments((prevState) => {
      return [...prevState, medicalRecordInfoAilment];
    });

    setMedicalRecordInfoAilment({
      ailment_type: "",
      ailment_to: "",
      ailment_detail: "",
    });
  };
  const addMedicines = (e: any) => {
    setMedicines((prevState) => {
      return [...prevState, medicalRecordInfoMedicine];
    });

    setMedicalRecordInfoMedicine({
      medicine_type: "",
      medicine_to: "",
      medicine_detail: "",
    });
  };
  const addDocument = (e: any) => {
    e.preventDefault();
    setDocument((prevState) => {
      return [...prevState, medicalRecordHistoryTest];
    });

    setMedicalRecordHistoryTest({
      document_photo: "",
      document_type: "",
      document_name: "",
      document_detail: "",
      document_date: "",
      document_prev_photo: "",
    });
  };

  const onChangeMedRecordFormHistroyTestDate = (date: any) => {
    setMedicalRecordHistoryTest((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();
      return { ...prevState, document_date: formatDate };
    });
  };

  const removeMedicine = (medicineIndex: number) => {
    setMedicines(medicines.filter((_, i: number) => i !== medicineIndex));
  };

  const removeAlergies = (alergieIndex: number) => {
    setAlergies(alergies.filter((_, i: number) => i !== alergieIndex));
  };

  const removeAilments = (ailmentIndex: number) => {
    setAilments(ailments.filter((_, i: number) => i !== ailmentIndex));
  };

  const removeDocument = (documentIndex: number) => {
    setDocument(document.filter((_, i: number) => i !== documentIndex));
  };

  const MedicalRecordDetail = (medicalRecord: any) => {
    setShowMedicalRecordDetail(true);
    setMedicalRecordDetail({ ...medicalRecord });
    setMedicalRecordID(medicalRecord.id);
    dispatch(showMedicalRecord(medicalRecord.id));
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
    dispatch(getPatients());
    dispatch(getMedicalRecord());
  }, [dispatch]);

  useEffect(() => {
    if (medicalRecord.reload) {
      dispatch(getMedicalRecord());
      dispatch(medicalRecordsAction.clearReloadMedicalRecord());
    }
  }, [medicalRecord.reload, dispatch]);

  useEffect(() => {
    if (medicalRecord.reloadMedicalRecord) {
      dispatch(showMedicalRecord(medicalRecordDetail.id));
      dispatch(medicalRecordsAction.clearReload());
    }
  }, [medicalRecord.reloadMedicalRecord, medicalRecordDetail.id, dispatch]);

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
                    items={filterPatients()}
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
                    <h5>{medicalRecord.patient?.patient_gender} </h5>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Blood Type
                </Form.Label>
                <Form.Select
                  className="filter-input"
                  name="blood_type"
                  onChange={(e: any) =>
                    setMedicalRecordsForm((prevState: any) => {
                      return { ...prevState, blood_type: e.target.value };
                    })
                  }
                  aria-label="Floating label select example"
                >
                  <option>Select blood type</option>
                  <option value="o-">O-</option>
                  <option value="o+">O+</option>
                  <option value="a-">A-</option>
                  <option value="a+">A+</option>
                  <option value="b-">B-</option>
                  <option value="b+">B+</option>
                  <option value="ab-">AB-</option>
                  <option value="ab+">AB+</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>Alergies</Form.Label>
                <Form.Group>
                  <Form.Label>Type of Alergy</Form.Label>
                  <Form.Select
                    className="filter-input"
                    name="alergy_type"
                    onChange={onChangeMedRecordFormAlergies}
                    value={medicalRecordInfoAlergies.alergy_type}
                    aria-label="Floating label select example"
                  >
                    <option>Select type of alergy</option>
                    <option value="food">Food allergy</option>
                    <option value="drug">Drug allergy</option>
                    <option value="atopic-dermatitis">Atopic dermatitis</option>
                    <option value="poliposis-nasal">Poliposis nasal</option>
                    <option value="allergic-rhinitis">Allergic rhinitis</option>
                    <option value="chronic-urticaria">Chronic urticaria</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alergic to</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input-add-supply"
                    onChange={onChangeMedRecordFormAlergies}
                    value={medicalRecordInfoAlergies.alergy_to}
                    name="alergy_to"
                    placeholder="Enter alergic to"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Alergy Detail</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onChangeMedRecordFormAlergies}
                  className="form-input-add-supply"
                  placeholder="Enter a detail of the alergy"
                  name="alergy_detail"
                  value={medicalRecordInfoAlergies.alergy_detail}
                  style={{ height: "90px" }}
                />
              </Form.Group>
              <div>
                <span className="added-items-title">Alergies Added</span>{" "}
                {alergies.length !== 0 && (
                  <>
                    {alergies.map((v: any, i: number) => (
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
                              <h5>Alergic to</h5>
                              <span>{v.alergy_to} </span>
                              <br />
                              <h5>Alergic Detail</h5>
                              <span>{v.alergy_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items">
                          {v.alergy_to}{" "}
                          <GiCancel onClick={() => removeAlergies(i)} />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </>
                )}
              </div>
              <br />
              <Button className="add-suply btn" onClick={addAlergies}>
                Add Alergy
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>Ailment</Form.Label>
                <Form.Group>
                  <Form.Label>Type of Ailment</Form.Label>
                  <Form.Select
                    className="filter-input"
                    name="ailment_type"
                    onChange={onChangeMedRecordFormAilment}
                    value={medicalRecordInfoAilment.ailment_type}
                    aria-label="Floating label select example"
                  >
                    <option>Select type of Ailment</option>
                    <option value="oncological-diseases">
                      Oncological diseases
                    </option>
                    <option value="infectious-and-parasitic diseases">
                      Infectious and parasitic diseases
                    </option>
                    <option value="oncological-diseases">
                      Oncological diseases
                    </option>
                    <option value="immune-system-diseases">
                      Immune system diseases
                    </option>
                    <option value="endocrine-diseases">
                      Endocrine diseases
                    </option>
                    <option value="mental-behavioral-and-developmental-disorders">
                      Mental, behavioral and developmental disorders
                    </option>
                    <option value="nervous-system-diseases">
                      Nervous system diseases
                    </option>
                    <option value="ophthalmological-and-vision-diseases">
                      Ophthalmological and vision diseases
                    </option>
                    <option value="auditory-diseases">Auditory diseases</option>
                    <option value="cardiovascular-diseases">
                      Cardiovascular diseases
                    </option>
                    <option value="respiratory-diseases">
                      Respiratory diseases
                    </option>
                    <option value="digestive-system-diseases">
                      Digestive system diseases
                    </option>
                    <option value="skin-diseases">Skin diseases</option>
                    <option value="diseases-of-the-genitourinary-system">
                      Diseases of the genitourinary system
                    </option>
                    <option value="congenital-diseases-and-chromosomal-abnormalities">
                      Congenital diseases and chromosomal abnormalities
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ailment of</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input-add-supply"
                    onChange={onChangeMedRecordFormAilment}
                    value={medicalRecordInfoAilment.ailment_to}
                    name="ailment_to"
                    placeholder="Enter ailment of"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ailment Detail</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onChangeMedRecordFormAilment}
                  className="form-input-add-supply"
                  placeholder="Enter a detail of the ailment"
                  name="ailment_detail"
                  value={medicalRecordInfoAilment.ailment_detail}
                  style={{ height: "90px" }}
                />
              </Form.Group>
              <div>
                <span className="added-items-title">Ailment Added</span>{" "}
                {ailments.length !== 0 && (
                  <>
                    {ailments.map((v: any, i: number) => (
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
                              <h5>Ailment Detail</h5>
                              <span>{v.ailment_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items">
                          {v.ailment_to}{" "}
                          <GiCancel onClick={() => removeAilments(i)} />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </>
                )}
              </div>
              <br />
              <Button className="add-suply btn" onClick={addAilments}>
                Add Ailment
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Medicines
                </Form.Label>
                <Form.Group>
                  <Form.Label>Type of Medicine</Form.Label>
                  <Form.Select
                    className="filter-input"
                    name="medicine_type"
                    onChange={onChangeMedRecordFormMedicines}
                    value={medicalRecordInfoMedicine.medicine_type}
                    aria-label="Floating label select example"
                  >
                    <option>Select type of Medicines</option>
                    <option value="analgesics">Analgesics</option>
                    <option value="antacids-and-antiulcers">
                      Antacids and antiulcers
                    </option>
                    <option value="anti-allergy">Anti-allergy</option>
                    <option value="antidiarrheals-and-laxatives">
                      Antidiarrheals and laxatives
                    </option>
                    <option value="anti-infectives">Anti-infectives</option>
                    <option value="anti-inflammatories">
                      Anti-inflammatories
                    </option>
                    <option value="antipyretics">Antipyretics</option>
                    <option value="antitussives-and-mucolytics">
                      Antitussives and mucolytics
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input-add-supply"
                    onChange={onChangeMedRecordFormMedicines}
                    value={medicalRecordInfoMedicine.medicine_to}
                    name="medicine_to"
                    placeholder="Enter medicine name"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Medicine Detail</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onChangeMedRecordFormMedicines}
                  className="form-input-add-supply"
                  placeholder="Enter a detail of the medicine"
                  name="medicine_detail"
                  value={medicalRecordInfoMedicine.medicine_detail}
                  style={{ height: "90px" }}
                />
              </Form.Group>
              <div>
                <span className="added-items-title">Medicine Added</span>{" "}
                {medicines.length !== 0 && (
                  <>
                    {medicines.map((v: any, i: number) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Popover
                            className="tooltip-medical-record"
                            id="button-tooltip-medical-record"
                          >
                            <div className="popover-tool">
                              <h5>Medicine Type</h5>
                              <span>{v.medicine_type.toUpperCase()} </span>
                              <br />
                              <h5>Medicine Name</h5>
                              <span>{v.medicine_to} </span>
                              <br />
                              <h5>Medicine Detail</h5>
                              <span>{v.medicine_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items" key={i}>
                          {v.medicine_to}{" "}
                          <GiCancel onClick={() => removeMedicine(i)} />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </>
                )}
              </div>
              <br />
              <Button className="add-suply btn" onClick={addMedicines}>
                Add Medicines
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </Tab>
            <Tab
              eventKey="medical-background-tests"
              title="Medical History & Tests"
            >
              <Form onSubmit={addDocument}>
                <Form.Group
                  controlId="formFile"
                  className="tests-photo-container"
                >
                  <Image
                    className="test-photo"
                    src={medicalRecordHistoryTest.document_prev_photo}
                    rounded
                  />{" "}
                  <Form.Control
                    type="file"
                    className="control-tests-photo"
                    onChange={uploadHistoryTestsPhotoPrev}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type of Document</Form.Label>
                  <Form.Select
                    className="filter-input"
                    name="document_type"
                    onChange={onChangeMedRecordFormHistroyTest}
                    value={medicalRecordHistoryTest.document_type}
                    aria-label="Floating label select example"
                  >
                    <option>Select type of document</option>
                    <option value="history">MEDICAL HISTORY</option>
                    <option value="test">MEDICAL TESTS</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Name of the MEDICAL{" "}
                    {medicalRecordHistoryTest.document_type.toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input-add-supply"
                    onChange={onChangeMedRecordFormHistroyTest}
                    value={medicalRecordHistoryTest.document_name}
                    name="document_name"
                    placeholder={`Enter medical ${medicalRecordHistoryTest.document_type} name`}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Detail of the{" "}
                    {medicalRecordHistoryTest.document_type?.toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={onChangeMedRecordFormHistroyTest}
                    className="form-input-add-supply"
                    placeholder={`Enter a detail of the ${medicalRecordHistoryTest.document_type}`}
                    name="document_detail"
                    value={medicalRecordHistoryTest.document_detail}
                    style={{ height: "90px" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    onChange={onChangeMedRecordFormHistroyTestDate}
                    value={medicalRecordHistoryTest.document_date}
                    className="filter-input patient-form"
                    placeholderText={`Enter ${medicalRecordHistoryTest.document_type} date`}
                  />
                </Form.Group>
                <div>
                  <span className="added-items-title">Document Added</span>{" "}
                  {document.length !== 0 && (
                    <>
                      {document.map((v: any, i: number) => (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Popover
                              className="tooltip-medical-record"
                              id="button-tooltip-medical-record"
                            >
                              <div className="popover-tool">
                                <h5>Document Type</h5>
                                <span>{v.document_type.toUpperCase()} </span>
                                <br />
                                <h5>Document Name</h5>
                                <span>{v.document_name} </span>
                                <br />
                                <h5>Document Detail</h5>
                                <span>{v.document_detail} </span>
                                <br />
                                <h5>Document Date</h5>
                                <span>{v.document_date} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="add-container">
                            <GiCancel
                              className="remove-added-item"
                              onClick={() => removeDocument(i)}
                            />
                            <Image
                              className="test-photo-added"
                              src={v.document_prev_photo}
                              rounded
                            />{" "}
                          </span>
                        </OverlayTrigger>
                      ))}
                    </>
                  )}
                </div>
                <div className="add-medical-container">
                  <Button className="add-suply btn add-medical" type="submit">
                    Add {medicalRecordHistoryTest.document_type.toUpperCase()}
                    <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="confirmation" title="Confirmation">
              <span>
                Check the information of the medical record, before you added.
              </span>
              <div className="confirm-btn-container">
                <Button onClick={addMedicalRecord} className="confirm-btn">
                  Add Medical Record{" "}
                  <GrFormAdd style={{ marginLeft: "5px" }} size={30} />
                </Button>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

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
                       ${
                         findPatient(medicalRecordDetail?.patient_id)?.last_name
                       }`}
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
                  <span>Phone Number</span>
                  <h5>
                    {findPatient(medicalRecordDetail?.patient_id)?.phone_number}{" "}
                  </h5>
                  <br />
                  <span>Address</span>
                  <h5>
                    {findPatient(medicalRecordDetail?.patient_id)?.address}{" "}
                  </h5>
                </div>
                <div className="modify-patient-info-btn-container">
                  <Button className="modify-patient-info-btn">
                    Modify Patient Information{" "}
                    <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
                  </Button>
                </div>
              </div>
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
                              <h5>Alergic to</h5>
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
                          <GiCancel
                            onClick={() =>
                              removeInfoMedicalRecords(v.id, "alergies")
                            }
                          />
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
                  Add Alergy
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
                                <h5>Ailment Detail</h5>
                                <span>{v.ailment_detail} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="added-items">
                            {v.ailment_to}{" "}
                            <GiCancel
                              onClick={() =>
                                removeInfoMedicalRecords(v.id, "ailments")
                              }
                            />
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
                  Add Ailment
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
                                <h5>Medicine Type</h5>
                                <span>{v.medicine_type.toUpperCase()} </span>
                                <br />
                                <h5>Medicine Name</h5>
                                <span>{v.medicine_to} </span>
                                <br />
                                <h5>Medicine Detail</h5>
                                <span>{v.medicine_detail} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="added-items" key={i}>
                            {v.medicine_to}{" "}
                            <GiCancel
                              onClick={() =>
                                removeInfoMedicalRecords(v.id, "medicines")
                              }
                            />
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
            </Tab>
            <Tab
              eventKey="medical-background-tests"
              title="Medical History & Tests"
            >
              <Form onSubmit={addDocument}>
                <Form.Group
                  controlId="formFile"
                  className="tests-photo-container"
                >
                  <Image
                    className="test-photo"
                    src={medicalRecordHistoryTest.document_prev_photo}
                    rounded
                  />{" "}
                  <Form.Control
                    type="file"
                    className="control-tests-photo"
                    onChange={uploadHistoryTestsPhotoPrev}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type of Document</Form.Label>
                  <Form.Select
                    className="filter-input"
                    name="document_type"
                    onChange={onChangeMedRecordFormHistroyTest}
                    value={medicalRecordHistoryTest.document_type}
                    aria-label="Floating label select example"
                  >
                    <option>Select type of document</option>
                    <option value="history">MEDICAL HISTORY</option>
                    <option value="test">MEDICAL TESTS</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Name of the MEDICAL{" "}
                    {medicalRecordHistoryTest.document_type.toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input-add-supply"
                    onChange={onChangeMedRecordFormHistroyTest}
                    value={medicalRecordHistoryTest.document_name}
                    name="document_name"
                    placeholder={`Enter medical ${medicalRecordHistoryTest.document_type} name`}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Detail of the{" "}
                    {medicalRecordHistoryTest.document_type?.toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={onChangeMedRecordFormHistroyTest}
                    className="form-input-add-supply"
                    placeholder={`Enter a detail of the ${medicalRecordHistoryTest.document_type}`}
                    name="document_detail"
                    value={medicalRecordHistoryTest.document_detail}
                    style={{ height: "90px" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    onChange={onChangeMedRecordFormHistroyTestDate}
                    value={medicalRecordHistoryTest.document_date}
                    className="filter-input patient-form"
                    placeholderText={`Enter ${medicalRecordHistoryTest.document_type} date`}
                  />
                </Form.Group>
                <div>
                  <span className="added-items-title">Document Added</span>{" "}
                  {document.length !== 0 && (
                    <>
                      {document.map((v: any, i: number) => (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Popover
                              className="tooltip-medical-record"
                              id="button-tooltip-medical-record"
                            >
                              <div className="popover-tool">
                                <h5>Document Type</h5>
                                <span>{v.document_type.toUpperCase()} </span>
                                <br />
                                <h5>Document Name</h5>
                                <span>{v.document_name} </span>
                                <br />
                                <h5>Document Detail</h5>
                                <span>{v.document_detail} </span>
                                <br />
                                <h5>Document Date</h5>
                                <span>{v.document_date} </span>
                              </div>
                            </Popover>
                          }
                        >
                          <span className="add-container">
                            <GiCancel
                              className="remove-added-item"
                              onClick={() => removeDocument(i)}
                            />
                            <Image
                              className="test-photo-added"
                              src={v.document_prev_photo}
                              rounded
                            />{" "}
                          </span>
                        </OverlayTrigger>
                      ))}
                    </>
                  )}
                </div>
                <div className="add-medical-container">
                  <Button
                    className="add-medical-record btn add-medical"
                    type="submit"
                  >
                    Add {medicalRecordHistoryTest.document_type.toUpperCase()}
                    <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="confirmation" title="Medicals Appointments"></Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddMedicalRecordAlergy}
        className="modal-modify-supply"
        onHide={() => setShowAddMedicalRecordAlergy(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Alergy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Alergies</Form.Label>
              <Form.Group>
                <Form.Label>Type of Alergy</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="alergy_type"
                  onChange={onChangeMedRecordFormAlergies}
                  value={medicalRecordInfoAlergies.alergy_type}
                  aria-label="Floating label select example"
                >
                  <option>Select type of alergy</option>
                  <option value="food">Food allergy</option>
                  <option value="drug">Drug allergy</option>
                  <option value="atopic-dermatitis">Atopic dermatitis</option>
                  <option value="poliposis-nasal">Poliposis nasal</option>
                  <option value="allergic-rhinitis">Allergic rhinitis</option>
                  <option value="chronic-urticaria">Chronic urticaria</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Alergic to</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormAlergies}
                  value={medicalRecordInfoAlergies.alergy_to}
                  name="alergy_to"
                  placeholder="Enter alergic to"
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alergy Detail</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormAlergies}
                className="form-input-add-supply"
                placeholder="Enter a detail of the alergy"
                name="alergy_detail"
                value={medicalRecordInfoAlergies.alergy_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>
            <Button
              className="add-suply btn"
              onClick={() =>
                addInfoMedicalRecord(medicalRecordInfoAlergies, "alergies")
              }
            >
              Add Alergy
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddMedicalRecordAilment}
        className="modal-modify-supply"
        onHide={() => setShowAddMedicalRecordAilment(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Ailment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Ailment</Form.Label>
              <Form.Group>
                <Form.Label>Type of Ailment</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="ailment_type"
                  onChange={onChangeMedRecordFormAilment}
                  value={medicalRecordInfoAilment.ailment_type}
                  aria-label="Floating label select example"
                >
                  <option>Select type of Ailment</option>
                  <option value="oncological-diseases">
                    Oncological diseases
                  </option>
                  <option value="infectious-and-parasitic diseases">
                    Infectious and parasitic diseases
                  </option>
                  <option value="oncological-diseases">
                    Oncological diseases
                  </option>
                  <option value="immune-system-diseases">
                    Immune system diseases
                  </option>
                  <option value="endocrine-diseases">Endocrine diseases</option>
                  <option value="mental-behavioral-and-developmental-disorders">
                    Mental, behavioral and developmental disorders
                  </option>
                  <option value="nervous-system-diseases">
                    Nervous system diseases
                  </option>
                  <option value="ophthalmological-and-vision-diseases">
                    Ophthalmological and vision diseases
                  </option>
                  <option value="auditory-diseases">Auditory diseases</option>
                  <option value="cardiovascular-diseases">
                    Cardiovascular diseases
                  </option>
                  <option value="respiratory-diseases">
                    Respiratory diseases
                  </option>
                  <option value="digestive-system-diseases">
                    Digestive system diseases
                  </option>
                  <option value="skin-diseases">Skin diseases</option>
                  <option value="diseases-of-the-genitourinary-system">
                    Diseases of the genitourinary system
                  </option>
                  <option value="congenital-diseases-and-chromosomal-abnormalities">
                    Congenital diseases and chromosomal abnormalities
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ailment of</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormAilment}
                  value={medicalRecordInfoAilment.ailment_to}
                  name="ailment_to"
                  placeholder="Enter ailment of"
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ailment Detail</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormAilment}
                className="form-input-add-supply"
                placeholder="Enter a detail of the ailment"
                name="ailment_detail"
                value={medicalRecordInfoAilment.ailment_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>
            <Button
              className="add-suply btn"
              onClick={() =>
                addInfoMedicalRecord(medicalRecordInfoAilment, "ailments")
              }
            >
              Add Ailment
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddMedicalRecordMedicine}
        className="modal-modify-supply"
        onHide={() => setShowAddMedicalRecordMedicine(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Type of Medicine</Form.Label>
              <Form.Select
                className="filter-input"
                name="medicine_type"
                onChange={onChangeMedRecordFormMedicines}
                value={medicalRecordInfoMedicine.medicine_type}
                aria-label="Floating label select example"
              >
                <option>Select type of Medicines</option>
                <option value="analgesics">Analgesics</option>
                <option value="antacids-and-antiulcers">
                  Antacids and antiulcers
                </option>
                <option value="anti-allergy">Anti-allergy</option>
                <option value="antidiarrheals-and-laxatives">
                  Antidiarrheals and laxatives
                </option>
                <option value="anti-infectives">Anti-infectives</option>
                <option value="anti-inflammatories">Anti-inflammatories</option>
                <option value="antipyretics">Antipyretics</option>
                <option value="antitussives-and-mucolytics">
                  Antitussives and mucolytics
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                className="form-input-add-supply"
                onChange={onChangeMedRecordFormMedicines}
                value={medicalRecordInfoMedicine.medicine_to}
                name="medicine_to"
                placeholder="Enter medicine name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Medicine Detail</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormMedicines}
                className="form-input-add-supply"
                placeholder="Enter a detail of the medicine"
                name="medicine_detail"
                value={medicalRecordInfoMedicine.medicine_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>

            <Button
              className="add-suply btn"
              onClick={() =>
                addInfoMedicalRecord(medicalRecordInfoMedicine, "medicines")
              }
            >
              Add Medicine
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
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
            <th>
              <FormControl
                autoFocus
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
          {medicalRecord.medicalRecords?.map((v: any) => {
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
