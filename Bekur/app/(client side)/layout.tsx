import React from "react";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotPage from "../components/ChatBot";

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
        <ChatbotPage />
      <Footer />
    </>
  );
}

export default ClientLayout;
