import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, FormGroup, Form, Button } from "react-bootstrap";

const WorkerEdit = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    age: "",
    profession: "",
  });
  const [img, setImg] = useState({ image: null });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/workers/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((response) => {
          setData(response);
        });
    }
    setLoading(false);
  }, [id]);

  return (
    <Container>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              let form_data = new FormData();

              if (img.image) form_data.append("picture", img.image);
              form_data.append("id", data.id);
              form_data.append("name", data.name);
              form_data.append("surname", data.surname);
              form_data.append("age", data.age);
              form_data.append("profession", data.profession);

              if (id) {
                await fetch(`http://127.0.0.1:8000/api/workers/${id}`, {
                  method: "PUT",
                  mode: "cors",
                  body: form_data,
                }).then((response) => {
                  if (response.ok) {
                    alert("Success");
                  }
                });
              } else {
                await fetch(`http://127.0.0.1:8000/api/workers`, {
                  method: "POST",
                  mode: "cors",
                  body: form_data,
                }).then((response) => {
                  if (response.ok) {
                    alert("Success");
                  }
                });
              }
            }}
          >
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={data.surname}
                onChange={(e) => {
                  setData({ ...data, surname: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                value={data.profession}
                onChange={(e) => {
                  setData({ ...data, profession: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="date"
                value={data.age}
                onChange={(e) => {
                  setData({ ...data, age: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                accept="image/*"
                onChange={(e) => {
                  setImg({ image: e.target.files[0] });
                }}
              />
            </FormGroup>
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default WorkerEdit;
