import React, { useState, useEffect } from "react";
import Form from "./Form";
import TableContainer from "./TableContainer";
import axios from "axios";
import env from "react-dotenv";

export default function Maincontainer() {
  const [page, setPage] = useState("page 1");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(env.REACT_APP_API_URL + "/auth", {
        username: "sarah",
        password: "connor",
      })
      .then((res) => {
        setToken(res.data.token);
      });
  });

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    if (token.length > 10) {
      axios
        .get(env.REACT_APP_API_URL + "/api/members", config)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
      {page === "page 1" && (
        <Form token={token} setData={setData} mainData={data} />
      )}
      {page === "page 2" && <TableContainer data={data} />}
    </>
  );
}
