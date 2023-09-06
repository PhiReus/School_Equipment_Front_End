import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LayoutMaster from './layouts/LayoutMaster';
import Borrow from './pages/borrows/Borrow';
import BorrowCreate from './pages/borrows/BorrowCreate';
import Login from './includes/Login';
import ForgotPassword from './includes/ForgotPassword';

function App() {
  return (
    <>
      <Routes>
      <Route path="/Borrows" element={<Borrow/>}></Route>
      <Route path="/Borrows/create" element={<BorrowCreate/>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
