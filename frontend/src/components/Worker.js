import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Worker(props) {
  const { name, surname, profession, age, picture, id } = props.item;
  return (
    <tr id={`worker-${id}`} key={id} className="align-middle">
      <td>
        {picture ? (
          <img
            className="img-fluid img-thumbnail"
            width={100}
            src={picture}
            alt="worker-head-shot"
          />
        ) : (
          <img
            className="img-fluid img-thumbnail"
            width={100}
            src="/default-avatar.jpg"
            alt="missing avatar"
          />
        )}
      </td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{profession}</td>
      <td>{age}</td>
      <td>
        <ButtonGroup>
          <Link className="btn btn-primary" to={`workers/${id}`}>
            Details
          </Link>
          <Link className="btn btn-warning" to={`workers/edit/${id}`}>
            Edit
          </Link>

          <Button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              const url = `http://127.0.0.1:8000/api/workers/${id}`;
              fetch(url, {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                  "X-Requested-With": "XMLHttpRequest",
                },
              }).then((response) => {
                if (response.ok) {
                  return document.getElementById(`worker-${id}`).remove();
                }
              });
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default Worker;
