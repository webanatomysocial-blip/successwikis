// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Works from "./pages/Works";
import Layout from "./components/Layout";
import "./css/index.css";
import Ads from "./pages/Ads";
import TermsOfUse from "./pages/TermsOfUse";
import CookiesPolicy from "./pages/CookiesPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccessibilityStatement from "./pages/AccessibilityStatement";

import Blogs from "./pages/Blogs";
import DynamicBlog from "./components/DynamicBlog";
import SuccessWire from "./pages/SuccessWire";
import DynamicSuccessWire from "./components/DynamicSuccessWire";
import DynamicPod from "./components/DynamicPod";
import Events from "./pages/Events";
import DynamicEvent from "./components/DynamicEvent";

import Lenis from "lenis";
import { HelmetProvider } from "react-helmet-async";

// Global Lenis initialization
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});
window.lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/ads" element={<Ads />} />

            {/* Legal Pages */}
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/accessibility-statement"
              element={<AccessibilityStatement />}
            />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<DynamicBlog />} />

            <Route path="/success-wire" element={<SuccessWire />} />
            <Route
              path="/success-wire/:lensId"
              element={<DynamicSuccessWire />}
            />

            <Route path="/:podCategory/:podSlug" element={<DynamicPod />} />

            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventSlug" element={<DynamicEvent />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
