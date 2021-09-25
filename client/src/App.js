import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./styles.css";

function App() {
  const [token, setToken] = useState({});
  const [recordInserted, setRecordInserted] = useState(false);
  console.log("state token: ", token)

  const popInsertedRecordMessage = () => {
    setRecordInserted(true);
    setTimeout(() => {
      setRecordInserted(false);
    }, 1000);

  } 
    

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    console.log("data: ", data);
    console.log("token: ", token);

    const url = 'http://localhost:8081/api/members'; 
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }

    }
    await axios.post(url, data, config)
    .then((res) => console.log(res))
    .then(() => popInsertedRecordMessage())
    .catch((err) => console.log("post error: ", err))
    .finally(() => {
      console.log("url: ", url);
      console.log("data: ", data);
      console.log("config", config);
      reset()
      
    })

      
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
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  },[token]);

  //text 


  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };



  return (
    <>
      <div className="btn-container">
      <button className="btn-nav">HOME</button>
      <button className="btn-nav">DATA</button>
      </div>
       
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Coding Challenge</h1>
      <label htmlFor="firstName"></label>
      <input placeholder="First Name" {...register("firstName", { required: true })} />
      {errors.firstName && <span style={{ color: "red" }}>This field is required</span>}

      <label htmlFor="lastName"></label>
      <input placeholder="Last Name" {...register("lastName", { required: true })} />
      {errors.lastName && <span style={{ color: "red" }}>This field is required</span>}

      <label htmlFor="address"></label>
      <input placeholder="Address" {...register("address", { required: true })} />
      {errors.address && <span style={{ color: "red" }}>This field is required</span>}

      <label htmlFor="ssn"></label>
      <input placeholder="SSN" {...register("ssn", { required: true })} />
      {errors.ssn && <span style={{ color: "red" }}>This field is required</span>}

      {recordInserted? <span style={{color: "#00ff43"}}>record inserted successfully.</span> : null}

{/*       <div style={{ color: "red" }}>
        {Object.keys(errors).length > 0 &&
          "There are errors, check your console."}
      </div> */}

      <div className="btn-submit">
        <input type="submit" value="RESET" onClick={handleReset} />
        <input type="submit" value="SAVE" />
      </div>
    </form>
    </>
  );
}

export default App;
