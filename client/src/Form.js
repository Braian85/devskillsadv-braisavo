import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./styles.css";

function Form({token}) {
 
  const [recordInserted, setRecordInserted] = useState(false);
  console.log("token", token);
 
  const popInsertedRecordMessage = () => {
    setRecordInserted(true);
    setTimeout(() => {
      setRecordInserted(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data: ", data);
  
    const url = "http://localhost:8081/api/members";
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(url, data, config)
      .then((res) => console.log(res))
      .then(() => popInsertedRecordMessage())
      .catch((err) => console.log("post error: ", err))
      .finally(() => {
        console.log("url: ", url);
        console.log("data: ", data);
        console.log("config", config);
        reset();
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Coding Challenge</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          placeholder="John"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          placeholder="Doe"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="address">Address</label>
        <input
          placeholder="Mulholland Drive 23"
          {...register("address", { required: true })}
        />
        {errors.address && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="ssn">ssn</label>
        <input
          placeholder="333-22-4444"
          pattern="^\d{3}-\d{2}-\d{4}$"
          {...register("ssn", { required: true })}
        />
        {errors.ssn && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        {recordInserted ? (
          <span style={{ color: "#00ff43" }}>
            record inserted successfully.
          </span>
        ) : null}

{/*         {Object.keys(errors).length !== 0 ? (
          <div style={{ color: "green" }}>OK</div>
        ) : (
          <div style={{ color: "red" }}>Check validation.</div>
        )} */}

        <div className="btn-submit">
          <input type="submit" value="RESET" onClick={handleReset} />
          <input type="submit" value="SAVE" />
        </div>
      </form>
    </>
  );
}

export default Form;
