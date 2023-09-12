import UserEdit from "./pages/users/UserEdit";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Borrow from "./pages/Borrow";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserProfile from "./pages/users/UserProfile";
import DeviceList from "./pages/DeviceList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DeviceList />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/users/profile" element={<UserProfile />}></Route>
        <Route path="/users/update-profile" element={<UserEdit />}></Route>
        <Route path="/Borrows" element={<Borrow />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/Devices" element={<DeviceList />}></Route>
      </Routes>
    </>
  );
}

export default App;
