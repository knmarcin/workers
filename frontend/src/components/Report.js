import React, { useState, useEffect } from "react";

const Report = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report`, {
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
      <h3>Avg profession age</h3>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Profession</th>
                <th scope="col">Average age</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.profession}>
                    <td>{item.profession}</td>
                    <td>{item.avg_age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default Report;
