import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./styles.css";

function Form({ token, mainData }) {
  const [recordInserted, setRecordInserted] = useState(false);
  const [SsnNotExist, setSsnNotExist] = useState(false);
  const [validation, setValidation] = useState({
    firstname: 0,
    lastname: 0,
    address: 0,
    ssn: 0,
  });

  const popInsertedRecordMessage = () => {
    setRecordInserted(true);
    setTimeout(() => {
      setRecordInserted(false);
    }, 3000);
  };

  const popNotExistMessage = () => {
    setSsnNotExist(true);
    setTimeout(() => {
    setSsnNotExist(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const checkSsnExists = (data, ssn) => {

    console.log("DATA ES: ", data)
    console.log("SSN ES: ", ssn)
    const values = data.map(e => e.ssn)

    if(values.indexOf(ssn) !== -1) { 
      return true } else { 
      return false 
    }
     
    
  }

  const onSubmit = async (data) => {
    const url = "http://localhost:8081/api/members";
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    if(!checkSsnExists(mainData, data.ssn)) {
  
    await axios
      .post(url, data, config)
      .then((res) => console.log(res))
      .then(() => popInsertedRecordMessage())
      .catch((err) => console.log("post error: ", err))
      .finally(() => {
        mainData.push(data);
        reset();
      });

    }
    else {
      popNotExistMessage();
      reset();
    }


  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const handleFormValidation = (e) => {
    e.preventDefault();
    let regEx = null;
    switch (e.target.id) {
      case "1":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, firstname: 1 });
        } else {
          setValidation({ ...validation, firstname: 0 });
        }
        break;
      case "2":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, lastname: 1 });
        } else {
          setValidation({ ...validation, lastname: 0 });
        }
        break;

      case "3":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, address: 1 });
        } else {
          setValidation({ ...validation, address: 0 });
        }
        break;
      case "4":
        regEx = /^\d{3}-\d{2}-\d{4}$/; //ssn format validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, ssn: 1 });
        } else {
          setValidation({ ...validation, ssn: 0 });
        }

        break;
      default:
        //
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>HOME</h1>
        <label htmlFor="firstName">First Name</label>

        <input
          id="1"
          placeholder="John"
          {...register("firstName", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="2"
          placeholder="Doe"
          {...register("lastName", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="address">Address</label>
        <input
          id="3"
          placeholder="Mulholland Drive 23"
          {...register("address", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.address && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="ssn">ssn</label>
        <input
          id="4"
          placeholder="xxx-xx-xxxx"
          {...register("ssn", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.ssn && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        {recordInserted ? (
          <span style={{ color: "#00ff43" }}>
            record inserted successfully.
          </span>
        ) : null}

        {SsnNotExist ? (
          <span style={{ color: "#ff0000" }}>
            The SSN already exists.
          </span>
        ) : null}

        {/*         {Object.keys(errors).length !== 0 ? (
          <div style={{ color: "green" }}>OK</div>
        ) : (
          <div style={{ color: "red" }}>Check validation.</div>
        )} */}

        <div className="btn-submit">
          <input type="submit" value="RESET" onClick={handleReset} />
          <input
            type="submit"
            value="SAVE"
            disabled={
              validation.firstname === 1 &&
              validation.lastname === 1 &&
              validation.address === 1 &&
              validation.ssn === 1
                ? false
                : true
            }
          />
        </div>
      </form>
    </>
  );
}

export default Form;
