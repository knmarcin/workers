import React, { useState, useEffect } from "react";
import { ButtonGroup, Card, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const WorkerDetail = () => {
  const [data, setData] = useState({});
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
  }, [id]);

  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        {data.picture ? (
          <Card.Img src={data.picture} />
        ) : (
          <Card.Img src="/default-avatar.jpg" />
        )}

        <Card.Body>
          <Card.Title>
            {data.name} {data.surname}
          </Card.Title>
          <Card.Text>{data.age}</Card.Text>
          <Card.Text>{data.profession}</Card.Text>
          <ButtonGroup>
            <Link className="btn btn-warning" to={`/workers/edit/${id}`}>
              Edit
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkerDetail;
