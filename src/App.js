import UserEdit from "./pages/users/UserEdit";
import Cart from './pages/Cart';
import { Route, Routes } from "react-router-dom";
// import Home from './pages/Home';
import LayoutMaster from "./layouts/LayoutMaster";
import Borrow from "./pages/Borrow";
import Device from "./pages/DeviceList";
import Login from "./includes/Login";
import ForgotPassword from "./includes/ForgotPassword";
import UserProfile from "./pages/users/UserProfile";

function App() {
  return (
    <>
      <Routes>
      <Route path="/Cart" element={<Cart/>}></Route>
        <Route path="/users/profile" element={<UserProfile />}></Route>
        <Route path="/users/update-profile" element={<UserEdit />}></Route>
        <Route path="/Borrows" element={<Borrow />}></Route>
        <Route path="/Devices" element={<Device />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
