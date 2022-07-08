import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/pages/login";
import Tasks from "./component/pages/tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
