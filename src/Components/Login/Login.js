import React, { useState, useEffect } from "react";
import logoImg from "../../assets/images/logo-re-3.png";
import Vector from "../../assets/images/vector.png";
import { useNavigate } from "react-router-dom";
import MWService from "../MWService";
import { LoginApi } from "../APIservice.js/action";
import { Input, Row, Col } from "antd";
import "./login.css";
import { CommonToaster } from "../Common/CommonToaster";
import { emailValidator } from "../Common/Validation";
import CommonSpinner from "../Common/CommonSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("Accesstoken");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (buttonDisable) return;

    const emailValidate = emailValidator(email);
    let passwordValidate = "";

    if (password === "") {
      passwordValidate = " Password is required";
    } else if (password < 3) {
      passwordValidate = " Password is not valid";
    } else {
      passwordValidate = "";
    }

    setEmailError(emailValidate);
    setPasswordError(passwordValidate);

    if (emailValidate || passwordValidate) return;

    setButtonDisable(true);
    const request = {
      UserName: email,
      Password: password,
    };
    console.log("login request", request);

    try {
      const response = await LoginApi(request);
      console.log("Loginnn response", response);
      CommonToaster("Login Successfully", "success");
      localStorage.setItem("Accesstoken", response.data.token);
      localStorage.setItem("LoginUserInfo", JSON.stringify(response.data.user));
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log("login error", error);
      CommonToaster(
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        "error"
      );
    } finally {
      setTimeout(() => {
        setButtonDisable(false);
      }, 2000);
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="circle" />
      <div className="login_mainContainer">
        <div className="login_cardContainer">
          <Row gutter={16}>
            <Col span={12} className="login_cardleftContainer">
              {/* <img src={Vector} /> */}
              <div>
                <p className="welcome_heading">Welcome Back!</p>
                <p
                  style={{
                    marginTop: "10px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  To keep connected with us please login
                </p>
              </div>
            </Col>
            <Col span={12} className="login_cardrightContainer">
              <div>
                <div className="loginlogo_container">
                  <img src={logoImg} className="login_logo" />
                </div>
                <p className="signin_heading">Sign in to your account</p>

                <label className="inputfields_label">Email</label>
                <Input
                  className="login_inputfields"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(emailValidator(e.target.value));
                  }}
                  status={emailError ? "error" : ""}
                />
                {emailError && (
                  <p className="login_errormessage">{`Email ${emailError}`}</p>
                )}
                <div style={{ marginTop: "14px" }}>
                  <label className="inputfields_label">Password</label>
                  <Input.Password
                    className="login_inputfields"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value === "") {
                        setPasswordError(" Password is required");
                      } else if (e.target.value.length < 3) {
                        setPasswordError(" Password is not valid");
                      } else {
                        setPasswordError("");
                      }
                    }}
                    status={passwordError ? "error" : ""}
                  />
                  {passwordError && (
                    <p className="login_errormessage">{passwordError}</p>
                  )}
                </div>

                <p className="fotgotpassword_text">Forgot Password?</p>

                <button
                  className={
                    buttonDisable ? "login_buttondisable" : "login_button"
                  }
                  disabled={buttonDisable}
                  onClick={handleLogin}
                >
                  {buttonDisable ? <CommonSpinner /> : "Sign In"}
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="bottom_circle" />
    </div>
  );
};

export default Login;
