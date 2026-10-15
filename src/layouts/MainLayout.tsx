import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1 bg-linear-to-b from-[#FAFAF8] via-white to-[#F3F5FF] text-[#182033]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
