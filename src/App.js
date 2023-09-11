import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './includes/Login';
import UserList from './pages/users/UserList';
import UserEdit from './pages/users/UserEdit';
import UserProfile from './pages/users/UserProfile';
import Borrow from './pages/Borrow';
import Device from './pages/DeviceList';
import BorrowCreate from './pages/borrows/BorrowCreate';
import ForgotPassword from './includes/ForgotPassword';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/Borrows" element={<Borrow />} />
          <Route path="/Devices" element={<Device />} />
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/Borrows/create" element={<BorrowCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;