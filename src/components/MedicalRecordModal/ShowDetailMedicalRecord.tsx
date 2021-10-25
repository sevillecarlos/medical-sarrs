import React from "react";

import {
  Button,
  OverlayTrigger,
  Popover,
  Image,
  Form,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { GrFormAdd } from "react-icons/gr";

const ShowDetailMedicalRecord = (props: any) => {
  const {
    showMedicalRecordDetail,
    setShowMedicalRecordDetail,
    medicalRecord,
    medicalRecordDetail,
    findPatient,
    removeInfoMedicalRecords,
    setShowAddMedicalRecordAlergy,
    setShowAddMedicalRecordAilment,
    setShowAddMedicalRecordMedicine,
    setShowAddDocument,
    appointment,
    showRemoveAppointment,
    setShowRemoveAppointment,
    removeAppointment,
  } = props;

  return (
    <Modal
      show={showMedicalRecordDetail}
      className="modal-add-supply"
      onHide={() => setShowMedicalRecordDetail(false)}
      size="lg"
      backdrop="static"
      contentClassName="modal-add-supply-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>Medical Record Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="basic-info"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="basic-info" title="Basic Information">
            <div>
              <Form.Group controlId="formFile" className="photo-container">
                <Image
                  className="patient-photo-medi"
                  src={medicalRecordDetail?.patient_photo?.url}
                  rounded
                />{" "}
              </Form.Group>
              <div>
                <span>Patient Name</span>
                <h5>
                  {`${findPatient(medicalRecordDetail?.patient_id)?.first_name} 
                       ${
                         findPatient(medicalRecordDetail?.patient_id)?.last_name
                       }`}
                </h5>
                <br />
                <span>Patient Id</span>
                <h5>
                  {findPatient(medicalRecordDetail?.patient_id)?.patient_id}
                </h5>
                <br />
                <span>Birth Date</span>
                <h5>
                  {findPatient(medicalRecordDetail?.patient_id)?.birth_date}{" "}
                </h5>
                <br />
                <span>Gender</span>
                <h5>
                  {findPatient(medicalRecordDetail?.patient_id)?.patient_gender}{" "}
                </h5>
                <br />
                <span>Phone Number</span>
                <h5>
                  {findPatient(medicalRecordDetail?.patient_id)?.phone_number}{" "}
                </h5>
                <br />
                <span>Address</span>
                <h5>
                  {findPatient(medicalRecordDetail?.patient_id)?.address}{" "}
                </h5>
              </div>
            </div>
          </Tab>
          <Tab eventKey="medical-info" title="Medical Information">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Blood Type</Form.Label>
              <span className="added-items">
                {medicalRecordDetail.blood_type?.toUpperCase()}
              </span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Alergies</Form.Label>
            </Form.Group>
            <div>
              <span className="added-items-title"></span>{" "}
              <>
                {medicalRecord?.medicalRecord?.medical_alergy?.map(
                  (v: any, i: number) => (
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Popover
                          className="tooltip-medical-record"
                          id="button-tooltip-medical-record"
                        >
                          <div className="popover-tool">
                            <h5>Alergic Type</h5>
                            <span>{v.alergy_type.toUpperCase()} </span>
                            <br />
                            <h5>Alergic to</h5>
                            <span>{v.alergy_to} </span>
                            <br />
                            <h5>Alergic Detail</h5>
                            <span>{v.alergy_detail} </span>
                          </div>
                        </Popover>
                      }
                    >
                      <span className="added-items">
                        {v.alergy_to}
                        <GiCancel
                          onClick={() =>
                            removeInfoMedicalRecords(v.id, "alergies")
                          }
                        />
                      </span>
                    </OverlayTrigger>
                  )
                )}
              </>
            </div>
            <br />
            <div>
              <Button
                className="add-medical-record btn"
                onClick={() => setShowAddMedicalRecordAlergy(true)}
              >
                Add Alergy
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </div>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Ailments</Form.Label>
            </Form.Group>
            <div>
              <span className="added-items-title"></span>{" "}
              {medicalRecord?.medicalRecord?.medical_ailment?.length !== 0 && (
                <>
                  {medicalRecord?.medicalRecord?.medical_ailment?.map(
                    (v: any, i: number) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Popover
                            className="tooltip-medical-record"
                            id="button-tooltip-medical-record"
                          >
                            <div className="popover-tool">
                              <h5>Ailment Type</h5>
                              <span>{v.ailment_type.toUpperCase()} </span>
                              <br />
                              <h5>Ailment of</h5>
                              <span>{v.ailment_to} </span>
                              <br />
                              <h5>Ailment Detail</h5>
                              <span>{v.ailment_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items">
                          {v.ailment_to}{" "}
                          <GiCancel
                            onClick={() =>
                              removeInfoMedicalRecords(v.id, "ailments")
                            }
                          />
                        </span>
                      </OverlayTrigger>
                    )
                  )}
                </>
              )}
            </div>
            <br />
            <div>
              <Button
                className="add-medical-record btn"
                onClick={() => setShowAddMedicalRecordAilment(true)}
              >
                Add Ailment
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </div>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>Medicines</Form.Label>
            </Form.Group>
            <div>
              <span className="added-items-title"></span>{" "}
              {medicalRecord?.medicalRecord?.medical_medicine?.length !== 0 && (
                <>
                  {medicalRecord?.medicalRecord?.medical_medicine?.map(
                    (v: any, i: number) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Popover
                            className="tooltip-medical-record"
                            id="button-tooltip-medical-record"
                          >
                            <div className="popover-tool">
                              <h5>Medicine Type</h5>
                              <span>{v.medicine_type.toUpperCase()} </span>
                              <br />
                              <h5>Medicine Name</h5>
                              <span>{v.medicine_to} </span>
                              <br />
                              <h5>Medicine Detail</h5>
                              <span>{v.medicine_detail} </span>
                            </div>
                          </Popover>
                        }
                      >
                        <span className="added-items" key={i}>
                          {v.medicine_to}{" "}
                          <GiCancel
                            onClick={() =>
                              removeInfoMedicalRecords(v.id, "medicines")
                            }
                          />
                        </span>
                      </OverlayTrigger>
                    )
                  )}
                </>
              )}
            </div>
            <br />
            <Button
              className="add-medical-record btn"
              onClick={() => setShowAddMedicalRecordMedicine(true)}
            >
              Add Medicines
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Tab>
          <Tab
            eventKey="medical-background-tests"
            title="Medical History & Tests"
          >
            <Form>
              <Form.Group
                controlId="formFile"
                className="tests-photo-container"
              >
                <Image className="test-photo" rounded /> <br />
                <Button className="control-tests-photo">Download Image</Button>
              </Form.Group>
              <Form.Group>
                <Form.Label>Type of Document</Form.Label>
                <p>
                  {" "}
                  <strong>MEDICAL HISTORY</strong>{" "}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Name of the Document</Form.Label>
                <p>
                  {" "}
                  <strong>Radriography</strong>{" "}
                </p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Detail of the Document</Form.Label>
                <p>
                  {" "}
                  <strong>Radriography of the torax</strong>{" "}
                </p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <p>
                  {" "}
                  <strong>5/09/2021</strong>{" "}
                </p>
              </Form.Group>
              <div>
                <span className="added-items-title">Document Added</span>{" "}
                <span className="add-container">
                  <GiCancel className="remove-added-item" />
                  <Image className="test-photo-added" rounded />{" "}
                </span>
              </div>
              <div className="add-medical-container">
                <Button
                  className="add-medical-record btn add-medical"
                  onClick={() => setShowAddDocument(true)}
                >
                  Add Document
                  <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="confirmation" title="Medicals Appointments">
            <div>
              <h3>Register Appointment</h3>
              <br />
              <span className="added-items-title"></span>{" "}
              {appointment.patientAppointments.length !== 0 && (
                <>
                  {appointment.patientAppointments.map((v: any, i: number) => (
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Popover
                          className="tooltip-medical-record"
                          id="button-tooltip-medical-record"
                        >
                          <div className="popover-tool">
                            <h5>Date</h5>
                            <span>{v.date} </span>
                            <br />
                            <h5>Reason</h5>
                            <span>{v.reason} </span>
                            <br />
                            <h5>Time</h5>
                            <span>{v.time} </span>
                            <br />
                            <h5>Created</h5>
                            <span>
                              {new Date(v.created_at).toLocaleDateString()}{" "}
                            </span>
                          </div>
                        </Popover>
                      }
                    >
                      <span className="added-items">
                        {v.date} {v.reason}
                        {showRemoveAppointment && (
                          <GiCancel onClick={() => removeAppointment(v.id)} />
                        )}
                      </span>
                    </OverlayTrigger>
                  ))}
                  <br />
                  <br />

                  <br />

                  <div>
                    <Button
                      className="add-medical-record btn"
                      onClick={() =>
                        setShowRemoveAppointment(!showRemoveAppointment)
                      }
                    >
                      Edit Appointment
                      <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ShowDetailMedicalRecord;
