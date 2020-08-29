import React, { useState, useEffect } from "react";

import "./Card.css";

import Bookmark from "../../Images/bookmark.png";

import axios from "axios";
import { useQuery } from "react-query";
import ReactHtmlParser from "react-html-parser";
import { Link, useHistory } from "react-router-dom";
import { Card, Col, Row, Container, Form, Button } from "react-bootstrap";
import LoadingSpinner from "../Loading/LoadingSpinner";

function CardHome(props) {
  const history = useHistory();
  const { id, token } = localStorage;

  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTrips, setFilterTrips] = useState([]);

  const [saveBm, setSaveBm] = useState({
    bmUserId: id,
    bmTripId: "",
  });

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const getAllTrips = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/trips");

      const resData = res.data.data;
      return setTrips(resData);
    } catch (err) {}
  };

  const { isLoading } = useQuery("trips", getAllTrips);

  useEffect(() => {
    setFilterTrips(
      trips.filter((tour) =>
        tour.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, trips]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const setBookmark = async (id) => {
    try {
      trips.filter((tour) => tour.id == id);
      setSaveBm({
        ...saveBm,
        bmTripId: id,
      });
    } catch (err) {}
  };

  const handleBookmark = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8080/api/v1/bookmark",
        saveBm
      );

      if (res.data.status === true) {
        history.push("/bookmark");
      } else {
        console.log(res.data.status);
      }
    } catch (err) {}
  };

  const handleModal = () => {
    props.showLogin(true);
  };

  return (
    <div>
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
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col lg="auto">
                    <Link to={{ pathname: `/search/s=${search}` }}>
                      <Button variant="flat" className="btn9">
                        <p>Search</p>
                      </Button>
                    </Link>
                  </Col>
                </Form.Row>
              </Form>
            </div>
            {isLoading ? (
              <h1 style={{ marginTop: "100px" }}>
                <LoadingSpinner />
              </h1>
            ) : (
              <>
                {filterTrips.length > 0 ? (
                  filterTrips.map((trip) => {
                    return (
                      <div key={trip.id}>
                        <Col style={{ marginBottom: "-80px" }}>
                          <Card
                            style={{ width: "18rem" }}
                            className="card__home"
                          >
                            {token ? (
                              <span className="spann">
                                <Link
                                  onClick={(e) => {
                                    setBookmark(trip.id);
                                    handleBookmark(e);
                                  }}
                                >
                                  <img src={Bookmark} alt="bookmark" />
                                </Link>
                              </span>
                            ) : (
                              <span
                                className="spann"
                                onClick={() => {
                                  handleModal();
                                }}
                              >
                                <img src={Bookmark} alt="bookmark" />
                              </span>
                            )}

                            <Link
                              style={{ textDecoration: "none", color: "#000" }}
                              to={{ pathname: `/detail/${trip.id}` }}
                            >
                              <Card.Body>
                                <Card.Title className="text__card__title">
                                  {`${trip.title.substring(0, 20)} ...`}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text__card_date">
                                  {formatter.format(new Date(trip.createdAt))}
                                </Card.Subtitle>
                                <Card.Text className="text__card__body">
                                  <div className="div__detail">
                                    {ReactHtmlParser(
                                      `${trip.description.substring(
                                        0,
                                        300
                                      )} .....`
                                    )}
                                  </div>
                                </Card.Text>
                              </Card.Body>
                            </Link>
                          </Card>
                        </Col>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ marginTop: "100px" }}>
                    <h1>No Journey</h1>
                  </div>
                )}
              </>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default CardHome;
