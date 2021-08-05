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
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
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
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Img
            className="cover-image-appointment"
            src={appointmentImage}
          />
        </Card.Body>
        <Card.Footer>
          <Card.Link className="card-link" href="/inventory">
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
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Col>
              <Col sm={4}>
                {" "}
                <Card.Img
                  className="cover-image-record"
                  src={recordImage}
                />
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Card.Link className="card-link" href="/inventory">
            Go to Records
          </Card.Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DashBoard;
