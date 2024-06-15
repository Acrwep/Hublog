import React, { useState, useEffect } from "react";
import logoImg from "../../assets/images/logo-re-3.png";
import { useNavigate } from "react-router-dom";
import MWService from "../../components/MWService";
import { LoginApi } from "../../components/APIservice.js/action";
import { Input } from "antd";
import "./login.css";
import { CommonToaster } from "../../components/Common/CommonToaster";
import { emailValidator } from "../../components/Common/Validation";
import CommonSpinner from "../../components/Common/CommonSpinner";

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
      username: email,
      password: password,
    };
    // console.log(request);
    // if (!email || !password) {
    //   setError("Please enter both email and password.");
    //   return;
    // }
    // new MWService()
    //   .login(email, password)
    //   .then((data) => {
    //     console.log("Response:", data);
    //     navigate("/dashboard");
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
      console.log(error);
      CommonToaster(
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setTimeout(() => {
        setButtonDisable(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="login_mainContainer">
        <div className="login_cardContainer">
          <div>
            <div className="loginlogo_container">
              <img src={logoImg} className="login_logo" />
            </div>
            <p className="welcome_heading">Welcome back!</p>
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
              className={buttonDisable ? "login_buttondisable" : "login_button"}
              disabled={buttonDisable}
              onClick={buttonDisable ? "" : handleLogin}
            >
              {buttonDisable ? <CommonSpinner /> : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
