import React, { useState } from "react";

import Bookmark from "../../Images/bookmark.png";

import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Card, Col, Row, Container } from "react-bootstrap";

function BookmarkContent() {
  const [bookmarks, setBookmark] = useState([]);
  const id = localStorage.getItem("id");

  const getBookmarkUser = async () => {
    try {
      const res = await axios(
        `http://localhost:8080/api/v1/bookmark/user/${id}`
      );

      const resData = res.data.data;
      return setBookmark(resData);
    } catch (err) {}
  };

  const { isLoading } = useQuery("trip", getBookmarkUser);

  const removeBookmark = async (e, idBm) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8080/api/v1/bookmark/${idBm}`);

    setBookmark(bookmarks.filter((trip) => trip.id !== id));
  };

  return (
    <div>
      <Container>
        <Col>
          <Row>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {bookmarks.map((bookmark) => (
                  <div key={bookmark.id}>
                    <Col>
                      <Card style={{ width: "18rem" }} className="card__home">
                        <span className="spann">
                          <Link onClick={(e) => removeBookmark(e, bookmark.id)}>
                            <img src={Bookmark} alt="bookmark" />
                          </Link>
                        </span>
                        <Link
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{ pathname: `/detail/${bookmark.trip.id}` }}
                        >
                          {/* <Card.Img
                            variant="top"
                            src={`http://localhost:8080/Images/${bookmark.trip.image}`}
                            className="centers"
                          /> */}
                          <Card.Body>
                            <Card.Title className="text__card__title">
                              {`${bookmark.trip.title.substring(0, 20)} ...`}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text__card_date">
                              29 July 2020
                            </Card.Subtitle>
                            <Card.Text className="text__card__body">
                              <div className="div__detail">
                                {ReactHtmlParser(
                                  `${bookmark.trip.description.substring(
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
                ))}
              </>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default BookmarkContent;
