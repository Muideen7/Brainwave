"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, MessageSquare, Briefcase, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Projects", url: "/projects", icon: Briefcase },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-n-8 border-r border-n-6 flex flex-col z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/brainwave-symbol.svg" width={40} height={40} alt="Brainwave" priority />
          <span className="text-n-1 font-bold text-xl">Brainwave</span>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-n-6 text-n-1"
                  : "text-n-3 hover:text-n-1 hover:bg-n-7"
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{link.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-n-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-n-3 hover:text-n-1 hover:bg-n-7 gap-3"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
