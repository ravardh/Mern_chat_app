import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import SignUpPage from "./pages/signup";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import UpdatePage from "./pages/updatePic";
import LogoutPage from "./pages/logout";
import ChatPage from "./pages/chat";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
