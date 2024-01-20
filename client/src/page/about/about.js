import { useEffect, useState } from "react";
import "./about.css";
import Table from "./Table";
import axios from "axios";

function About() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1100px",
        }}
      >
        <input
          style={{
            width: "500px",
            padding: "15px",
            margin: "10px",
            border: "1px solid #000",
            borderRadius: "0px",
          }}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        {<Table data={data} />}
      </div>
    </div>
  );
}

export default About;
