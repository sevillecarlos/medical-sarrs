import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import TimePicker from "react-time-picker";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import { createAppointments } from "../../store/slices/appointments";

import { GrFormAdd } from "react-icons/gr";

import DropDownFilter from "../../ui/DropDownFilter";

interface AddAppointmentModalI {
  showRegisterAppointment: boolean;
  handleCloseRegisterAppointment: () => void;
  appointment: any;
}

const AddAppointmentModal = (props: AddAppointmentModalI) => {
  const {
    showRegisterAppointment,
    handleCloseRegisterAppointment,
    appointment,
  } = props;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootStateOrAny) => state.auth);

  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: 0,
    date: "",
    time: "",
    reason: "",
    status: true,
    user_log_create: "",
    user_log_update: "",
  });

  useEffect(() => {
    setAppointmentForm((prevState: any) => {
      return {
        ...prevState,
        user_log_create: auth.activeUser,
        user_log_update: auth.activeUser,
      };
    });
  }, [auth.activeUser]);

  const [timeError, setTimeError] = useState(false);


  const checkAppointmentTime = () => {
    const checkTimeExist = appointment.appointments.filter(
      (appointment: any) =>
        appointment.time === appointmentForm.time &&
        appointment.date === appointmentForm.date
    );
    return checkTimeExist.length !== 0 ? true : false;
  };

  const submitAddAppointment = (e: any) => {
    e.preventDefault();
    const checkTime = checkAppointmentTime();

    if (!checkTime) {
      dispatch(createAppointments(appointmentForm));
      setAppointmentForm({
        patient_id: 0,
        date: "",
        time: "",
        reason: "",
        status: true,
        user_log_create: "",
        user_log_update: "",
      });
      handleCloseRegisterAppointment();
      setTimeError(false);
    } else {
      setTimeError(true);
    }
  };

  const changeAppointmentForm = (e: any) => {
    setAppointmentForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const changeAppointmentTime = (e: any) => {
    setAppointmentForm((prevState: any) => {
      return { ...prevState, time: e };
    });
  };
  const handleChangeAppointmentDate = (date: any) => {
    setAppointmentForm((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();

      return { ...prevState, date: formatDate };
    });
  };
  return (
    <Modal
      show={showRegisterAppointment}
      className="modal-add-appointment"
      onHide={handleCloseRegisterAppointment}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitAddAppointment} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Paciente</Form.Label>
            <DropDownFilter
              items={appointment.patients}
              required
              appointmentFormPatient={setAppointmentForm}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fecha</Form.Label>
            <DatePicker
              onChange={handleChangeAppointmentDate}
              value={appointmentForm.date}
              className="date-input patient-form"
              required
              placeholderText="Ingrese fecha de la cita"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiempo</Form.Label>
            <TimePicker
              disableClock
              required
              className="appointment-time"
              amPmAriaLabel={"Select am/pm"}
              onChange={changeAppointmentTime}
              value={appointmentForm.time}
            />
            {timeError && (
              <span style={{ color: "red" }}>
                El tiempo de esta cita intercede con otra
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Razon</Form.Label>
            <Form.Control
              as="textarea"
              onChange={changeAppointmentForm}
              value={appointmentForm.reason}
              className="form-input-add-supply"
              required
              placeholder="Ingrese razon de la cita"
              name="reason"
              style={{ height: "100px" }}
            />
          </Form.Group>
          <div className="modal-btn-container">
            <Button type="submit" className="add-appointment-btn">
              Agregar Cita
              <GrFormAdd />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddAppointmentModal.propTypes = {
  showRegisterAppointment: PropTypes.bool.isRequired,
  handleCloseRegisterAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

export default AddAppointmentModal;
