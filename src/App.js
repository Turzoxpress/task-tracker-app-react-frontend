import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/pages/login";
import Tasks from "./component/pages/tasks";
import AddTask from "./component/pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add_task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
