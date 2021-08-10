import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Form,
  Modal,
  InputGroup,
  Alert,
} from "react-bootstrap";
import "./style/Inventory.css";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import { BsFillUnlockFill } from "react-icons/bs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import DropDownFilter from "../ui/DropDownFilter";

import TimePicker from "react-time-picker";

import {
  getPatients,
  appointmentAction,
  createPatient,
} from "../store/slices/appointments";

import "react-datepicker/dist/react-datepicker.css";
import "./style/Appointments.css";

const Appointment = () => {
  const dispatch = useDispatch();
  const [appo, onChange] = useState("10:00");

  const appointment = useSelector((state: RootStateOrAny) => state.appointment);

  const handleChangeAppointmentDate = (date: any) =>
    setPatientForm((prevState: any) => {
      const formatDate = new Date(date).toDateString();
      return { ...prevState, birth_date: formatDate };
    });
  const [showRegisterPatients, setShowRegisterPatients] = useState(false);

  const [showRegisterAppointment, setShowRegisterAppointment] = useState(false);

  const handleCloseRegisterPatients = () => setShowRegisterPatients(false);

  const handleCloseRegisterAppointment = () =>
    setShowRegisterAppointment(false);

  const [patientForm, setPatientForm] = useState({
    patient_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    patient_gender: "",
    phone_number: "",
    address: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    patient: "",
    date: "",
    time: "",
    reason: "",
  });
  const changePatientForm = (e: any) =>
    setPatientForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  useEffect(() => {
    if (appointment.msg) {
      setTimeout(() => {
        dispatch(appointmentAction?.clearMsg());
      }, 3000);
    }
  }, [appointment.msg, dispatch]);

  useEffect(() => {
    if (appointment.reload) {
      dispatch(getPatients());
      dispatch(appointmentAction.clearReload());
    }
  }, [appointment.reload, dispatch]);

  const submitAddPatient = (e: any) => {
    e.preventDefault();
    dispatch(createPatient(patientForm));
    handleCloseRegisterPatients();
  };

  const changeAppointmentForm = (e: any) => {
    setAppointmentForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="appointments">
      <Alert show={appointment.msg !== ""} variant="success">
        {appointment.msg}
      </Alert>
      <Modal
        show={showRegisterPatients}
        className="modal-modify-supply"
        onHide={handleCloseRegisterPatients}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitAddPatient} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="patient_id"
                placeholder="Enter patient ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="first_name"
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="last_name"
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Birth Date</Form.Label>
              <DatePicker
                onChange={handleChangeAppointmentDate}
                value={patientForm.birth_date}
                className="filter-input patient-form"
                placeholderText="Enter your birth day"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Gender</Form.Label>
              <Form.Select
                className="form-input-add-supply"
                onChange={changePatientForm}
                name="patient_gender"
                required={true}
              >
                <option>Female</option>
                <option>Male</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="text-phone-number">
                  +504
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter your phone number"
                  className="form-input-phone"
                  name="phone_number"
                  onChange={changePatientForm}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changePatientForm}
                className="form-input-add-supply"
                placeholder="Enter a detail of the item"
                name="address"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Button type="submit" className="add-supply-btn">
              Add Patient
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showRegisterAppointment}
        className="modal-modify-supply"
        onHide={handleCloseRegisterAppointment}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitAddPatient} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Patient</Form.Label>
              <DropDownFilter patients={appointment.patients} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <DatePicker
                onChange={handleChangeAppointmentDate}
                value={patientForm.birth_date}
                className="filter-input patient-form"
                placeholderText="Enter your birth day"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Time</Form.Label>
              <TimePicker
                onChange={changeAppointmentForm}
                value={appointmentForm.time}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changeAppointmentForm}
                className="form-input-add-supply"
                placeholder="Enter a reason of the appointment"
                name="reason"
                style={{ height: "100px" }}
              />
            </Form.Group>

            <Button type="submit" className="add-supply-btn">
              Add Appointment
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Table borderless hover className="inventory-table">
        <thead>
          <tr>
            <th>
              {" "}
              <Button
                className="add-appointment"
                onClick={() => setShowRegisterAppointment(true)}
              >
                Register Appointements
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              {" "}
              <Button
                className="add-patients"
                onClick={() => setShowRegisterPatients(true)}
              >
                Register Patients
                <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              <DatePicker
                selected={null}
                onChange={handleChangeAppointmentDate}
                className="filter-input date-filter"
              />
            </th>
            <th>
              <Form.Select className="filter-input status-filter">
                <option value="">Open Appointsment</option>
                <option value="">Close Appointsment </option>
              </Form.Select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Patient Name</td>
            <td>Appointment Date</td>
            <td>Appointment Time</td>
            <td>More Info</td>
            <td>Action</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Appointment;
