import React, { useState } from "react";
import hublogLogo from "../../assets/images/logo-re-3.png";
import { Input } from "antd";
import { IoChevronForward } from "react-icons/io5";
import { FaCheck, FaXmark } from "react-icons/fa6";
import "./styles.css";
export default function Setpassword() {
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
  const [containerVisible, setContainerVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setContainerVisible(true);
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
    if (
      newErrors.lengthError ||
      newErrors.lowercaseError ||
      newErrors.uppercaseError ||
      newErrors.numberError ||
      newErrors.specialCharacterError
    )
      return;

    alert("Success");
  };

  return (
    <div className="freetrial_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />
      <div
        className={
          containerVisible ? "errorsetpassword_card" : "setpassword_card"
        }
      >
        <p
          className="freetrial_signuptext"
          //   onClick={() => setContainerVisible(false)}
        >
          Set password
        </p>
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
            setContainerVisible(true);
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
            height: containerVisible ? "156px" : "auto",
          }}
        >
          <div
            className={
              containerVisible
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
                Password must contain at least one special character (!@#$%^&*
                etc.).
              </p>
            </div>
          </div>
        </div>

        <div
          className={
            containerVisible
              ? "setpassword_submitbuttonContainer"
              : "setpassword_initialsubmitbuttonContainer"
          }
        >
          <button className="setpassword_submitbutton" onClick={handleSubmit}>
            <IoChevronForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
