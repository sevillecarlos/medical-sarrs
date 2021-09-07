import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  OverlayTrigger,
  Popover,
  Tooltip,
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
  const [medicalRecordInfoBloodType, setMedicalRecordInfoBloodType] =
    useState("");
  const [medicalRecordInfoAlergies, setMedicalRecordInfoAlergies] = useState({
    alergy_type: "",
    alergy_to: "",
    alergy_detail: "",
  });

  const [medicalRecordInfoAilment, setMedicalRecordInfoAilment] = useState({
    ailment_type: "",
    ailment_to: "",
    ailment_detail: "",
  });

  const [medicalRecordInfoMedicine, setMedicalRecordInfoMedicine] = useState({
    medicine_type: "",
    medicine_name: "",
    medicine_detail: "",
  });
  const [alergies, setAlergies] = useState(Array<any>());

  const [ailments, setAilments] = useState(Array<any>());

  const [medicines, setMedicines] = useState(Array<any>());

  const handleCloseAdd = () => setShowModalAdd(false);

  const uploadPhotoUser = (e: any) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e: any) => {
      setPatientPhotoPrev(e.target.result);
    };
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

  const addMedicines = () => {
    setMedicines((prevState) => {
      return [...prevState, medicalRecordInfoMedicine];
    });

    setMedicalRecordInfoMedicine({
      medicine_type: "",
      medicine_name: "",
      medicine_detail: "",
    });
  };

  useEffect(() => {
    if (medicalRecordsForm.patient_id !== null) {
      dispatch(getPatient(medicalRecordsForm.patient_id));
    }
  }, [medicalRecordsForm, dispatch]);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Blood Type
                </Form.Label>
                <Form.Select
                  className="filter-input"
                  name="blood_type"
                  onChange={(e: any) =>
                    setMedicalRecordInfoBloodType(e.target.value)
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
                    {alergies.map((v: any) => (
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
                        <span className="added-items">{v.alergy_to}</span>
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
                    {ailments.map((v: any) => (
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
                        <span className="added-items">{v.ailment_to}</span>
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
                    value={medicalRecordInfoMedicine.medicine_name}
                    name="medicine_name"
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
                <span className="added-items-title">Ailment Added</span>{" "}
                {medicines.length !== 0 && (
                  <>
                    {medicines.map((v: any) => (
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
                              <span>{v.medicine_name} </span>
                              <br />
                              <h5>Medicine Detail</h5>
                              <span>{v.medicine_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items">{v.medicine_name}</span>
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
