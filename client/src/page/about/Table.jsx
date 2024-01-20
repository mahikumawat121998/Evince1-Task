import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./about.css";
const Table = ({ data }) => {
  const [deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id1, setId1] = useState("");

  const handleDelete = async (id) => {
    console.log(">>>>>>", id);
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/auth/data12/${id}`
      );
      if (response.status === 200) {
        setDeleted(true);
        console.log(`Data with ID ${id} deleted successfully.`);
        const message = "Data Deleted Successfully";
        enqueueSnackbar(message, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
            autoHideDuration: 2000,
            variant: "success",
          },
        });
        window.location.reload();
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };
  const navigate = useNavigate();
  const handleEdit = (params) => {
    navigate(`/update/${params}`);
    console.log(params);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Other Mobile No</th>
          </tr>
          {data.map((item) => {
            const id1 = item.id;

            return (
              <tr key={item.user_id}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.other_mobile}</td>
                <td>
                  <button onClick={() => handleEdit(item.user_id)}>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setId1(item.user_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure?</p>
            <button
              onClick={() => handleDelete(id1)}
              style={{ margin: "10px 0px" }}
            >
              Yes
            </button>
            <button onClick={handleCloseModal} style={{ margin: "10px 0px" }}>
              No
            </button>
          </div>
        </div>
      )}
      <SnackbarProvider
        variant="success"
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </>
  );
};

export default Table;
