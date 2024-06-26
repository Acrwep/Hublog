import "./App.css";
import React from "react";
import Route from "./layout/Route";
import SidebarMenu from "./layout/SidebarMenu";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarForm from "./pages/setting/AddUser";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";

function App() {
  // const accessToken = localStorage.getItem("Accesstoken");
  // console.log("Access Token:::::", accessToken);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <Route /> */}
          <SidebarMenu />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Provider>
  );
}

export default App;
