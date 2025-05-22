import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Halaman utama login */}
        <Route path="/register" element={<Register />} /> {/* Halaman register */}
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <Dashboard />
          </>
        } />
        <Route path="/add" element={
          <>
            <Navbar />
            <AddNote />
          </>
        } />
        <Route path="/edit/:id" element={
          <>
            <Navbar />
            <EditNote />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
