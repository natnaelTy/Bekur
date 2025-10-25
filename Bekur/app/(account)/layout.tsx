import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
export default AccountLayout;
