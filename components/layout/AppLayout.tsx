"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-n-8 text-n-1 font-sora">
      {/*
        In a real application, Sidebar and AppLayout might communicate
        via a shared state or context. For now, since Sidebar is client-side,
        and we're improving the look, I'll adjust the main content's margin
        to account for the sidebar's width.
      */}
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
