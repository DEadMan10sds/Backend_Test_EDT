//import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container mx-auto py-8 ">
        <Outlet />
      </div>
    </>
  );
}
