"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { Footermenu } from "../FooterMenu";
import Footer from "../Footer";
import { useAuth } from "@/context/AuthContext";
import Loader from "../common/Loader";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading, isValidated } = useAuth();

  if (isLoading || !isValidated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex min-h-screen flex-col">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main className="flex-grow">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
                <Toaster position="top-right" />
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
            <Footer />
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        <Footermenu />
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </>
    );
  }


}



