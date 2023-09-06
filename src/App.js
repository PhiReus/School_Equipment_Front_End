import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LayoutMaster from './layouts/LayoutMaster';
import Login from './includes/Login';
import ForgotPassword from './includes/ForgotPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
