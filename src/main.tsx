import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./app/Layout.tsx";
import App from "./app/App.tsx";
import ContactPage from "./app/ContactPage.tsx";
import ServicesPage from "./app/ServicesPage.tsx";
import WorkPage from "./app/WorkPage.tsx";
import AboutPage from "./app/AboutPage.tsx";
import PrivacyPage from "./app/PrivacyPage.tsx";
import TermsPage from "./app/TermsPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);