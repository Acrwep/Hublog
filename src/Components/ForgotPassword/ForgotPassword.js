import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hublogLogo from "../../assets/images/logo-re-3.png";
import { Input } from "antd";
import "./styles.css";
import { IoChevronForward } from "react-icons/io5";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import CommonInputField from "../Common/CommonInputField";
import { userEmailValidate } from "../APIservice.js/action";
import { emailValidator } from "../Common/Validation";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [iconVisible, setIconVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmail = async (e) => {
    setEmail(e.target.value);
    setIconVisible(true);

    setTimeout(async () => {
      try {
        const response = await userEmailValidate(e.target.value);
        console.log(response);
        setIsValidate(true);
        setEmailError("");
      } catch (error) {
        console.log(error);
        setEmailError(error?.response?.data?.message);
        setIsValidate(false);
      }
    }, 350);
  };

  const handleSubmit = async () => {
    setIconVisible(true);
    try {
      const response = await userEmailValidate(email);
      console.log(response);
      setIsValidate(true);
      setEmailError("");
      navigate("/setpassword", {
        state: { userEmail: email },
      });
    } catch (error) {
      console.log(error);
      setEmailError(error?.response?.data?.message);
      setIsValidate(false);
    }
  };

  return (
    <div className="forgotpassword_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />
      <div className="emailvalidate_card">
        <p className="forgotpassword_emailtext">Enter Your Email</p>
        <div className="forgotpassword_inputContainer">
          <Input
            className={
              emailError === ""
                ? "forgotpassword_inputfield"
                : "forgotpassword_errorinputfield"
            }
            onChange={handleEmail}
            value={email}
          />
          <p
            className={
              emailError === ""
                ? "forgotpassword_emailerror_hide"
                : "forgotpassword_emailerror_visible"
            }
          >
            {emailError === "Email is required."
              ? "Email is required"
              : "Email is not valid"}
          </p>
          <FaCircleCheck
            size={19}
            color="#009737"
            className={
              iconVisible && isValidate
                ? "forgotpassword_checkicon_visible"
                : "forgotpassword_checkicon_hide"
            }
          />

          <FaCircleXmark
            size={19}
            color="rgb(252, 48, 52)"
            className={
              iconVisible && isValidate === false
                ? "forgotpassword_xicon_visible"
                : "forgotpassword_xicon_hide"
            }
          />
        </div>
        <div>
          <button
            className="forgotpassword_submitbutton"
            onClick={handleSubmit}
          >
            <IoChevronForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
