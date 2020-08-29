import React from "react";

import "./Card.css";

import axios from "axios";
import { useQuery } from "react-query";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import { Card, Container, Col } from "react-bootstrap";

function CardDetail() {
  const param = useParams();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const getTrip = async () => {
    const res = await axios(`http://localhost:8080/api/v1/trip/${param.id}`);

    return res;
  };

  const { isLoading, data } = useQuery("trip", getTrip);
  const trip = data;

  return (
    <div>
      <Container>
        {isLoading || !trip || !trip?.data.data.title ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div key={trip.data.data.id}>
              <Card style={{ border: "none", background: "none" }}>
                <Card.Text>
                  <Col className="col__name__detail">
                    <h5>{trip.data.data.user.fullName}</h5>
                  </Col>
                  <Col className="col__name__title">
                    <div>
                      <h1>{trip.data.data.title}</h1>
                      <p>
                        {formatter.format(new Date(trip.data.data.createdAt))}
                      </p>
                    </div>
                  </Col>
                </Card.Text>
                {/* <Card.Img
                  variant="top"
                  src={`http://localhost:8080/Images/${trip.data.data.image}`}
                /> */}
                <Card.Body>
                  <Card.Text className="title__body">
                    <p>{ReactHtmlParser(trip.data.data.description)}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default CardDetail;
