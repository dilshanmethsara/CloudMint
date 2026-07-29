import { Outlet } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
