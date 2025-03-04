import React, { useEffect, useState } from "react";
import hublogLogo from "../../assets/images/logo-re-3.png";
import congratsImage from "../../assets/images/congrats.jpg";
import { PiSealCheckFill } from "react-icons/pi";
import "./styles.css";

export default function Congrats() {
  const confettiTypes = [
    "confetti--animation-slow",
    "confetti--animation-medium",
    "confetti--animation-fast",
  ];

  const [confettiArray, setConfettiArray] = useState([]);

  useEffect(() => {
    // Generate new confetti array with unique keys to force re-rendering
    setConfettiArray(
      [...Array(50)].map((_, i) => ({
        id: i,
        type: confettiTypes[i % 3],
        left: `${Math.random() * 100}vw`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        animationDelay: `${Math.random() * 2}s`,
      }))
    );
  }, []);

  return (
    <div className="freetrial_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />
      <div className="confetti-container">
        {confettiArray.map((confetti) => (
          <div
            key={confetti.id}
            className={`confetti ${confetti.type}`}
            style={{
              left: confetti.left,
              width: confetti.width,
              height: confetti.height,
              backgroundColor: confetti.backgroundColor,
              animationDelay: confetti.animationDelay,
            }}
          ></div>
        ))}
      </div>

      <div className="congrats_card">
        <div className="congrats_imageContainer">
          <img className="congrats_image" src={congratsImage} />
          <PiSealCheckFill
            color="#009737"
            size={65}
            className="congrats_icon"
          />
        </div>
        <p className="freetrial_signuptext">Congratulations</p>
        <p className="congrats_text">
          You have successfully created an account on hublog.org
        </p>
        <button className="congrats_submitbutton">Go to your dashboard</button>
      </div>
    </div>
  );
}
