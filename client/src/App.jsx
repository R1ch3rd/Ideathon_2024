import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";
import AnalyzePage from "./pages/AnalyzePage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream text-ink-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </div>
    </Router>
  );
}
