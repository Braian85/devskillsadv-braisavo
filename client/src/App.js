import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import axios from "axios";


import "./styles.css";

function App() {
  const [token, setToken] = useState({});

  console.log("token:", token);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    await axios
      .post("http://localhost:8081/auth", {
        username: "sarah",
        password: "connor",
      })
      .then((res) => {
        // console.log(res);
        setToken(res.data.token);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8081/auth", {
        username: "sarah",
        password: "connor",
      })
      .then((res) => {
        // console.log(res);
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
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });

  //text 

  
  const handleReset = () => {
    reset();
  };

  return (
    <>
    <nav className="nav">
      <a>link 1</a>
      <a>link 2</a>
    </nav>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Coding Challenge</h1>
      <label htmlFor="First Name"></label>
      <input placeholder="First Name" {...register("username")} />

      <label htmlFor="lastName"></label>
      <input placeholder="Last Name" {...register("lastName")} />

      <label htmlFor="address"></label>
      <input placeholder="Address" {...register("address")} />

      <label htmlFor="ssn"></label>
      <input placeholder="SSN" {...register("ssn")} />

      <div style={{ color: "red" }}>
        {Object.keys(errors).length > 0 &&
          "There are errors, check your console."}
      </div>
      <div className="btn-submit">
        <input type="submit" value="RESET" onClick={handleReset} />
        <input type="submit" value="SAVE" />
      </div>
    </form>
    </>
  );
}

export default App;
