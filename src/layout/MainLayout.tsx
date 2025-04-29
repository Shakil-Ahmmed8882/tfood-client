import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="bg-gradient-to-r from-[#fffefb] to-[#f8f9fe]">
      <Navbar/>
      <Outlet />
      <Footer/>
    </main>
  );
};
export default MainLayout;

MainLayout.displayName = "MainLayout";
