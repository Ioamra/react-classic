import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthModal from "./components/auth-modal";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./context/theme-context";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/public/home";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"login" | "register">("login");

  const openModal = (tab: "login" | "register") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider>
      <Navbar openModal={openModal} />
      <AuthModal isOpen={isModalOpen} onClose={closeModal} selectedTab={modalTab} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
