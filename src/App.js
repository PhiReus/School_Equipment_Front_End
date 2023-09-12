
import UserEdit from "./pages/users/UserEdit";
import Cart from './pages/Cart';
import { Route, Routes } from "react-router-dom";
import LayoutMaster from "./layouts/LayoutMaster";
import Borrow from "./pages/Borrow";
import DeviceList from "./pages/DeviceList";
import Login from "./includes/Login";
import ForgotPassword from "./includes/ForgotPassword";
import UserProfile from "./pages/users/UserProfile";

function App() {
  return (
    <>
      <Routes>
      <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/users/profile" element={<UserProfile />}></Route>
        <Route path="/users/update-profile" element={<UserEdit />}></Route>
        <Route path="/borrows" element={<Borrow />}></Route>
        <Route path="/" element={<DeviceList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;