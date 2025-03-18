import React from "react";
import Logo from "../../assets/images/logo-re-3.png";

export default function UsercreateMail() {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #D2D1D6",
          padding: "19px 12px",
          width: "70%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} style={{ width: "120px", marginTop: "6px" }} />
        </div>
        {/* <hr style={{ marginTop: "16px", borderColor: "0.5px solid #D2D1D6" }} /> */}
        <div
          style={{
            borderBottom: "1px solid rgb(210, 209, 214)",
            marginTop: "16px",
          }}
        />

        <p style={{ fontWeight: "600", marginTop: "20px" }}>Dear Balaji,</p>
        <p style={{ marginTop: "6px", lineHeight: "24px" }}>
          We are pleased to inform you that your employee account has been
          successfully created at Hublog. You can now access your account and
          begin using our platform.
        </p>
        <p style={{ marginTop: "12px" }}>Here are your login details:</p>
        <ul style={{ marginTop: "6px" }}>
          <li style={{ marginBottom: "6px" }}>
            <span style={{ fontWeight: "600" }}>Email:</span> balaji@gmail.com
          </li>
          <li style={{ marginBottom: "6px" }}>
            <span style={{ fontWeight: "600" }}>Login URL:</span>{" "}
            <a
              href="https://hublog.org/login"
              target="_blank"
              style={{ textDecoration: "underline", color: "#007ff0" }}
            >
              https://hublog.org/login
            </a>
          </li>
          <li>
            <span style={{ fontWeight: "600" }}>Download App URL:</span>{" "}
            <a
              href="https://hublog.org/downloads"
              target="_blank"
              style={{ textDecoration: "underline", color: "#007ff0" }}
            >
              https://hublog.org/downloads
            </a>
          </li>
        </ul>

        <p
          style={{ marginTop: "16px", fontSize: "14px", marginBottom: "16px" }}
        >
          If you have any questions or need assistance, feel free to reach out
          to our support team at hublog@gmail.com.
        </p>

        <div style={{ fontSize: "14px" }}>
          <p>Best Regards,</p>
          <p>Hublog Team</p>
        </div>
      </div>
    </div>
  );
}
