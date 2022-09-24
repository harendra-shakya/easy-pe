import React from "react";

import Navbar from "../components/layout/dashboard-navbar";
import Sidebar from "../components/layout/slidebar";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="relative bg-blue-600 md:ml-64">
        <Navbar />
        {/* make a header if possible */}
        {/* <Header /> */}
      </div>
    </>
  );
}
