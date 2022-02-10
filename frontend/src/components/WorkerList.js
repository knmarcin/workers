import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Worker from "./Worker";

const WorkerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/workers`, {
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
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3>Workers</h3>
      <Link className="btn btn-primary" to={"/workers/create"}>
        + add worker
      </Link>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Profession</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return <Worker item={item} key={item.id} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkerList;
