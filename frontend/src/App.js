import "./App.css";
import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import FullFeaturedCrudGrid from "./components/DataGrid";
import Dashboard from "./components/Header/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import Footer from "./components/Header/Footer";
import MyCarList from "./pages/CarList";
import Protected from "./components/Protected";
import EditCar from "./pages/EditCar";
import CarDetail from "./pages/CarDetail";
import HomePage from "./pages/Home";
import AddNewCar from "./pages/AddNewCar";
import Bar from "./components/Bar";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/carlist" element={<MyCarList />} />
        <Route element={<Protected />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editCar/:carId" element={<EditCar />} />
        <Route path="/cardetail/:carId" element={<CarDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addnewcar" element={<AddNewCar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
