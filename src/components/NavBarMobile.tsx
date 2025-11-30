"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

interface NavBarMobileProps {
  navItem: NavItem[];
}

export default function NavBarMobile({ navItem }: NavBarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-2xl border bg-white/20 backdrop-blur-xl  transition-all duration-500 px-6 py-3">
      <div className="flex justify-between items-center w-full">

        {/* Hamburger Button */}
        <button
          className="text-white focus:outline-none transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex flex-col items-end space-y-3 rounded-xl  py-4"
          >
            {navItem.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-base capitalize font-medium hover:text-cyan-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
