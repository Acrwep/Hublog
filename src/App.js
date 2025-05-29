import "./App.css";
import React, { useEffect } from "react";
import SidebarMenu from "./Layout/SidebarMenu";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/store";

function App() {
  //hide console and errors in the production
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
  }

  useEffect(() => {
    const getItem = localStorage.getItem("LoginUserInfo");
    console.log("app.jssssssssssss", getItem);
  }, []);

  return (
    // declare redux store
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <SidebarMenu />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={false}
          pauseOnHover={true}
          theme="light"
        />
      </div>
    </Provider>
  );
}

export default App;
