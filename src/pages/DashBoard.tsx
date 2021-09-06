import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

import "./style/DashBoard.css";

import inventoryCoverImage from "../assets/img/cover-inventory.jpg";
import appointmentImage from "../assets/img/cover-appointment.jpg";
import recordImage from "../assets/img/cover-record.jpg";
const DashBoard = () => {
  return (
    <div className="main">
      <Card className="modules inventory">
        <Card.Body>
          <Card.Title>Inventory Health Supplies</Card.Title>
          <Card.Text>
            This module is for make an inventory for the medical supplies that
            the organization have, is divided my categories and filters so you
            can find information in a easy way.
          </Card.Text>
          <Card.Img
            className="cover-image-inventory"
            src={inventoryCoverImage}
          />
        </Card.Body>
        <Card.Footer>
          <Card.Link className="card-link" href="/inventory">
            Go to Inventory
          </Card.Link>
        </Card.Footer>
      </Card>
      <Card className="modules appointment">
        <Card.Body>
          <Card.Title>Medical Appointments</Card.Title>
          <Card.Text>
            This module is for register medicals appointments for every patient
            that want to have a consult with a doctor.
          </Card.Text>
          <Card.Img
            className="cover-image-appointment"
            src={appointmentImage}
          />
        </Card.Body>
        <Card.Footer>
          <Card.Link className="card-link" href="/appointment">
            Go to Appointment
          </Card.Link>
        </Card.Footer>
      </Card>
      <br />
      <Card className="modules records">
        <Card.Body>
          <Card.Title>Medicals Records</Card.Title>
          <Container>
            <Row>
              <Col sm={8}>
                {" "}
                <Card.Text>
                  This module is for check the medical records of the patients,
                  any staff that have authorization can look the records and update the information.
                </Card.Text>
              </Col>
              <Col sm={4}>
                {" "}
                <Card.Img className="cover-image-record" src={recordImage} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Card.Link className="card-link" href="/medical-records">
            Go to Records
          </Card.Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DashBoard;
