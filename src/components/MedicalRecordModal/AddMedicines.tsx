import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";

interface AddMedicinesInterface {
  addInfoMedicalRecord: any;
  medicalRecordInfoMedicine: any;
  showAddMedicalRecordMedicine: any;
  setShowAddMedicalRecordMedicine: any;
  onChangeMedRecordFormMedicines: any;
}

const AddMedicines = (props: AddMedicinesInterface) => {
  const {
    addInfoMedicalRecord,
    medicalRecordInfoMedicine,
    showAddMedicalRecordMedicine,
    setShowAddMedicalRecordMedicine,
    onChangeMedRecordFormMedicines,
  } = props;
  return (
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
  );
};

AddMedicines.propTypes = {};

export default AddMedicines;
