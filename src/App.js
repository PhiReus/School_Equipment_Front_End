import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LayoutMaster from './layouts/LayoutMaster';
import Borrow from './pages/borrows/Borrow';
import BorrowCreate from './pages/borrows/BorrowCreate';

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/Borrows" element={<Borrow/>}></Route>
      <Route path="/Borrows/create" element={<BorrowCreate/>}></Route>
      </Routes>
    </>
  );
}

export default App;
