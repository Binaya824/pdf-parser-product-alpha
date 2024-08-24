"use client";
import React, { useState, useEffect } from "react";
import { FiFileText, FiFolder } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import Link from "next/link";


const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeComponent, setActiveComponent] = useState<string>("Document");

  useEffect(() => {
    // Set the active component based on the current pathname
    if (pathname === "/app/alldocument") {
      setActiveComponent("AllDocument");
    } else if (pathname === "/app") {
      setActiveComponent("Document");
    }
  }, [pathname]);

  const handleNavigation = (route: string, component: string) => {
    setActiveComponent(component);
    router.push(route);
  };

  return (
    <aside className="w-24 bg-white border-r border-gray-300 flex p-4">
      <ul className="space-y-4">
        {/* Document Types */}
        <Link href={"/app"}>
        <li
          className="pb-3 flex flex-col items-center cursor-pointer"
          // onClick={() => handleNavigation("/app", "Document")}
        >
          <div
            className={`p-2 rounded-lg ${
              activeComponent === "Document"
                ? "bg-red-300 text-red-600"
                : "bg-transparent text-gray-700"
            }`}
          >
            <FiFileText
              size={22}
              color={`${activeComponent === "Document" ? "red" : "gray"}`}
            />
          </div>
          <span
            className={`text-xs mt-2 text-center ${
              activeComponent === "Document" ? "text-red-600" : "text-gray-700"
            }`}
          >
            Document Types
          </span>
        </li>
        </Link>
        

        {/* All Documents */}
        <Link href={"/app/alldocument"}>
        <li
          className="flex flex-col items-center cursor-pointer"
          // onClick={() => handleNavigation("/app/alldocument", "AllDocument")}
        >
          <div
            className={`p-2 rounded-lg ${
              activeComponent === "AllDocument"
                ? "bg-red-300 text-red-600"
                : "bg-transparent text-gray-700"
            }`}
          >
            <FiFolder
              size={22}
              color={`${activeComponent === "AllDocument" ? "red" : "gray"}`}
            />
          </div>
          <span
            className={`text-xs mt-2 text-center ${
              activeComponent === "AllDocument"
                ? "text-red-600"
                : "text-gray-700"
            }`}
          >
            All Documents
          </span>
        </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
