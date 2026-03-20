"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, MessageSquare, Briefcase, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Chat", url: "/chat/new", icon: MessageSquare },
    { title: "Projects", url: "/projects", icon: Briefcase },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 bottom-0 ${collapsed ? 'w-20' : 'w-64'} bg-n-8 border-r border-n-6 flex flex-col z-50 transition-all duration-300`}>
      <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : 'gap-4'}`}>
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/brainwave-symbol.svg" width={40} height={40} alt="Brainwave" priority />
          {!collapsed && <span className="text-n-1 font-bold text-xl">Brainwave</span>}
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.url);
          return (
            <Link
              key={link.title}
              href={link.url}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-n-6 text-n-1"
                  : "text-n-3 hover:text-n-1 hover:bg-n-7"
              }`}
              title={collapsed ? link.title : ""}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-semibold">{link.title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-n-6 flex flex-col gap-2">
        <Button
          variant="ghost"
          className={`w-full ${collapsed ? 'justify-center' : 'justify-start'} text-n-3 hover:text-n-1 hover:bg-n-7 gap-3`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <><ChevronLeft size={20} /><span>Collapse</span></>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full ${collapsed ? 'justify-center' : 'justify-start'} text-n-3 hover:text-n-1 hover:bg-n-7 gap-3`}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
