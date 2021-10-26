import React, { useState } from "react";
import { Button, Form, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import RemoveConfModal from "../../ui/RemoveConfModal";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";

import { AiOutlineEdit } from "react-icons/ai";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import {
  updateAppointments,
  deleteAppointments,
} from "../../store/slices/appointments";
import { useDispatch } from "react-redux";

interface ShowDetailPatient {
  appointmentId: number | null;
  setShowDetailAppointment: (e: any) => void;
  showDetailAppointment: boolean;
  dateAppointmentForm: any;
  appointmentFormDetail: any;
  handleUpdateAppointmentDate: (e: any) => void;
  upDateAppointmentTime: (e: any) => void;
}

const ShowDetailPatientModal = (props: ShowDetailPatient) => {
  const {
    appointmentId,
    setShowDetailAppointment,
    showDetailAppointment,
    dateAppointmentForm,
    upDateAppointmentTime,
    appointmentFormDetail,
    handleUpdateAppointmentDate,
  } = props;

  const dispatch = useDispatch();

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyAppointment, setShowModifyAppointment] = useState(false);

  const modifyAppointment = (e: any) => {
    e.preventDefault();
    dispatch(
      updateAppointments({ ...appointmentFormDetail, id: appointmentId })
    );
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
  };

  const removeAppointment = () => {
    dispatch(deleteAppointments(appointmentId));
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
    setShowRemoveModal(false);
  };
  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };
  const handleCloseDetailsAppointment = () => {
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
  };
  const popoverPatientInfo = (
    <Popover id="popover-patient-info">
      <Popover.Body>
        <Form.Group className="mb-3">
          <Form.Label>Numero de telefono</Form.Label>
          <h5> {dateAppointmentForm.phone_number} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genero</Form.Label>
          <h5> {dateAppointmentForm.patient_gender} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dirrecion</Form.Label>
          <h5> {dateAppointmentForm.address} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <h5> {dateAppointmentForm.birth_date} </h5>
        </Form.Group>
      </Popover.Body>
    </Popover>
  );
  return (
    <Modal
      show={showDetailAppointment}
      className="modal-show-detail-appointment"
      onHide={handleCloseDetailsAppointment}
      backdrop="static"
    >
      <RemoveConfModal
        show={showRemoveModal}
        handleClose={handleRemoveModalClose}
        onClickRemove={removeAppointment}
      />
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Detalle de la Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="show-detail-appointment" onSubmit={modifyAppointment}>
          <Form.Group className="mb-3">
            <Form.Label>Estado de la Cita</Form.Label>
            <div
              className={`status-appointment ${
                dateAppointmentForm.status ? "open" : "close"
              }-status`}
            >
              {dateAppointmentForm.status ? "Abierto" : "Cerrado"}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="modal-label">Paciente</Form.Label>
            <h5>
              {dateAppointmentForm.first_name} {dateAppointmentForm.last_name}
            </h5>
          </Form.Group>
          {!showModifyAppointment ? (
            <>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="modal-label">
                  ID del Paciente
                </Form.Label>
                <h5>{dateAppointmentForm.patient_id}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverPatientInfo}
                >
                  <Button className="show-patient-info">
                    {" "}
                    Mostrar mas informacion del paciente <BiMessageRoundedDetail />
                  </Button>
                </OverlayTrigger>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="modal-label">Fecha</Form.Label>
                <h5>{appointmentFormDetail.date}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="modal-label">Tiempo</Form.Label>
                <h5>{appointmentFormDetail.time}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="modal-label">Razon</Form.Label>
                <h5>{appointmentFormDetail.reason}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="modal-label">Creado el :</Form.Label>
                <h5>
                  {new Date(dateAppointmentForm.created_at).toLocaleString()} por{" "}
                  {appointmentFormDetail.user_log_create}
                </h5>
              </Form.Group>
              
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fecha</Form.Label>
                <DatePicker
                  onChange={handleUpdateAppointmentDate}
                  value={appointmentFormDetail.date}
                  className="date-input patient-form"
                  placeholderText="Ingrese fecha de la cita"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tiempo</Form.Label>
                <TimePicker
                  disableClock
                  className="appointment-time"
                  amPmAriaLabel={"Select am/pm"}
                  onChange={upDateAppointmentTime}
                  value={appointmentFormDetail.time}
                />
              </Form.Group>
            </>
          )}
          {dateAppointmentForm.status ? (
            !showModifyAppointment ? (
              <Button
                onClick={() => setShowModifyAppointment(true)}
                className="edit-btn ask-modify-btn"
              >
               Modificar Cita
                <AiOutlineEdit />
              </Button>
            ) : (
              <>
                <Button type="submit" className="edit-btn">
                  Modificar Cita
                  <AiOutlineEdit />
                </Button>
                <br />

                <Button
                  onClick={() => setShowRemoveModal(true)}
                  className="remove-btn"
                >
                  Remover Cita
                  <MdDelete />
                </Button>
              </>
            )
          ) : null}{" "}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ShowDetailPatientModal.propTypes = {
  appointmentId: PropTypes.number,
  setShowDetailAppointment: PropTypes.func.isRequired,
  showDetailAppointment: PropTypes.bool.isRequired,
  dateAppointmentForm: PropTypes.object.isRequired,
  upDateAppointmentTime: PropTypes.func.isRequired,
  appointmentFormDetail: PropTypes.object.isRequired,
  handleUpdateAppointmentDate: PropTypes.func.isRequired,
};

export default ShowDetailPatientModal;
