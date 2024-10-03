import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Competitions from "./components/Competitions";
import Workshops from "./components/Workshops";
import Contact from "./components/Contact";
import About from "./components/About";
import Account from "./components/Account";
import { BrowserRouter, Outlet } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import FormSolo from "./components/FormSolo";
import CheckOut from "./components/CheckOut";
import FormTeam from "./components/FormTeam";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";  // Import Footer

export default function App() {
  const auth = getAuth();
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setlogged(false);
      } else if (user?.emailVerified) {
        setlogged(true);
      } else {
        setlogged(false);
      }
    });
  }, []);

  const PrivateRoutes = () => {
    return auth?.currentUser ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <div className="bg-black h-full flex flex-col min-h-screen">
        <NavBar logged={logged} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home logged={logged} />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/form" element={<FormSolo />} />
              <Route path="/forms" element={<FormTeam />} />
            </Route>
          </Routes>
        </div>
        <Footer /> {/* Add Footer */}
      </div>
    </BrowserRouter>
  );
}
