import React, { useState } from "react";
import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom";

const Table = ({ data }) => {
  const [deleted, setDeleted] = useState(false);
  const handleDelete = async (id) => {
    console.log(">>>>>>",id)
    try {
      const response = await axios.delete(`http://localhost:8800/api/auth/data12/${id}`);
      if (response.status === 200) {
        setDeleted(true);
        console.log(`Data with ID ${id} deleted successfully.`);
        window.location.reload();
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  return (
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
          const id1=item.id
          
          return(
          <tr key={item.user_id}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.mobile}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.other_mobile}</td>
            <td>
              <button>Edit</button>
            </td>
            <td>
              <button onClick={()=>handleDelete(item.user_id)}>Delete</button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
  );
};

export default Table;
