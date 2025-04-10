import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    admissionDate: "",
    isActive: true,
    imageUrl: "",
    addresses: [],
  });
  const [newAddress, setnewAddress] = useState({
    city: "",
    street: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const addAddress = () => {
    if (!newAddress.city || !newAddress.street) {
      alert("Please fill out all required fields.");
      return;
    }
    setStudent({ ...student, addresses: [...student.addresses, newAddress] });
    setnewAddress({ city: "", street: "" });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setnewAddress({ ...newAddress, [name]: value });
  };

  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const createStudent = (e) => {
    e.preventDefault();
    if (!student.name || student.addresses.some((p) => !p.city || !p.street)) {
      alert("Please fill out all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("age", student.age);
    formData.append("admissionDate", student.admissionDate);
    formData.append("isActive", student.isActive);
    formData.append("AddressesJson", JSON.stringify(student.addresses));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    fetch("http://localhost:5014/api/Students", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Art Created Successfully");
        navigate("/list");
      })
      .catch((error) => {
        alert("Error Occurred: " + error.message);
      });
  };

  return (
    <>
<div className="container mt-4">
  <div className="row">
    {/* Card for Art Info */}
    <div className="col-md-6 mb-4">
      <div
        className="card shadow-lg p-4"
        style={{
          background: "Azure",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "10px", // Optional, makes the card corners rounded
        }}
      >
        <h4 className="mb-3">Art Info</h4>
        <form onSubmit={createStudent} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              onChange={handleStudentChange}
              className="form-control"
              id="name"
              name="name"
              value={student.name}
              placeholder="Enter Art Title"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="age">Price</label>
            <input
              onChange={handleStudentChange}
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={student.age}
              placeholder="Enter Art Price"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="admissionDate">Creation Date</label>
            <input
              onChange={handleStudentChange}
              type="date"
              name="admissionDate"
              className="form-control"
              id="admissionDate"
              value={student.admissionDate}
            />
          </div>
          <div className="form-check mb-3">
            <input
              onChange={handleStudentChange}
              className="form-check-input"
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={student.isActive}
            />
            <label htmlFor="isActive" className="form-check-label">
              Available ?
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload Art Image
            </label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  width={80}
                  height={50}
                  className="img-fluid rounded"
                  alt="Art"
                />
              </div>
            )}
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="imageUrl"
              onChange={handleUpload}
            />
          </div>
          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            &nbsp;
            <button type="button" className="btn btn-secondary">
              Reset
            </button>
          </div>
          <div className="mt-3">
            <a className="btn btn-outline-success" href="/list">
              Back To Art List
            </a>
          </div>
        </form>
      </div>
    </div>

    {/* Card for Art Exhibition */}
    <div className="col-md-6 mb-4" >
      <div
        className="card shadow-lg p-4"
        style={{
          background: "Azure",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "10px", // Optional, makes the card corners rounded
        }}
      >
        <h4 className="mb-3">Art Exhibition</h4>
        <div className="form-group mb-3" >
          <input
            type="text"
            placeholder="Enter Exhibition Name"
            className="form-control mb-2"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleNewAddressChange}
          />
          <input
            type="text"
            placeholder="Enter Exhibition Location"
            className="form-control mb-2"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleNewAddressChange}
          />
          <button
            onClick={addAddress}
            type="button"
            className="btn btn-success"
          >
            Add Exhibition
          </button>
        </div>

        {student.addresses.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-secondary">
                <tr className="table-info">
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {student.addresses.map((a, j) => {
                  return (
                    <tr key={j}>
                      <td>{j + 1}</td>
                      <td>{a.city}</td>
                      <td>{a.street}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => delAddress(j)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Add Exhibiton</p>
        )}
      </div>
    </div>
  </div>
</div>

    </>
  );

  function delAddress(j) {
    const updatep = student.addresses.filter((_, i) => i !== j);
    setStudent({ ...student, addresses: updatep });
  }
};

export default Create;
