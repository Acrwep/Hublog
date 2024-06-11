
import './App.css';
import Route from "./layout/Route"
import { BrowserRouter } from 'react-router-dom';
import SidebarForm from './pages/setting/AddUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <SidebarForm showAddUser={true} setShowAddUser={()=>{}}/> */}
    <Route />
    </BrowserRouter>
    </div>
  );
}

export default App;
