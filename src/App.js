import UserList from "./pages/users/UserList";
import UserEdit from "./pages/users/UserEdit";
import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import LayoutMaster from './layouts/LayoutMaster';
import Borrow from './pages/Borrow';
import Device from './pages/DeviceList';
import BorrowCreate from './pages/borrows/BorrowCreate';
import Login from './includes/Login';
import ForgotPassword from './includes/ForgotPassword';
import UserProfile from "./pages/users/UserProfile";


function App() {
  return (
    <>
      <Routes>
      <Route path="/Borrows" element={<Borrow/>}></Route>
      <Route path="/Devices" element={<Device/>}></Route>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/" element={<UserList />}></Route>
        <Route path="/users/:id/edit" element={<UserEdit />}></Route>
        <Route path="/users/:id" element={<UserProfile />}></Route>
        <Route path="/Borrows" element={<Borrow/>}></Route>
        <Route path="/Borrows/create" element={<BorrowCreate/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
