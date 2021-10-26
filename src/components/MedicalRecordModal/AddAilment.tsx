import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";

const AddAilment = (props: any) => {
  const {
    addInfoMedicalRecord,
    showAddMedicalRecordAilment,
    setShowAddMedicalRecordAilment,
    onChangeMedRecordFormAilment,
    medicalRecordInfoAilment,
  } = props;

  return (
    <Modal
      show={showAddMedicalRecordAilment}
      className="modal-modify-medical"
      onHide={() => setShowAddMedicalRecordAilment(false)}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Padecimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Padecimientos</Form.Label>
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
            <Form.Label>Detalle del Padecimiento</Form.Label>
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
            Agregar Padecimiento
            <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAilment;
