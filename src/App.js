import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CitySelector from "./components/CitySelector";

import Newsletter from "./components/Newsletter";
import AdminPage from "./components/AdminPage";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // Check if the current route is /select-city
  const isCitySelectorPage = location.pathname === "/select-city";
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="App min-h-screen bg-gradient-to-r from-slate-200 to-slate-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-city" element={<CitySelector />} />

          <Route path="/admin" element={<AdminPage />} />
        
        </Routes>
      </main>
      {!isCitySelectorPage && !isAdminPage && <Gallery />}
      {!isCitySelectorPage && !isAdminPage && <Newsletter />}
      {!isCitySelectorPage && !isAdminPage && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
