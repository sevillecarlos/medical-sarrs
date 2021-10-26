import React, { useState } from "react";
import { Button, FormControl, Form, Modal, InputGroup } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { createPatient } from "../../store/slices/appointments";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

interface RegisterPatient {
  handleCloseRegisterPatients: () => void;
  showRegisterPatients: boolean;
}

const RegisterPatientModal = (props: RegisterPatient) => {
  const { handleCloseRegisterPatients, showRegisterPatients } = props;

  const dispatch = useDispatch();

  const [patientForm, setPatientForm] = useState({
    patient_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    patient_gender: "",
    phone_number: "",
    address: "",
  });

  const handleChangePatientDate = (date: any) =>
    setPatientForm((prevState: any) => {
      const formatDate = new Date(date).toDateString();
      return { ...prevState, birth_date: formatDate };
    });

  const changePatientForm = (e: any) =>
    setPatientForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  const submitAddPatient = (e: any) => {
    e.preventDefault();
    dispatch(createPatient(patientForm));
    handleCloseRegisterPatients();
  };

  return (
    <Modal
      show={showRegisterPatients}
      className="modal-register-patient"
      onHide={handleCloseRegisterPatients}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitAddPatient} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Numero de Identidad</Form.Label>
            <Form.Control
              className="form-input-add-supply"
              type="text"
              required
              onChange={changePatientForm}
              name="patient_id"
              placeholder="Ingrese numero de ID"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              className="form-input-add-supply"
              type="text"
              onChange={changePatientForm}
              required
              name="first_name"
              placeholder="Ingrese nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              className="form-input-add-supply"
              type="text"
              onChange={changePatientForm}
              name="last_name"
              required
              placeholder="Ingrese apellido"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <DatePicker
              onChange={handleChangePatientDate}
              value={patientForm.birth_date}
              className="date-input patient-form"
              required
              placeholderText="Ingrese fecha de nacimiento"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Seleccione Genero</Form.Label>
            <Form.Select
              className="form-input-add-supply"
              onChange={changePatientForm}
              name="patient_gender"
              required
            >
              <option value="">Seleccion genero</option>
              <option value="female">Mujer</option>
              <option value="male">Hombre</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numero de telefono</Form.Label>
            <InputGroup className="mb-3 phone-number-input">
              
              <FormControl
                placeholder="Ingrese numero de telefono"
                className="form-input-add-supply "
                name="phone_number"
                onChange={changePatientForm}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Dirrecion</Form.Label>
            <Form.Control
              as="textarea"
              onChange={changePatientForm}
              className="form-input-add-supply"
              required
              placeholder="Ingrese dirrecion"
              name="address"
              style={{ height: "90px" }}
            />
          </Form.Group>
          <div className="modal-btn-container">
            <Button type="submit" className="add-patient-btn modal-btn">
             Agregar Paciente
              <AiOutlineUserAdd />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

RegisterPatientModal.propTypes = {
  handleCloseRegisterPatients: PropTypes.func.isRequired,
  showRegisterPatients: PropTypes.bool.isRequired,
};

export default RegisterPatientModal;
