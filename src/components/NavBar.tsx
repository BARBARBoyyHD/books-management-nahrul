"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import NavBarMobile from "./NavBarMobile";
const navItem = [
  { name: "home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Authors", href: "/authors" },
  { name: "Publishers", href: "/publishers" },
  { name: "Docs", href: "/docs" },


];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const nav = navRef.current;
    if (!nav) return;

    const rect = nav.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    nav.style.setProperty("--x", `${x}px`);
    nav.style.setProperty("--y", `${y}px`);
  };

  if (isMobile) return <NavBarMobile navItem={navItem} />;

  return (
    <nav
      ref={navRef}
      onMouseMove={handleMouseMove}
      className="group fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl 
                 rounded-4xl bg-white/30 backdrop-blur-lg 
                 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-500 
                 px-6 py-3 overflow-hidden "
    >
      {/* cursor-follow light effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at var(--x) var(--y), rgba(255,255,255,0.15), transparent 80%)`,
        }}
      ></div>

      <div className="flex justify-center items-center w-full relative z-10">
        {/* Right side (Navigation) */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {navItem.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="text-white capitalize text-sm font-semibold 
                               relative transition-all duration-300 
                               hover:text-black hover:bg-white hover:px-3 hover:py-1 hover:rounded-md"
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#FFD700] rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
