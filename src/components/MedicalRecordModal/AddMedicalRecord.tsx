import React, { useState, useEffect } from "react";
import {
  createMedicalRecord,
  medicalRecordsAction,
} from "../../store/slices/medicalRecords";

import Axios from "axios";

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
    const { document_photo } = medicalRecordHistoryTest;

    const formData = new FormData();
    formData.append("file", document_photo);
    formData.append("upload_preset", "zrucsish");

    Axios.post("https://api.cloudinary.com/v1_1/goumi/image/upload", formData)
      .then((res: any) => res)
      .then((data: any) => {
        setMedicalRecordHistoryTest((prevState: any) => {
          return { ...prevState, document_photo: data.data.url };
        });

        setMedicalRecordHistoryTest({
          document_photo: undefined,
          document_type: "",
          document_name: "",
          document_detail: "",
          document_date: "",
          document_prev_photo: "",
        });
      });
  };

  useEffect(() => {
    if (typeof medicalRecordHistoryTest.document_photo === "string") {
      setDocument((prevState: any) => {
        return [...prevState, medicalRecordHistoryTest];
      });
    }
  }, [medicalRecordHistoryTest.document_photo, medicalRecordHistoryTest]);

  const addMedicalRecord = () => {
    const { patient_id, blood_type, patient_photo } = medicalRecordsForm;

    const formData = new FormData();
    formData.append("patient_id", patient_id);
    formData.append("blood_type", blood_type);
    formData.append("patient_photo", patient_photo);
    formData.append("alergies", JSON.stringify(alergies));
    formData.append("ailments", JSON.stringify(ailments));
    formData.append("medicines", JSON.stringify(medicines));
    formData.append("documents", JSON.stringify(document));
    console.log(document);

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
      document_photo: undefined,
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
        <Modal.Title>Informacion Inical Historial Medico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="basic-info"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="basic-info" title="Informacion Basica">
            {medicalRecord.patient === null && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Paciente</Form.Label>
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
                  <span>Nombre del paciente</span>
                  <h5>
                    {`${medicalRecord.patient?.first_name}
      ${medicalRecord.patient?.last_name}`}
                  </h5>
                  <br />
                  <span>Paciente Id</span>
                  <h5>
                    {medicalRecord.patient?.patient_id?.slice(0, 4) +
                      "-" +
                      medicalRecord.patient?.patient_id?.slice(4, 8) +
                      "-" +
                      medicalRecord.patient?.patient_id?.slice(8, 15)}
                  </h5>
                  <br />
                  <span>Fecha de Nacimiento</span>
                  <h5>{medicalRecord.patient?.birth_date} </h5>
                  <br />
                  <span>Genero</span>
                  <h5>{medicalRecord.patient?.patient_gender} </h5>
                  <br />
                  <span>Numero de telefono</span>
                  <h5>{medicalRecord.patient?.phone_number} </h5>
                  <br />
                  <span>Dirrecion</span>
                  <h5>{medicalRecord.patient?.address} </h5>
                  <div className="modify-patient-info-btn-container"></div>
                </div>
              </div>
            )}
          </Tab>
          <Tab
            eventKey="medical-info"
            className="medical-record-tab"
            title="Informacion Medica"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Tipo de sangre</Form.Label>
              <Form.Select
                className="filter-input blood-type"
                name="blood_type"
                onChange={(e: any) =>
                  setMedicalRecordsForm((prevState: any) => {
                    return { ...prevState, blood_type: e.target.value };
                  })
                }
                aria-label="Floating label select example"
              >
                <option>Seleccione tipo</option>
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
              <Form.Label style={{ fontWeight: "bold" }}>Alergias</Form.Label>
              <Form.Group>
                <Form.Label>Tipo de alergia</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="alergy_type"
                  onChange={onChangeMedRecordFormAlergies}
                  value={medicalRecordInfoAlergies.alergy_type}
                  aria-label="Floating label select example"
                >
                  <option>Select Tipo de alergia</option>
                  <option value="food">Alergia a la comida</option>
                  <option value="drug">Alergia a un medicamento</option>
                  <option value="atopic-dermatitis">Dermatitis atópica</option>
                  <option value="poliposis-nasal">Poliposis nasal</option>
                  <option value="allergic-rhinitis">Rinitis alérgica</option>
                  <option value="chronic-urticaria">Urticaria crónica</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Alergia a</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormAlergies}
                  value={medicalRecordInfoAlergies.alergy_to}
                  name="alergy_to"
                  placeholder="Ingrese Alergia a"
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Detalle de alergia</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormAlergies}
                className="form-input-add-supply"
                placeholder="Ingrese detalle de la alergia"
                name="alergy_detail"
                value={medicalRecordInfoAlergies.alergy_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>
            <div>
              <span className="added-items-title">Alergias agregadas</span>{" "}
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
                            <h5>Tipo de alregia</h5>
                            <span>{v.alergy_type.toUpperCase()} </span>
                            <br />
                            <h5>Alergia a</h5>
                            <span>{v.alergy_to} </span>
                            <br />
                            <h5>Detalle de alergia</h5>
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
              Agregar alergia
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Padecimiento</Form.Label>
              <Form.Group>
                <Form.Label>Tipo de Padecimiento</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="ailment_type"
                  onChange={onChangeMedRecordFormAilment}
                  value={medicalRecordInfoAilment.ailment_type}
                  aria-label="Floating label select example"
                >
                  <option>Seleccione Tipo de Padecimiento</option>
                  <option value="oncological-diseases">
                    Enfermedades Oncologicas
                  </option>
                  <option value="infectious-and-parasitic diseases">
                    Enfermedades Infecciosas
                  </option>
                  <option value="oncological-diseases">
                    Enfermedades Oncologicas
                  </option>
                  <option value="immune-system-diseases">
                    Enfermedades del sistema inmunológico
                  </option>
                  <option value="endocrine-diseases">Endocrine diseases</option>
                  <option value="mental-behavioral-and-developmental-disorders">
                    Trastornos mentales, del comportamiento y del desarrollo.
                  </option>
                  <option value="nervous-system-diseases">
                    Enfermedades del sistema nervioso{" "}
                  </option>
                  <option value="ophthalmological-and-vision-diseases">
                    Enfermedades oftalmológicas y de la vista{" "}
                  </option>
                  <option value="auditory-diseases">
                    Enfermedades auditivas
                  </option>
                  <option value="cardiovascular-diseases">
                    Enfermedades cardiovasculares
                  </option>
                  <option value="respiratory-diseases">
                    Enfermedades respiratorias{" "}
                  </option>
                  <option value="digestive-system-diseases">
                    Enfermedades del sistema digestivo{" "}
                  </option>
                  <option value="skin-diseases">Skin diseases</option>
                  <option value="diseases-of-the-genitourinary-system">
                    Enfermedades del sistema genitourinario.{" "}
                  </option>
                  <option value="congenital-diseases-and-chromosomal-abnormalities">
                    Enfermedades congénitas y anomalías cromosómicas.{" "}
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Padecimiento a</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormAilment}
                  value={medicalRecordInfoAilment.ailment_to}
                  name="ailment_to"
                  placeholder="Ingrese padecimiento a"
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Detalle del Padecimiento</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormAilment}
                className="form-input-add-supply"
                placeholder="Ingrese detalle del padecimiento"
                name="ailment_detail"
                value={medicalRecordInfoAilment.ailment_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>
            <div>
              <span className="added-items-title">Padecimiento agregado</span>{" "}
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
                            <h5>Tipo de Padecimiento</h5>
                            <span>{v.ailment_type.toUpperCase()} </span>
                            <br />
                            <h5>Padecimiento a</h5>
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
                        <GiCancel onClick={() => removeAilments(i)} />
                      </span>
                    </OverlayTrigger>
                  ))}
                </>
              )}
            </div>
            <br />
            <Button className="add-suply btn" onClick={addAilments}>
              Agregar Padecimiento
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Medicinas</Form.Label>
              <Form.Group>
                <Form.Label>Tipo de Medicinas</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="medicine_type"
                  onChange={onChangeMedRecordFormMedicines}
                  value={medicalRecordInfoMedicine.medicine_type}
                  aria-label="Floating label select example"
                >
                  <option>Seleccione el tipo de medicamentos</option>
                  <option value="analgesics">Analgesicos</option>
                  <option value="antacids-and-antiulcers">
                    Antiácidos y antiulcerosos
                  </option>
                  <option value="anti-allergy">Anti-allergico</option>
                  <option value="antidiarrheals-and-laxatives">
                    Antidiarreicos y laxantes{" "}
                  </option>
                  <option value="anti-infectives">Anti-infeccioso</option>
                  <option value="anti-inflammatories">
                    Antiinflamatorios{" "}
                  </option>
                  <option value="antipyretics">Antipireticos</option>
                  <option value="antitussives-and-mucolytics">
                    Antitusivos y mucolíticos{" "}
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre de la medicina</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormMedicines}
                  value={medicalRecordInfoMedicine.medicine_to}
                  name="medicine_to"
                  placeholder="Ingrese Nombre de la medicina"
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Detalle de la medicina</Form.Label>
              <Form.Control
                as="textarea"
                onChange={onChangeMedRecordFormMedicines}
                className="form-input-add-supply"
                placeholder="Ingrese detalle de la medicina"
                name="medicine_detail"
                value={medicalRecordInfoMedicine.medicine_detail}
                style={{ height: "90px" }}
              />
            </Form.Group>
            <div>
              <span className="added-items-title">Medicinas agregadas</span>{" "}
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
                        <GiCancel onClick={() => removeMedicine(i)} />
                      </span>
                    </OverlayTrigger>
                  ))}
                </>
              )}
            </div>
            <br />
            <Button className="add-suply btn" onClick={addMedicines}>
              Agregar Medicinas
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Tab>
          <Tab
            eventKey="medical-background-tests"
            title="Historial & Pruebas"
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
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Select
                  className="filter-input"
                  name="document_type"
                  onChange={onChangeMedRecordFormHistroyTest}
                  value={medicalRecordHistoryTest.document_type}
                  aria-label="Floating label select example"
                >
                  <option>Seleccionar tipo de documento</option>
                  <option value="history">HISTORIAL MÉDICO</option>
                  <option value="test">PRUEBAS MEDICAS</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre del documento</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-add-supply"
                  onChange={onChangeMedRecordFormHistroyTest}
                  value={medicalRecordHistoryTest.document_name}
                  name="document_name"
                  placeholder={`Ingrese nombre del documento`}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Detalle del Documento</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onChangeMedRecordFormHistroyTest}
                  className="form-input-add-supply"
                  placeholder={`Ingrese Detalle del Documento`}
                  name="document_detail"
                  value={medicalRecordHistoryTest.document_detail}
                  style={{ height: "90px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fecha</Form.Label>
                <DatePicker
                  onChange={onChangeMedRecordFormHistroyTestDate}
                  value={medicalRecordHistoryTest.document_date}
                  className="filter-input patient-form"
                  placeholderText={`Ingrese Fecha del documento`}
                />
              </Form.Group>
              <div>
                <span className="added-items-title">Documentos agregados</span>{" "}
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
                              <h5>Tipo de documento</h5>
                              <span>{v.document_type.toUpperCase()} </span>
                              <br />
                              <h5>Nombre del documento</h5>
                              <span>{v.document_name} </span>
                              <br />
                              <h5>Detalle del documento</h5>
                              <span>{v.document_detail} </span>
                              <br />
                              <h5>Fecha del documento</h5>
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
                  Agregar Documento
                  <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="confirmation" title="Confirmacion">
            <span>
              Revise la informacino del historial medico, antes de confirmar
            </span>
            <div className="confirm-btn-container">
              <Button onClick={addMedicalRecord} className="confirm-btn">
                Agregar historial medico{" "}
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
