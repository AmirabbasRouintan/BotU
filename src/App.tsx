import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import ClickSpark from "./Animations/ClickSpark/ClickSpark";
import Template from "./pages/Template";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/template" element={<Template />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </>
    </ClickSpark>
  );
}

export default App;
