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
      className="modal-modify-medical"
      onHide={() => setShowAddMedicalRecordAlergy(false)}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar alergia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                <option>Seleccione Tipo de alergia</option>
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
                placeholder="Ingrese alergia a"
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
          <Button
            className="add-suply btn"
            onClick={() =>
              addInfoMedicalRecord(medicalRecordInfoAlergies, "alergies")
            }
          >
            Agregar alergia
            <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAlergy;
