import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Car } from "./pages/car/Car";
import { Moto } from "./pages/motocicler/Moto";
import Finance from "./pages/finance/Finance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <main className="w-full h-screen flex flex-col bg-slate-50">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car" element={<Car />} />
          <Route path="/moto" element={<Moto />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
