import React, { useState, useEffect } from "react";
import Form from "./Form";
import TableContainer from "./TableContainer";
import axios from "axios";

export default function Maincontainer() {
  //Hooks
  const [page, setPage] = useState("page 1");
  const [token, setToken] = useState({});
  const [data, setData] = useState([]);

  console.log("Main Container");

  //Token authentication and data request.
  useEffect(() => {
    axios
      .post("http://localhost:8081/auth", {
        username: "sarah",
        password: "connor", //In production this object will be in an environment variable.
      })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        let config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        axios
          .get("http://localhost:8081/api/members", config)
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [token]);

  const handlePage = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.id === "1") {
      setPage("page 1");
    }
    if (e.target.id === "2") {
      setPage("page 2");
    }
  };

  return (
    <>
      <div className="btn-container">
        <button id="1" className="btn-nav" onClick={handlePage}>
          HOME
        </button>
        <button id="2" className="btn-nav" onClick={handlePage}>
          DATA
        </button>
      </div>
      {page === "page 1" && <Form token={token} />}
      {page === "page 2" && <TableContainer data={data} />}
    </>
  );
}
