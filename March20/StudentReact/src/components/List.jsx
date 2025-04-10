import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const List = () => {
  const [student, setStudent] = useState([]);
  function GetStudents() {
    fetch("http://localhost:5014/api/Students")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error Occurred");
      })
      .then((data) => {
        setStudent(data);
      });
  }
  useEffect(GetStudents, []);

  function deleteStudent(id, name) {
    const conf = confirm(`Would you like to delete ${name}`);
    if (conf) {
      fetch("http://localhost:5014/api/Students/" + id, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Error Occurred");
        }
        GetStudents();
        alert(`${name} deleted successfully`);
      });
    }
  }
  console.log("student", student);
  return (
    <>
      <h2 className="text-center my-4 fw-bold" style={{ color: "#343a40" }}>
        🎨 Art Gallery
      </h2>
      <div className="row">
        {student.map((s, i) => (
          <div key={i} className="col-md-4 col-lg-3 mb-4">
            <div
              className="card shadow-lg border-0 text-dark art-card"
              style={{
                height: "100%",
                background: "#f8f9fa",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
              }}
            >
              {/* Card Header */}
              <div
                className="card-header text-center fw-bold"
                style={{
                  background: "Coral", // Soft gray for header
                  color: "white",
                  padding: "10px",
                  fontSize: "1.2rem",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                {s.name}
              </div>

              {/* Art Image */}
              <img
                src={`http://localhost:5014/${s.imageUrl}`}
                className="card-img-top"
                alt={s.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderBottom: "4px solid #6c757d", // Matching border with header color
                }}
              />

              <div
                className="card-body text-center d-flex flex-column justify-content-between"
                style={{
                  minHeight: "200px",
                  background: "AliceBlue", // Light beige for a cleaner look
                }}
              >
                {/* Art Price Title and Price */}
                <p className="text-dark fw-bold fs-6" style={{ fontSize: "1rem" }}>
                  <strong>Price:</strong> ${s.age}
                </p>

                {/* Creation Date Title and Date */}
                <p className="text-dark small fw-semibold" style={{ fontSize: "1rem" }}>
                  <strong>Creation Date:</strong> {new Date(s.admissionDate).toLocaleDateString()}
                </p>

                {/* Sell Status */}
                <span
                  className={`badge ${s.isActive ? "bg-success" : "bg-danger"} p-2`}
                  style={{ fontSize: "0.9rem" }}
                >
                  {s.isActive ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Exhibitions (Reversed Exhibition Name & Location Order) */}
              {s.addresses.length > 0 ? (
                <div className="card-footer bg-light text-center">
  <h6 className="text-secondary fw-bold">🖼️ Exhibitions</h6>
  {s.addresses.length > 0 ? (
    <table className="table table-bordered table-striped">
      <thead>
        <tr className="table-info">
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {s.addresses.map((a, j) => (
          <tr  key={j}>
            <td>{a.city}</td>
            <td>{a.street}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-muted mt-2 small">No Exhibitions</p>
  )}
</div>
              ) : (
                <p className="text-muted mt-2 small">No Exhibitions</p>
              )}

              {/* Actions */}
              <div className="card-footer mt-2 d-flex justify-content-center gap-2" style={{
                  background: "Thistle"}}>
                <Link to={`/list/edit/${s.id}`} className="btn btn-primary btn-sm">
                  ✏️ Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(s.id, s.name)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
