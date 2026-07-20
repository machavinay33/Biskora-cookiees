import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Admin Login", href: "/admin/login" },
  ];

  const { pathname } = useLocation();

  const getLinkClass = (href: string) => {
    return `text-foreground hover:text-accent transition-colors duration-200 font-medium ${pathname === href ? "text-accent" : ""}`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <div className="flex flex-col items-start">
            <span className="font-serif text-2xl font-bold">
              <span style={{ color: '#5C3317' }}>Bis</span>
              <span style={{ color: '#D4578A' }}>K</span>
              <span style={{ color: '#5C3317' }}>ora</span>
              <sup style={{ color: '#D4578A', fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
            </span>
            <span className="text-[#5C3317] text-xs font-medium mt-1">YOUR TASTY BITES.</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => navigate(item.href)}
              whileHover={{ scale: 1.05 }}
              className={getLinkClass(item.href)}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-card border-t border-border"
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => {
                navigate(item.href);
                setIsOpen(false);
              }}
              whileHover={{ x: 4 }}
              className={`block w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors ${pathname === item.href ? "text-accent" : "text-foreground"}`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
