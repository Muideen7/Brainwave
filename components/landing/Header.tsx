"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";

import { navigation } from "@/constants";
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" href="/#hero">
          <Image src="/assets/brainwave.svg" alt="Brainwave" width={190} height={40} />
        </Link>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item: NavItem) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <Link
          href="/signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New Account
        </Link>
        <Link href="/login">
          <Button className="hidden lg:flex">Sign in</Button>
        </Link>

        <Button
          className="ml-auto lg:hidden"
          onClick={toggleNavigation}
          variant="ghost"
        >
           <div className="w-6 h-6 flex flex-col justify-around">
             <span className="w-full h-0.5 bg-n-1"></span>
             <span className="w-full h-0.5 bg-n-1"></span>
             <span className="w-full h-0.5 bg-n-1"></span>
           </div>
        </Button>
      </div>
    </div>
  );
};

export default Header;
