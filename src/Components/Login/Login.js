import React, { useState, useEffect, useRef } from "react";
import logoImg from "../../assets/images/logo-re-3.png";
import { useNavigate } from "react-router-dom";
import { getOrganizations, LoginApi } from "../APIservice.js/action";
import { Input, Row, Col } from "antd";
import "./login.css";
import "../Common/commonstyles.css";
import { CommonToaster } from "../Common/CommonToaster";
import { emailValidator } from "../Common/Validation";
import CommonSpinner from "../Common/CommonSpinner";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [validationTrigger, setValidationTrigger] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const receivedValue = params.get("domain");
    console.log("receiveeeeee", receivedValue, typeof receivedValue);

    const getSubDomainfromLocal = localStorage.getItem("subDomain");

    if (getSubDomainfromLocal === "null" || getSubDomainfromLocal === null) {
      if (receivedValue) {
        localStorage.setItem("subDomain", receivedValue);
        window.location.reload();
      } else {
        window.location.href = process.env.REACT_APP_PORTAL_URL;
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidationTrigger(true);
    if (buttonDisable) return;

    const emailValidate = emailValidator(email);
    let passwordValidate = "";

    if (password === "") {
      passwordValidate = " Password is required";
    } else if (password.length < 3) {
      passwordValidate = " Password is not valid";
    } else {
      passwordValidate = "";
    }

    setEmailError(emailValidate);
    setPasswordError(passwordValidate);

    if (emailValidate || passwordValidate) return;

    setButtonDisable(true);
    const request = {
      userName: email,
      password: password,
    };
    console.log("login request", request);

    try {
      const response = await LoginApi(request);
      console.log("Loginnn response", response);
      // CommonToaster("Login Successfully", "success");
      localStorage.setItem("Accesstoken", response?.data?.token);
      const loginUserInformation = response?.data?.user;

      //store organization Id
      localStorage.setItem(
        "organizationId",
        loginUserInformation.organizationId
      );
      //store role Id
      localStorage.setItem("roleId", loginUserInformation.roleId);
      localStorage.setItem("managerStatus", loginUserInformation.managerStatus);
      if (loginUserInformation.managerStatus === true) {
        localStorage.setItem("managerTeamId", loginUserInformation.teamId);
      } else {
        localStorage.removeItem("managerTeamId");
      }

      //store login information
      localStorage.setItem(
        "LoginUserInfo",
        JSON.stringify(loginUserInformation)
      );

      const event = new Event("localStorageUpdated");
      window.dispatchEvent(event);

      if (
        loginUserInformation.roleId === 3 &&
        loginUserInformation.managerStatus === false
      ) {
        setTimeout(() => {
          navigate("/userdetail");
        }, 500);
      } else if (
        loginUserInformation.roleId === 3 &&
        loginUserInformation.managerStatus === true
      ) {
        setTimeout(() => {
          // navigate("/dashboard");
        }, 500);
      } else {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }

      getOrganizationData(loginUserInformation.organizationId);
    } catch (error) {
      console.log("login error", error);
      CommonToaster(
        error.response?.data || "Something went wrong. Please try again later.",
        "error"
      );
      setTimeout(() => {
        setButtonDisable(false);
      }, 300);
    }
  };

  const getOrganizationData = async (organizationId) => {
    try {
      const response = await getOrganizations();
      console.log("organization response", response);
      const allOrganizations = response?.data;

      const filterLoginOrganization = allOrganizations.filter(
        (f) => f.id === organizationId
      );

      const subDomain = filterLoginOrganization[0].domain;
      localStorage.setItem("subDomain", subDomain);
    } catch (error) {
      console.log("error", error);
    } finally {
      setTimeout(() => {
        setButtonDisable(false);
      }, 300);
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
              <form>
                <div className="loginlogo_container">
                  <img src={logoImg} className="login_logo" />
                </div>
                <p className="signin_heading">Sign in to your account</p>

                <div style={{ position: "relative" }}>
                  <label className="inputfields_label">Email</label>
                  <Input
                    className={
                      emailError
                        ? "login_errorinputfields"
                        : "login_inputfields"
                    }
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationTrigger) {
                        setEmailError(emailValidator(e.target.value));
                      }
                    }}
                    status={emailError ? "error" : ""}
                  />
                  <div
                    className={
                      emailError
                        ? "commoninput_errormessage_activediv"
                        : "commoninput_errormessagediv"
                    }
                  >
                    <p style={{ color: "#ff4d4f", marginTop: "2px" }}>
                      {`Email ${emailError}`}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: "22px", position: "relative" }}>
                  <label className="inputfields_label">Password</label>
                  <Input.Password
                    className={
                      passwordError
                        ? "login_errorinputfields"
                        : "login_passwordinputfield"
                    }
                    name="password"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (validationTrigger) {
                        if (e.target.value === "") {
                          setPasswordError(" Password is required");
                        } else if (e.target.value.length < 3) {
                          setPasswordError(" Password is not valid");
                        } else {
                          setPasswordError("");
                        }
                      }
                    }}
                    status={passwordError ? "error" : ""}
                  />
                  <div
                    className={
                      passwordError
                        ? "commoninput_errormessage_activediv"
                        : "commoninput_errormessagediv"
                    }
                  >
                    <p style={{ color: "#ff4d4f", marginTop: "2px" }}>
                      {passwordError}
                    </p>
                  </div>
                </div>

                <div className="login_fotgotpassworddiv">
                  <p
                    className="fotgotpassword_text"
                    onClick={() => navigate("/setpassword")}
                  >
                    Forgot Password?
                  </p>
                </div>

                <button
                  className={
                    buttonDisable ? "login_buttondisable" : "login_button"
                  }
                  type="submit"
                  disabled={buttonDisable}
                  onClick={handleLogin}
                >
                  {buttonDisable ? <CommonSpinner /> : "Sign In"}
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <div className="bottom_circle" />
    </div>
  );
};

export default Login;
