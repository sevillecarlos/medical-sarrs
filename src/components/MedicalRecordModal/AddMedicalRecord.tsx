import React, { useState } from "react";
import {
  createMedicalRecord,
  medicalRecordsAction,
} from "../../store/slices/medicalRecords";

import {
  Button,
  Form,
  Modal,
  Tabs,
  Image,
  Tab,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { GiCancel } from "react-icons/gi";

import { GrFormAdd } from "react-icons/gr";

import DatePicker from "react-datepicker";

import { useDispatch } from "react-redux";

import DropDownFilter from "../../ui/DropDownFilter";

const AddMedicalRecord = (props: any) => {
  const dispatch = useDispatch();

  const {
    showModalAdd,
    handleCloseAdd,
    medicalRecordInfoAlergies,
    setMedicalRecordInfoAlergies,
    medicalRecordInfoAilment,
    medicalRecordInfoMedicine,
    setMedicalRecordInfoAilment,
    setMedicalRecordInfoMedicine,
    medicalRecordHistoryTest,
    setMedicalRecordHistoryTest,
    medicalRecordsForm,
    setMedicalRecordsForm,
    setShowModalAdd,
    medicalRecord,
    filterPatients,
    onChangeMedRecordFormAlergies,
    onChangeMedRecordFormAilment,
    onChangeMedRecordFormMedicines,
    uploadHistoryTestsPhotoPrev,
    onChangeMedRecordFormHistroyTest,
    onChangeMedRecordFormHistroyTestDate,
  } = props;

  const [alergies, setAlergies] = useState(Array<any>());
  const [ailments, setAilments] = useState(Array<any>());
  const [medicines, setMedicines] = useState(Array<any>());
  const [document, setDocument] = useState(Array<any>());
  const [documentPrev, setDocumentPrev] = useState(Array<any>());
  const [patientPhotoPrev, setPatientPhotoPrev] = useState<string>("");

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

    // const {
    //   document_photo,
    //   document_type,
    //   document_name,
    //   document_detail,
    //   document_date,
    // } = medicalRecordHistoryTest;

    // // const documentFormData = new FormData();
    // // documentFormData.append("document_photo", document_photo);
    // // documentFormData.append("document_type", document_type);
    // // documentFormData.append("document_name", document_name);
    // // documentFormData.append("document_detail", document_detail);
    // // documentFormData.append("document_date", document_date);

    setDocument((prevState) => {
      return [...prevState, medicalRecordHistoryTest];
    });

    setDocumentPrev((prevState) => {
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

  return (
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
                  <div className="modify-patient-info-btn-container"></div>
                </div>
              </div>
            )}
          </Tab>
          <Tab eventKey="medical-info" className='medical-record-tab' title="Medical Information">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Blood Type</Form.Label>
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
              <Form.Label style={{ fontWeight: "bold" }}>Medicines</Form.Label>
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
                <Form.Label>Name of the Document</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormHistroyTest}
                  value={medicalRecordHistoryTest.document_name}
                  name="document_name"
                  placeholder={`Enter the name of the document`}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Detail of the Document</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onChangeMedRecordFormHistroyTest}
                  className="form-input-add-supply"
                  placeholder={`Enter a detail of the document`}
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
                  placeholderText={`Enter document date`}
                />
              </Form.Group>
              <div>
                <span className="added-items-title">Document Added</span>{" "}
                {documentPrev.length !== 0 && (
                  <>
                    {documentPrev.map((v: any, i: number) => (
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
                  Add Document
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
  );
};

export default AddMedicalRecord;
