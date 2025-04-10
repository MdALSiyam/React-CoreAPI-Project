import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const Edit = () => {
  const para = useParams();
  const navigator = useNavigate();
  const [student, setStudent] = useState({
    Id: 0,
    name: "",
    age: "",
    admissionDate: "",
    isActive: false,
    imageUrl: "",
    addresses: [],
  });
  const [newAddress, setNewAddress] = useState({
    city: "",
    street: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5014/api/Students/${para.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error fetching student data");
      })
      .then((data) => {
        setStudent(data);
        setPreviewImageUrl(`http://localhost:5014/${data.imageUrl}`);
      })
      .catch((error) => {
        alert("Error occurred: " + error.message);
      });
  }, [para.id]);

  const handleStudentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const addAddress = () => {
    if (!newAddress.city || !newAddress.street) {
      alert("Please fill out all required fields.");
      return;
    }
    setStudent((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
    }));
    setNewAddress({ city: "", street: "" });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImageUrl(`http://localhost:5014/${student.imageUrl}`);
    }
  };

  const updateStudent = (e) => {
    e.preventDefault();
    if (
      !student.name ||
      student.addresses.some((addr) => !addr.city || !addr.street)
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("age", student.age);
    formData.append("admissionDate", student.admissionDate);
    formData.append("isActive", student.isActive);
    formData.append("addressesJson", JSON.stringify(student.addresses));
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("imageUrl", "");
    }

    fetch(`http://localhost:5014/api/Students/${para.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error updating student data");
        }
        return res.json();
      })
      .then(() => {
        alert("Student updated successfully");
        navigator("/list");
      })
      .catch((error) => {
        console.log(error);
        navigator("/list");
      });
  };

  const delAddress = (j) => {
    const updatedAddresses = student.addresses.filter((_, i) => i !== j);
    setStudent({ ...student, addresses: updatedAddresses });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={updateStudent} key={student.Id}>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-lg mb-4" style={{background: "Azure"}}> 
              <div className="card-body">
                <h4 className="card-title">Update Art</h4>
                <div className="form-group mb-3">
                  <label htmlFor="name">Title</label>
                  <input
                    onChange={handleStudentChange}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={student.name}
                    placeholder="Enter Art Ttile"
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
                    className="form-control"
                    id="admissionDate"
                    name="admissionDate"
                    value={student.admissionDate.split("T")[0]}
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
                    {" "}
                    Available ?{" "}
                  </label>
                </div>
                <div className="form-group mb-3">
                  {previewImageUrl && (
                    <img
                      src={previewImageUrl}
                      width={80}
                      height={50}
                      className="img-fluid rounded-start mb-2"
                      alt="Art Preview"
                    />
                  )}
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image"
                    onChange={handleUpload}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    {" "}
                    Update{" "}
                  </button>{" "}
                  &nbsp;&nbsp;
                  <Link to="/list" className="btn btn-secondary">
                    {" "}
                    Back To Art List{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg mb-4" style={{background: "Azure"}}>
              <div className="card-body">
                <h4 className="card-title">Art Exhibiton</h4>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Enter Exhibiton Name"
                    className="form-control mb-2"
                    id="city"
                    name="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter Exhibiton Location"
                    className="form-control mb-2"
                    id="street"
                    name="street"
                    value={newAddress.street}
                    onChange={handleNewAddressChange}
                  />
                  <button
                    onClick={addAddress}
                    type="button"
                    className="btn btn-success mb-2"
                  >
                    {" "}
                    Add Exhibiton{" "}
                  </button>
                </div>
                {student.addresses.length > 0 && (
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr className="table-info">
                        <th>Sl No.</th>
                        <th>Name</th>
                        <th>Location</th> <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.addresses.map((a, j) => (
                        <tr key={j}>
                          <td>{j + 1}</td>
                          <td>{a.city}</td> <td>{a.street}</td>{" "}
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => delAddress(j)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {student.addresses.length === 0 && (
                  <p>No addresses added. Please add an address.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
