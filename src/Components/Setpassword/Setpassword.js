import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hublogLogo from "../../assets/images/logo-re-3.png";
import { Input, Spin } from "antd";
import "./styles.css";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  OtpValidate,
  sendOTP,
  updatePassword,
  userEmailValidate,
} from "../APIservice.js/action";
import { IoChevronForward } from "react-icons/io5";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CommonToaster } from "../Common/CommonToaster";
import { LoadingOutlined } from "@ant-design/icons";

export default function Setpassword() {
  const navigate = useNavigate();
  const [iconVisible, setIconVisible] = useState(false);
  const [otpIconVisible, setOtpIconVisible] = useState(false);
  const [confirmIconVisible, setconfirmIconVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState([
    {
      id: 1,
      lengthError: "",
      lowercaseError: "",
      uppercaseError: "",
      numberError: "",
      specialCharacterError: "",
    },
  ]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEightcharacters, setIsEightcharacters] = useState(false);
  const [isContainlowercase, setIsContainlowercase] = useState(false);
  const [isContainuppercase, setIsContainuppercase] = useState(false);
  const [isContainNumber, setIsContainNumber] = useState(false);
  const [isContainSpecial, setIsContainSpecial] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [confirmPassword, setConfirmPassoword] = useState("");
  const [confirmPassowrdError, setConfirmPassowrdError] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [otpValidationStatus, setOtpValidationStatus] = useState(false);
  const [passwordValidationStatus, setPasswordValidationStatus] =
    useState(false);

  const [showEmailField, setShowEmailField] = useState(true);
  const [showCodeField, setShowCodeField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailSubmitLoading, setEmailSubmitLoading] = useState(false);
  const [otpSubmitLoading, setOtpSubmitLoading] = useState(false);
  const [passwordSubmitLoading, setPasswordSubmitLoading] = useState(false);

  const handleEmail = async (e) => {
    setEmail(e.target.value);

    if (emailValidationStatus === true) {
      setTimeout(async () => {
        try {
          const response = await userEmailValidate(e.target.value);
          console.log(response);
          setIsEmailValidate(true);
          setEmailError("");
        } catch (error) {
          console.log(error);
          setEmailError(error?.response?.data?.message);
          setIsEmailValidate(false);
        }
      }, 150);
    }
  };

  const handleOTP = (e) => {
    setOtp(e.target.value);
  };

  const handleRetypePassword = (e) => {
    const value = e.target.value;
    setConfirmPassoword(value);

    if (passwordValidationStatus === true) {
      if (value.length <= 0) {
        setConfirmPassowrdError("Confirm password is required");
      } else if (password === value) {
        setConfirmPassowrdError("");
      } else {
        setConfirmPassowrdError("Password is mismatch");
      }
    }
  };

  const handleEmailSubmit = async () => {
    setEmailValidationStatus(true);
    if (email.length <= 0) {
      setIconVisible(true);
      setEmailError("Email is required.");
      return;
    }
    setEmailSubmitLoading(true);
    try {
      const response = await userEmailValidate(email);
      console.log(response);
      setIsEmailValidate(true);
      setIconVisible(true);
      setEmailError("");
      setTimeout(() => {
        handleSendOTP();
      }, 300);
    } catch (error) {
      console.log(error);
      setEmailError(error?.response?.data?.message);
      setIsEmailValidate(false);
      setIconVisible(true);
      setTimeout(() => {
        setEmailSubmitLoading(false);
      }, 300);
    }
  };

  const handleSendOTP = async () => {
    const payload = {
      email: email,
    };
    try {
      await sendOTP(payload);
      setShowEmailField(false);
      setShowCodeField(true);
      CommonToaster("OTP is sent to your email", "success");
    } catch (error) {
      console.log(error);
      CommonToaster("Unable to send OTP. Try agin later", "error");
    } finally {
      setEmailSubmitLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setOtpIconVisible(true);
    setOtpValidationStatus(true);
    if (otp.length <= 0) {
      setOtpError("otp is required");
      return;
    } else {
      setOtpError("");
    }

    setOtpSubmitLoading(true);
    const payload = {
      emailId: email,
      otp: otp,
    };
    try {
      const response = await OtpValidate(payload);
      console.log(response);
      setShowCodeField(false);
      setShowPasswordField(true);
    } catch (error) {
      console.log(error);
      setOtpError("otp is not valid");
    } finally {
      setTimeout(() => {
        setOtpSubmitLoading(false);
      }, 300);
    }
  };

  const handlePasswordSubmit = async () => {
    setPasswordValidationStatus(true);
    setPasswordErrorVisible(true);
    setconfirmIconVisible(true);
    console.log("error", passwordError);

    const isTooShort = password.length < 8;
    const isMissingLowercase = !/[a-z]/.test(password);
    const isMissingUppercase = !/[A-Z]/.test(password);
    const isMissingNumber = !/\d/.test(password);
    const isMissingSpecialChar = !/[\W_]/.test(password);

    // Construct error messages
    const newErrors = {
      lengthError: isTooShort
        ? "❌ Password must be at least 8 characters long."
        : "",
      lowercaseError: isMissingLowercase
        ? "❌ Password must contain at least one lowercase letter."
        : "",
      uppercaseError: isMissingUppercase
        ? "❌ Password must contain at least one uppercase letter."
        : "",
      numberError: isMissingNumber
        ? "❌ Password must contain at least one digit."
        : "",
      specialCharacterError: isMissingSpecialChar
        ? "❌ Password must contain at least one special character (!@#$%^&* etc.)."
        : "",
    };

    setPasswordError([newErrors]);

    if (newErrors.lengthError) {
      setIsEightcharacters(false);
    } else {
      setIsEightcharacters(true);
    }
    if (newErrors.lowercaseError) {
      setIsContainlowercase(false);
    } else {
      setIsContainlowercase(true);
    }
    if (newErrors.uppercaseError) {
      setIsContainuppercase(false);
    } else {
      setIsContainuppercase(true);
    }
    if (newErrors.numberError) {
      setIsContainNumber(false);
    } else {
      setIsContainNumber(true);
    }
    if (newErrors.specialCharacterError) {
      setIsContainSpecial(false);
    } else {
      setIsContainSpecial(true);
    }
    let confirmPasswordValidate = "";

    if (confirmPassword.length <= 0) {
      confirmPasswordValidate = "Confirm password is required";
    } else if (password != confirmPassword) {
      confirmPasswordValidate = "Password is mismatch";
    } else {
      confirmPasswordValidate = "";
    }
    setConfirmPassowrdError(confirmPasswordValidate);
    if (
      newErrors.lengthError ||
      newErrors.lowercaseError ||
      newErrors.uppercaseError ||
      newErrors.numberError ||
      newErrors.specialCharacterError ||
      confirmPasswordValidate
    )
      return;

    setPasswordSubmitLoading(true);
    const payload = {
      email: email,
      newPassword: password,
    };
    try {
      await updatePassword(payload);
      CommonToaster("Password updated", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      CommonToaster(error?.response?.data?.message);
    } finally {
      setPasswordSubmitLoading(false);
    }
  };

  return (
    <div className="setpassword_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />
      <div className="emailvalidate_card">
        <p className="setpassword_emailtext">Set password</p>

        <div style={{ position: "relative" }}>
          <div
            className={
              showEmailField
                ? "setpassword_emailfielddiv_show"
                : "setpassword_emailfielddiv_hide"
            }
          >
            <p className="setpassword_emaillabel">Email</p>
            <Input
              className={
                emailError === ""
                  ? "setpassword_inputfield"
                  : "setpassword_errorinputfield"
              }
              onChange={handleEmail}
              value={email}
            />
            <p
              className={
                emailError === ""
                  ? "setpassword_emailerror_hide"
                  : "setpassword_emailerror_visible"
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
                iconVisible && isEmailValidate
                  ? "setpassword_emailcheckicon_visible"
                  : "setpassword_emailcheckicon_hide"
              }
            />

            <FaCircleXmark
              size={19}
              color="rgb(252, 48, 52)"
              className={
                iconVisible && isEmailValidate === false
                  ? "setpassword_xicon_visible"
                  : "setpassword_xicon_hide"
              }
            />
          </div>

          <div
            className={
              showCodeField
                ? "setpassword_otpfielddiv_show"
                : "setpassword_otpfielddiv_hide"
            }
          >
            <p className="setpassword_emaillabel">OTP</p>
            <Input
              className={
                otpError === ""
                  ? "setpassword_inputfield"
                  : "setpassword_errorinputfield"
              }
              onChange={handleOTP}
              value={otp}
              maxLength={6}
            />
            <p
              className={
                otpError === ""
                  ? "setpassword_emailerror_hide"
                  : "setpassword_emailerror_visible"
              }
            >
              {otpError}
            </p>
            <FaCircleCheck
              size={19}
              color="#009737"
              className={
                otpIconVisible && otpError === ""
                  ? "setpassword_emailcheckicon_visible"
                  : "setpassword_emailcheckicon_hide"
              }
            />

            <FaCircleXmark
              size={19}
              color="rgb(252, 48, 52)"
              className={
                otpIconVisible && otpError != ""
                  ? "setpassword_xicon_visible"
                  : "setpassword_xicon_hide"
              }
            />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            className={
              showPasswordField
                ? "setpassword_passworddiv_show"
                : "setpassword_passworddiv_hide"
            }
          >
            <div style={{ marginTop: "22px" }}>
              <p className="setpassword_emaillabel">Password</p>
              <Input.Password
                className="setpassword_inputfield"
                name="password"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErrorVisible(true);
                  if (passwordValidationStatus === true) {
                    if (confirmPassword.length <= 0) {
                      setConfirmPassowrdError("Confirm password is required");
                    } else if (e.target.value === confirmPassword) {
                      setConfirmPassowrdError("");
                    } else {
                      setConfirmPassowrdError("Password is mismatch");
                    }
                  }
                  // Validation checks
                  const isTooShort = e.target.value.length < 8;
                  const isMissingLowercase = !/[a-z]/.test(e.target.value);
                  const isMissingUppercase = !/[A-Z]/.test(e.target.value);
                  const isMissingNumber = !/\d/.test(e.target.value);
                  const isMissingSpecialChar = !/[\W_]/.test(e.target.value);

                  // Construct error messages
                  const newErrors = {
                    lengthError: isTooShort
                      ? "❌ Password must be at least 8 characters long."
                      : "",
                    lowercaseError: isMissingLowercase
                      ? "❌ Password must contain at least one lowercase letter."
                      : "",
                    uppercaseError: isMissingUppercase
                      ? "❌ Password must contain at least one uppercase letter."
                      : "",
                    numberError: isMissingNumber
                      ? "❌ Password must contain at least one digit."
                      : "",
                    specialCharacterError: isMissingSpecialChar
                      ? "❌ Password must contain at least one special character (!@#$%^&* etc.)."
                      : "",
                  };

                  // Update password error state in one go
                  setPasswordError([newErrors]);

                  // Update validation state
                  setIsEightcharacters(isTooShort ? false : true);
                  setIsContainlowercase(isMissingLowercase ? false : true);
                  setIsContainuppercase(isMissingUppercase ? false : true);
                  setIsContainNumber(isMissingNumber ? false : true);
                  setIsContainSpecial(isMissingSpecialChar ? false : true);
                }}
              />

              <div
                style={{
                  height: "auto",
                }}
              >
                <div
                  className={
                    passwordErrorVisible
                      ? "setpassword_errormainContainer_show"
                      : "setpassword_errormainContainer"
                  }
                >
                  <div className="setpassword_errordiv">
                    <FaCheck
                      color="#25a17d"
                      size={16}
                      className={
                        isEightcharacters
                          ? "setpassword_checkicon_visible"
                          : "setpassword_checkicon_hide"
                      }
                    />
                    <FaXmark
                      color="#ff4d4f"
                      size={16}
                      className={
                        isEightcharacters === false
                          ? "setpassword_wrongicon_visible"
                          : "setpassword_wrongicon_hide"
                      }
                    />
                    <p>Password must be at least 8 characters long.</p>
                  </div>

                  <div className="setpassword_errordiv">
                    <FaCheck
                      color="#25a17d"
                      size={16}
                      className={
                        isContainlowercase
                          ? "setpassword_checkicon_visible"
                          : "setpassword_checkicon_hide"
                      }
                    />
                    <FaXmark
                      color="#ff4d4f"
                      size={16}
                      className={
                        isContainlowercase === false
                          ? "setpassword_wrongicon_visible"
                          : "setpassword_wrongicon_hide"
                      }
                    />
                    <p>Password must contain at least one lowercase letter.</p>
                  </div>

                  <div className="setpassword_errordiv">
                    <FaCheck
                      color="#25a17d"
                      size={16}
                      className={
                        isContainuppercase
                          ? "setpassword_checkicon_visible"
                          : "setpassword_checkicon_hide"
                      }
                    />
                    <FaXmark
                      color="#ff4d4f"
                      size={16}
                      className={
                        isContainuppercase === false
                          ? "setpassword_wrongicon_visible"
                          : "setpassword_wrongicon_hide"
                      }
                    />
                    <p>Password must contain at least one uppercase letter.</p>
                  </div>

                  <div className="setpassword_errordiv">
                    <FaCheck
                      color="#25a17d"
                      size={16}
                      className={
                        isContainNumber
                          ? "setpassword_checkicon_visible"
                          : "setpassword_checkicon_hide"
                      }
                    />
                    <FaXmark
                      color="#ff4d4f"
                      size={16}
                      className={
                        isContainNumber === false
                          ? "setpassword_wrongicon_visible"
                          : "setpassword_wrongicon_hide"
                      }
                    />
                    <p>Password must contain at least one digit.</p>
                  </div>

                  <div className="setpassword_errordiv">
                    <FaCheck
                      color="#25a17d"
                      size={16}
                      className={
                        isContainSpecial
                          ? "setpassword_checkicon_visible"
                          : "setpassword_checkicon_hide"
                      }
                    />
                    <FaXmark
                      color="#ff4d4f"
                      size={16}
                      className={
                        isContainSpecial === false
                          ? "setpassword_wrongicon_visible"
                          : "setpassword_wrongicon_hide"
                      }
                    />
                    <p>
                      Password must contain at least one special character
                      (!@#$%^&* etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="setpassword_inputContainer"
              style={{ marginTop: passwordErrorVisible ? "16px" : "22px" }}
            >
              <p className="setpassword_emaillabel">Confirm password</p>
              <Input
                className={
                  confirmPassowrdError === ""
                    ? "setpassword_retypeinputfield"
                    : "setpassword_errorretypeinputfield"
                }
                onChange={handleRetypePassword}
                value={confirmPassword}
              />
              <p
                className={
                  confirmPassowrdError === ""
                    ? "setpassword_emailerror_hide"
                    : "setpassword_emailerror_visible"
                }
              >
                {confirmPassowrdError != "" ? confirmPassowrdError : ""}
              </p>
              <FaCircleCheck
                size={19}
                color="#009737"
                className={
                  confirmIconVisible && confirmPassowrdError === ""
                    ? "setpassword_emailcheckicon_visible"
                    : "setpassword_emailcheckicon_hide"
                }
              />

              <FaCircleXmark
                size={19}
                color="rgb(252, 48, 52)"
                className={
                  confirmIconVisible && confirmPassowrdError != ""
                    ? "setpassword_xicon_visible"
                    : "setpassword_xicon_hide"
                }
              />
            </div>
          </div>
        </div>

        {showEmailField ? (
          <div>
            {emailSubmitLoading ? (
              <button className="setpassword_loadingsubmitbutton">
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{ marginRight: "9px", color: "#ffffff" }}
                    />
                  }
                  size="default"
                />{" "}
                Loading...
              </button>
            ) : (
              <button
                className="setpassword_submitbutton"
                onClick={handleEmailSubmit}
              >
                Generate OTP
              </button>
            )}
          </div>
        ) : showCodeField ? (
          <div>
            {otpSubmitLoading ? (
              <button className="setpassword_loadingsubmitbutton">
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{ marginRight: "9px", color: "#ffffff" }}
                    />
                  }
                  size="default"
                />{" "}
                Loading...
              </button>
            ) : (
              <button
                className="setpassword_submitbutton"
                onClick={handleOTPSubmit}
              >
                <IoChevronForward size={24} />
              </button>
            )}
          </div>
        ) : showPasswordField ? (
          <div>
            {passwordSubmitLoading ? (
              <button className="setpassword_loadingsubmitbutton">
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{ marginRight: "9px", color: "#ffffff" }}
                    />
                  }
                  size="default"
                />{" "}
                Loading...
              </button>
            ) : (
              <button
                className="setpassword_submitbutton"
                onClick={handlePasswordSubmit}
              >
                <IoChevronForward size={24} />
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
