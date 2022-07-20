import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/pages/login";
import Tasks from "./component/pages/tasks";
import AddTask from "./component/pages/AddTask";
import ManageUsers from "./component/pages/ManageUsers";
import SignUp from "./component/pages/SignUp";

function App() {
  //basename="/apps/task/"
  return (
    <BrowserRouter basename="/apps/task/">
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add_task" element={<AddTask />} />
        <Route path="/manage_users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
