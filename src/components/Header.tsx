// src/components/Header.tsx

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Rotate as Hamburger } from "hamburger-react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "../lib/utils";
import { useCartStore } from "../stores/cartStore";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const totalQuantity = useCartStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
  );

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="relative mx-auto flex h-32 w-full items-center justify-between px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
        <Link
          to="/"
          className="absolute left-2 top-2 z-50 scale-90 sm:left-6 sm:top-6 md:scale-100 xl:left-40"
        >
          <div className="relative rounded-full border-[1.5px] border-foreground p-4 md:p-6">
            <img src="/assets/logo.png" alt="logo" />
          </div>
        </Link>

        <nav className="ml-auto mt-10 hidden space-x-8 text-lg md:flex">
          <Link
            to="/"
            className={cn(
              "opacity-85 transition-all duration-200 hover:opacity-100",
              "underline-offset-4 [&.active]:underline",
            )}
          >
            All Products
          </Link>
          <Link
            to="/contact"
            className={cn(
              "opacity-85 transition-all duration-200 hover:opacity-100",
              "underline-offset-4 [&.active]:underline",
            )}
          >
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="size-6" />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white ring-0 ring-card ring-offset-2">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>

        <div className="ml-auto md:hidden">
          <Hamburger distance="sm" rounded toggled={isOpen} toggle={setOpen} />
        </div>
      </header>
      <MobileMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
        totalQuantity={totalQuantity}
      />
    </>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  totalQuantity: number;
}

function MobileMenu({ isOpen, closeMenu, totalQuantity }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed right-0 top-40 z-40 h-[calc(100vh-10rem)] w-screen bg-white pt-20 md:hidden"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <nav className="flex h-full flex-col items-center justify-start space-y-6 text-2xl">
        <Link
          to="/"
          className="underline-offset-4 [&.active]:underline"
          onClick={closeMenu}
        >
          All Products
        </Link>
        <Link
          to="/contact"
          className="underline-offset-4 [&.active]:underline"
          onClick={closeMenu}
        >
          Contact
        </Link>
        <Link to="/cart" className="relative" onClick={closeMenu}>
          <ShoppingCart className="size-7" />
          {totalQuantity > 0 && (
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white ring-0 ring-card ring-offset-2">
              {totalQuantity}
            </span>
          )}
        </Link>
      </nav>
    </motion.div>
  );
}
