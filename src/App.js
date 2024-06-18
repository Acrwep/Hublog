import "./App.css";
import Route from "./layout/Route";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarForm from "./pages/setting/AddUser";

function App() {
  // const accessToken = localStorage.getItem("Accesstoken");
  // console.log("Access Token:::::", accessToken);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <SidebarForm showAddUser={true} setShowAddUser={()=>{}}/> */}
        <Route />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1700}
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
  );
}

export default App;
