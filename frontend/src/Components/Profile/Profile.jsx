import React, { useState } from "react";

import "./Profile.css";
import Bookmark from "../../Images/bookmark.png";

import axios from "axios";
import ModalPhoto from "../Modals/ModalPhoto";
import ReactHtmlParser from "react-html-parser";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import {
  Image,
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
} from "react-bootstrap";

function ProfileContent() {
  const param = useParams();
  const { id, token } = localStorage;

  const [trip, setTrip] = useState([]);
  const [showModalPic, setModalPic] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [currentImage, setCurrentImage] = useState({
    profilImage: "",
  });

  const [saveBm, setSaveBm] = useState({
    bmUserId: id,
    bmTripId: "",
  });

  const handleInputPicture = async () => {
    try {
      let fd = new FormData();

      fd.append("profilImage", currentImage.profilImage);

      await axios.patch(`http://192.168.1.6:50001/api/v1/user/${id}`, fd, {
        header: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setModalPic(false);
    } catch (err) {}
  };

  const [handleAddImage] = useMutation(handleInputPicture, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", currentImage);
    },
  });

  const onChange = (e) => {
    const updateForm = { ...currentImage };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setCurrentImage(updateForm);
  };

  const onChangeFileImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      setPreviewSrc([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddImage();
  };

  const showModal = () => {
    setModalPic(true);
  };

  const closeModal = () => {
    setModalPic(false);
  };

  const getTrips = async () => {
    try {
      const res = await axios(`http://192.168.1.6:50001/api/v1/trips`);

      const resData = res.data.data;
      return setTrip(resData);
    } catch (error) {}
  };

  const { isLoading } = useQuery("trips", getTrips);

  const getUser = async () => {
    try {
      const res = await axios.get(`http://192.168.1.6:50001/api/v1/user/${id}`);

      return res;
    } catch (err) {}
  };

  const { isLoadingUser, data } = useQuery("user", getUser);
  const userResult = data;

  const setBookmark = async (id) => {
    trip.trip.filter((tour) => tour.id == id);
    setSaveBm({
      ...saveBm,
      bmTripId: id,
    });
  };

  const handleBookmark = async () => {
    try {
      await axios.post("http://192.168.1.6:50001/api/v1/bookmark", saveBm);
    } catch (err) {}
  };

  return (
    <div>
      <h1>Profile</h1>
      {isLoadingUser || !userResult || !userResult?.data.data.id ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Image
            src={`http://192.168.1.6:50001/Images/${userResult.data.data.image}`}
            alt="foto-profile"
            className="foto__profile"
            onClick={showModal}
          />
          <h3>{userResult.data.data.fullName}</h3>
          <h5>{userResult.data.data.email}</h5>
        </>
      )}
      <Container>
        <Col>
          <Row>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {trip
                  .filter((user) => user.userId == param.id)
                  .map((trip) => (
                    <div key={trip.id}>
                      <Col style={{ marginBottom: "-80px" }}>
                        <Card style={{ width: "18rem" }} className="card__home">
                          <span
                            className="spann"
                            onClick={() => {
                              setBookmark(trip.id);
                              handleBookmark();
                            }}
                          >
                            <img src={Bookmark} alt="bookmark" />
                          </span>
                          <Link
                            style={{ textDecoration: "none", color: "#000" }}
                            to={{ pathname: `/detail/${trip.id}` }}
                          >
                            {/* <Card.Img
                              variant="top"
                              src={`http://localhost:8080/Images/${trip.image}`}
                              className="centers"
                            /> */}
                            <Card.Body>
                              <Card.Title className="text__card__title">
                                {`${trip.title.substring(0, 20)} ...`}
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted text__card_date">
                                {trip.createdAt}
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
                  ))}
              </>
            )}
          </Row>
        </Col>
      </Container>
      <ModalPhoto
        show={showModalPic}
        onHide={closeModal}
        body={
          <Form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
            <Form.File className="form__group">
              <Form.File.Input
                type="file"
                name="profilImage"
                onChange={(e) => {
                  onChange(e);
                  onChangeFileImage(e);
                }}
              />
            </Form.File>
            <div style={{ marginTop: "10px" }} className="div-preview-size">
              <img
                src={previewSrc}
                className="preview-film preview-size"
                alt=""
              />
            </div>
            <Button type="submit" variant="flat" className="btn__add__profile">
              Submit
            </Button>
          </Form>
        }
      />
    </div>
  );
}

export default ProfileContent;
