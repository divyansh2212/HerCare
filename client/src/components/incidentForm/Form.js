import React, { useState } from "react";
import IncidentDescription from "./IncidentDescription";
import Places from "./Places";
import Gender from "./Gender";
import Identity from "./Identity";
import Age from "./Age";
import Time from "./Time";
import TypeOfViolence from "./TypeOfViolence";
import ReportedToPolice from "./ReportedToPolice";
import "./incidentForm.css";
import axios from "axios";
import { useCallback } from "react";
import ProgressBar from "../ProgressBar/Progress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { display, style } from "@mui/system";
import { Button } from "@mui/material";

function Form() {
  const navigate = useNavigate();
  const curDT = new Date().toLocaleString();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    identity: "",
    gender: "",
    title: "",
    message: "",
    time: curDT,
    typeOfViolence: "",
    reportToPolice: "",
    address: {
      country: "",
      state: "",
      city: "",
      lat: "",
      lon: "",
    },
  });

  //   const triggerAPI = useCallback(async () => {
  //     // Use async await instead of chained promise
  //    axios.post('http://localhost:4000/incident', formData)
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    await axios
      .post("http://localhost:4000/incident", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        navigate("/");
      });
  };

  const FormTitles = [
    "For Whom You are Sharing For?",
    "Please tell us your gender",
    "How old are you ?",
    "Please share your Incident Here",
    "Can you tell us what happened?",
    "Select type of violence you experienced",
    "Have you reported the incident to the police?",
    "Please tell us where the incident took place",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <Identity formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Gender formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <Age formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return <Time formData={formData} setFormData={setFormData} />;
    } else if (page === 4) {
      return (
        <IncidentDescription formData={formData} setFormData={setFormData} />
      );
    } else if (page === 5) {
      return <TypeOfViolence formData={formData} setFormData={setFormData} />;
    } else if (page === 6) {
      return <ReportedToPolice formData={formData} setFormData={setFormData} />;
    } else {
      return <Places formData={formData} setFormData={setFormData} />;
    }
  };

  const handleclick = () => {
    if (page === 0) {
      if (formData.identity === "") alert("Please Enter Your Identity");
      else setPage((currPage) => currPage + 1);
    } else if (page === 1) {
      if (formData.gender === "") alert("Please Enter Your Gender");
      else setPage((currPage) => currPage + 1);
    } else if (page === 2) {
      if (formData.age === "") alert("Please Enter Your Age");
      else if (formData.age < 15) alert("Please Enter a valid Age");
      else setPage((currPage) => currPage + 1);
    } else if (page === 3) {
      setPage((currPage) => currPage + 1);
    } else if (page === 4) {
      if (formData.title === "" || formData.message === "")
        alert("Please Enter the Valid Description or Title");
      else if (formData.message.length < 20)
        alert(
          `Please enter ${
            20 - formData.message.length
          } more Characters in Description!`
        );
      else if (formData.title.length < 6)
        alert(
          `Please enter ${6 - formData.title.length} more Characters in Title!`
        );
      else setPage((currPage) => currPage + 1);
    } else if (page === 5) {
      if (formData.typeOfViolence === "")
        alert("Please Enter Type Of Violence");
      else setPage((currPage) => currPage + 1);
    } else if (page === 6) {
      if (formData.reportToPolice === "")
        alert("Please Enter a Valid Choice!!");
      else setPage((currPage) => currPage + 1);
    }
    // else {
    //   if (formData.identity === "") alert("Please Enter Your Identity");
    //   else setPage((currPage) => currPage + 1);
    // }
  };

  const checkPage = () => {
    if (page === FormTitles.length - 1) {
      return (
        <Button
          // className="nextBtn navigateBtn"
          onClick={handleSubmit}
        >
          Submit&nbsp;
          {/* <ArrowForwardIcon style={{ fontSize: "20px" }} /> */}
        </Button>
      );
    } else {
      return (
        <Button
          //   className="nextBtn navigateBtn"
          onClick={handleclick}
        >
          Next&nbsp;
          <ArrowForwardIcon style={{ fontSize: "20px" }} />
        </Button>
      );
    }
  };

  return (
    <>
      <div className="Form">
        <div className="form-container">
          <div>
            {" "}
            <ProgressBar done={parseInt(11.6 * page)} />
          </div>
          <h1 className="formTitles">{FormTitles[page]}</h1>
          <div className="body">{PageDisplay()}</div>
          <div className="IncidentFormBtns">
            <Button
              //   className="prevBtn navigateBtn"
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              <ArrowBackIcon style={{ fontSize: "20px" }} />
              &nbsp;Prev
            </Button>
            {checkPage()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
