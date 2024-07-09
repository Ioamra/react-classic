import { useState } from "react";
import AuthModal from "./components/auth-modal";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./context/theme-context";

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
    </ThemeProvider>
  );
};

export default App;
