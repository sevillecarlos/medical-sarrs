import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Button, Image, Form, Modal } from "react-bootstrap";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { addMedicalRecords } from "../../store/slices/medicalRecords";
import { GrFormAdd } from "react-icons/gr";

interface AddDocumentInterface {
  onChangeMedRecordFormHistroyTestDate: any;
  onChangeMedRecordFormHistroyTest: any;
  uploadHistoryTestsPhotoPrev: any;
  showAddDocument: any;
  setMedicalRecordHistoryTest: any;
  medicalRecordID: any;
  setShowAddDocument: any;
  medicalRecordHistoryTest: any;
}
const AddDocument = (props: AddDocumentInterface) => {
  const dispatch = useDispatch();

  const {
    onChangeMedRecordFormHistroyTestDate,
    onChangeMedRecordFormHistroyTest,
    uploadHistoryTestsPhotoPrev,
    setMedicalRecordHistoryTest,
    showAddDocument,
    setShowAddDocument,
    medicalRecordID,
    medicalRecordHistoryTest,
  } = props;

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

    setShowAddDocument(false);
  };

  useEffect(() => {
    if (typeof medicalRecordHistoryTest.document_photo === "string") {
      const medicalRecordInfo = {
        medicalRecordInfo: {
          ...medicalRecordHistoryTest,
          medical_record_id: medicalRecordID,
        },
        info: "documents",
      };
      dispatch(addMedicalRecords(medicalRecordInfo));
    }
  }, [
    medicalRecordHistoryTest.document_photo,
    medicalRecordHistoryTest,
    medicalRecordID,
    dispatch,
  ]);

  return (
    <Modal
      show={showAddDocument}
      className="modal-modify-medical document-modal"
      onHide={() => setShowAddDocument(false)}
      size="lg"
      backdrop="static"
      contentClassName="modal-add-supply-document"
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Documentos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addDocument}>
          <Form.Group controlId="formFile" className="tests-photo-container">
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
            <Form.Label>Date</Form.Label>
            <DatePicker
              onChange={onChangeMedRecordFormHistroyTestDate}
              value={medicalRecordHistoryTest.document_date}
              className="filter-input patient-form"
              placeholderText={`Ingrese fecha del documento`}
            />
          </Form.Group>
          <Button className="document-button-add" type="submit">
            Agregar Documento <GrFormAdd />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddDocument.propTypes = {};

export default AddDocument;
