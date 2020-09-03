import React, { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, Button, Container } from "react-bootstrap";

function AddJourney() {
  const location = useHistory();
  const id = localStorage.getItem("id");

  const [forms, setForms] = useState({
    userId: id,
    title: "",
    description: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  const handleInputTrip = async () => {
    try {
      const res = await axios.post(
        "http://192.168.1.6:50001/api/v1/trip",
        forms,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleCKEditor = (event, editor) => {
    const data = editor.getData();
    setForms({ ...forms, description: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInputTrip();
    location.push("/");
    window.location.reload();
  };

  return (
    <div>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Control
            type="hidden"
            value={forms.userId}
            onChange={(e) => onChange(e)}
            name="userId"
          />
          <Form.Group>
            <Form.Label
              className="float-left"
              style={{ fontWeight: "bold", fontSize: "24px" }}
            >
              Title
            </Form.Label>
            <Form.Control
              type="text"
              value={forms.title}
              onChange={(e) => onChange(e)}
              name="title"
            />
          </Form.Group>

          <CKEditor
            editor={ClassicEditor}
            value={forms.description}
            onInit={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "300px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={handleCKEditor}
            config={{
              ckfinder: {
                uploadUrl: `http://192.168.1.6:50001/upload`,
              },
            }}
          />
          <Button
            variant="warning"
            type="submit"
            style={{ marginTop: "20px", color: "#fff", float: "right" }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddJourney;
