import React, { useState } from "react";
import "./Search.css";

import axios from "axios";
import { useQuery } from "react-query";
import HeaderPage from "../Headers/HeaderPage";
import Bookmark from "../../Images/bookmark.png";
import { Link, useParams } from "react-router-dom";

import { Card, Col, Row, Container, Form, Button } from "react-bootstrap";

function Search() {
  const param = useParams();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getAllTrips = async () => {
    try {
      const res = await axios(
        `http://192.168.1.6:50001/api/v1/search/${param.title}`
      );

      return res;
    } catch (err) {}
  };

  const { isLoading, data } = useQuery("trips", getAllTrips);

  return (
    <div>
      <HeaderPage />
      <h1>Journey</h1>
      <Container>
        <Col>
          <Row>
            <div>
              <Form>
                <Form.Row inline="true" className="form search__bar">
                  <Col lg={12}>
                    <Form.Control
                      className="form-search"
                      type="text"
                      value={search}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col lg="auto">
                    <Link to={{ pathname: `/search/s=${search}` }}>
                      <Button variant="flat" className="btn9">
                        <p>Seacrh</p>
                      </Button>
                    </Link>
                  </Col>
                </Form.Row>
              </Form>
            </div>
            {isLoading || !data || !data?.data ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {data.data.data.trip.map((trip) => (
                  <div key={trip.id}>
                    <Col>
                      <Card style={{ width: "18rem" }} className="card__home">
                        <span className="spann">
                          <img src={Bookmark} alt="bookmark" />
                        </span>
                        <Link
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{ pathname: `/detail/${trip.id}` }}
                        >
                          <Card.Img
                            variant="top"
                            src={`http://192.168.1.6:50001/Images/${trip.image}`}
                            className="centers"
                          />
                          <Card.Body>
                            <Card.Title className="text__card__title">
                              {`${trip.title.substring(0, 20)} ...`}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text__card_date">
                              29 July 2020
                            </Card.Subtitle>
                            <Card.Text className="text__card__body">
                              {`${trip.description.substring(0, 150)} ...`}
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      </Card>
                    </Col>
                  </div>
                ))}
              </>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Search;
