import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LayoutMaster from './layouts/LayoutMaster';

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  );
}

export default App;
