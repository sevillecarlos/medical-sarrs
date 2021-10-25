import React from "react";
import DatePicker from "react-datepicker";
import { Button, Image, Form, Modal } from "react-bootstrap";

interface AddDocumentInterface {
  onChangeMedRecordFormHistroyTestDate: any;
  onChangeMedRecordFormHistroyTest: any;
  uploadHistoryTestsPhotoPrev: any;
  showAddDocument: any;
  setShowAddDocument: any;
  addDocumentMedicalRecord: any;
  medicalRecordHistoryTest: any;
}
const AddDocument = (props: AddDocumentInterface) => {
  const {
    onChangeMedRecordFormHistroyTestDate,
    onChangeMedRecordFormHistroyTest,
    uploadHistoryTestsPhotoPrev,
    showAddDocument,
    setShowAddDocument,
    addDocumentMedicalRecord,
    medicalRecordHistoryTest,
  } = props;

  return (
    <Modal
      show={showAddDocument}
      className="modal-add-supply"
      onHide={() => setShowAddDocument(false)}
      size="lg"
      backdrop="static"
      contentClassName="modal-add-supply-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>Medical Record Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addDocumentMedicalRecord}>
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
              Name of the Document
              
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
              Detail of the Document
             
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
          <Button type="submit">Add Document</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddDocument.propTypes = {};

export default AddDocument;
