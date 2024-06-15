/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./login.css";
import logoImg from "../../assets/images/logo-re-3.png";
// import linkdin from "../../assets/images/linkedin.svg"
// import Google from "../../assets/images/google.svg"
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MWService from "../../components/MWService";
import { LoginApi } from "../../components/APIservice.js/action";
import { Row, Col, Input } from "antd";
import CommonInputField from "../../components/Common/CommonInputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("Accesstoken");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const request = {
      username: email,
      password: password,
    };
    console.log(request);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    new MWService()
      .login(email, password)
      .then((data) => {
        console.log("Response:", data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // try {
    //   const response = await LoginApi(request);
    //   console.log("Loginnn response", response);
    //   localStorage.setItem("Accesstoken", response.data.token);
    //   localStorage.setItem("LoginUserInfo", JSON.stringify(response.data.user));
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    // <div className="w-full h-screen flex items-center justify-center backgroundImg">
    //   <div className="max-w-md w-full space-y-8 relative">
    //     <div className=" w-40 mx-auto mt-5">
    //       <img src={logoImg} alt="logoImg" className="  " />
    //     </div>
    //     <div className="bg-green-700 bg-opacity-60 shadow-md rounded-lg p-8">
    //       <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
    //         <span className="text-white">Sign </span>
    //         <span className="text-white">In</span>
    //       </h2>
    //       <form className="space-y-6 mx-auto">
    //         <div className="w-full mx-8">
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email
    //           </label>
    //           <input
    //             type="email"
    //             onChange={(e) => setEmail(e.target.value)}
    //             autoComplete="email"
    //             placeholder="Email"
    //             className="block w-[80%] h-10 px-2 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded shadow-sm transition duration-150 ease-in-out emailinput"
    //             required
    //           />
    //         </div>
    //         <div className="w-full mx-8">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="block w-[80%] h-10 px-2 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 transition duration-150 ease-in-out passwordinput"
    //           />
    //         </div>
    //         {error && <p className="text-xl text-red-600">{error}</p>}
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center">
    //             <input
    //               id="remember-me"
    //               name="remember-me"
    //               type="checkbox"
    //               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //             />
    //             <label
    //               htmlFor="remember-me"
    //               className="ml-2 block text-sm text-gray-900"
    //             >
    //               Remember me
    //             </label>
    //           </div>
    //           <div className="text-sm">
    //             <a
    //               href="#"
    //               className="font-medium text-indigo-600 hover:text-indigo-500"
    //             >
    //               Forgot your password?
    //             </a>
    //           </div>
    //         </div>
    //         <div>
    //           <div className="w-full mx-8">
    //             <input
    //               type="submit"
    //               onClick={handleLogin}
    //               value="Sign In"
    //               className="uppercase w-[80%] tracking-wide bg-gradient-to-b from-blue-600 to-blue-300 h-10 border border-purple-600 rounded-xl cursor-pointer"
    //               min="6"
    //               required
    //             />
    //           </div>
    //         </div>
    //       </form>
    //       <div className="mt-6 flex justify-around relative border-t-2">
    //         <div className="absolute top-0 left-1/2 translate-x-[-50%] transform -translate-y-2/4 bg-white py-1 px-2 text-sm font-light text-gray-400 whitespace-nowrap">
    //           OR
    //         </div>
    //         <button className="px-5 py-1 mt-7 border rounded-md hover:bg-gray-100">
    //           <FcGoogle className="text-3xl" />
    //         </button>
    //         <button className="px-5 py-1 mt-7 border rounded-md hover:bg-gray-100">
    //           <FaLinkedinIn className="text-2xl text-blue-800" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ marginTop: "14px" }}>
              <label className="inputfields_label">Password</label>
              <Input.Password
                className="login_inputfields"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="fotgotpassword_text">Forgot Password?</p>

            <button className="login_button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
