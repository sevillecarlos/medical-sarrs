import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";

const AddAlergy = (props: any) => {
  const {
    showAddMedicalRecordAlergy,
    setShowAddMedicalRecordAlergy,
    onChangeMedRecordFormAlergies,
    medicalRecordInfoAlergies,
    addInfoMedicalRecord,
  } = props;
  return (
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
  );
};

export default AddAlergy;
