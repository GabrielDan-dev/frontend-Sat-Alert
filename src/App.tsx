import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AlertaProvider } from "./context/AlertaContext";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import Integrantes from "./pages/Integrantes";
import Dashboard from "./pages/Dashboard";
import AlertaDetalhes from "./pages/AlertaDetalhes";
import RegistrarAlerta from "./pages/RegistrarAlerta";

export default function App() {
  return (
    <AlertaProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registrar" element={<RegistrarAlerta />} />
            <Route path="/alerta/:id" element={<AlertaDetalhes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AlertaProvider>
  );
}