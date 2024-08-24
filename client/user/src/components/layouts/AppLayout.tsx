"use client";
import { ReactNode } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div id="main" className="flex flex-row flex-1">
        <Sidebar />

        <div className="flex-1 pl-4 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
