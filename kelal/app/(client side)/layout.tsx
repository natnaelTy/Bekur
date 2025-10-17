import React from "react";

import Navbar from "../components/Navbar";

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default ClientLayout;
