import { Route, Routes } from "react-router-dom";
import UserList from "./pages/users/UserList";
import UserEdit from "./pages/users/UserEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserList />}></Route>
        <Route path="/users/:id/edit" element={<UserEdit />}></Route>
      </Routes>
    </>
  );
}

export default App;
