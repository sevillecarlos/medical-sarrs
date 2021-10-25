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
  );
};

export default AddAilment;
