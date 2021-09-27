import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/styles.css";
import env from "react-dotenv";

function Form({ token, setData, mainData }) {
  const [recordInserted, setRecordInserted] = useState(false);
  const [SsnNotExist, setSsnNotExist] = useState(false);
  const [validation, setValidation] = useState({
    firstname: false,
    lastname: false,
    address: false,
    ssn: false,
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
    const ssns = data.map((e) => e.ssn);
    if (ssns.indexOf(ssn) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const url = env.REACT_APP_API_URL + "/api/members";
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!checkSsnExists(mainData, data.ssn)) {
      await axios
        .post(url, data, config)
        .then((res) => console.log(res))
        .then(() => popInsertedRecordMessage())
        .then(() => {
          setData([...mainData, data]);
        })
        .catch((err) => console.log("post error: ", err));
    } else {
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
      case "firstNameId":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, firstname: true });
        } else {
          setValidation({ ...validation, firstname: false });
        }
        break;
      case "lastNameId":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, lastname: true });
        } else {
          setValidation({ ...validation, lastname: false });
        }
        break;

      case "addressId":
        regEx = /\w\w+/gi; //two or more word characters validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, address: true });
        } else {
          setValidation({ ...validation, address: false });
        }
        break;
      case "ssnId":
        regEx = /^\d{3}-\d{2}-\d{4}$/; //ssn format validation.
        if (regEx.test(e.target.value)) {
          setValidation({ ...validation, ssn: true });
        } else {
          setValidation({ ...validation, ssn: false });
        }

        break;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>HOME</h1>
        <label htmlFor="firstName">First Name</label>

        <input
          id="firstNameId"
          placeholder="John"
          {...register("firstName", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastNameId"
          placeholder="Doe"
          {...register("lastName", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="address">Address</label>
        <input
          id="addressId"
          placeholder="Mulholland Drive 23"
          {...register("address", { required: true })}
          onChange={handleFormValidation}
        />
        {errors.address && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <label htmlFor="ssn">ssn</label>
        <input
          id="ssnId"
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
          <span style={{ color: "#ff0000" }}>The SSN already exists.</span>
        ) : null}

        <div className="btn-submit">
          <input type="submit" value="RESET" onClick={handleReset} />
          <input
            type="submit"
            value="SAVE"
            disabled={
              validation.firstname &&
              validation.lastname &&
              validation.address &&
              validation.ssn
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
