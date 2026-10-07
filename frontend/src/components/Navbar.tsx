import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo/Logo.png";

const navItems = [
  { label: "Home", path: "/" },
    { label: "For Educators", path: "/teachers" },
   { label: "For Schools", path: "/schools" },
   { label: "About", path: "/about" },
   { label: "Resources", path: "/resources" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center"
          aria-label="Elephant Learning home"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
            <img
              src={logo}
              alt="Elephant Learning"
              className="h-full w-full rounded-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium tracking-wide transition ${
                  isActive
                    ? "text-[#0B1F3A]"
                    : "text-slate-700 hover:text-[#0B1F3A]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Join Our Talent Pool */}
          <Link
            to="/teacher/register"
            className="rounded-full bg-[#1B3A5C] px-6 py-3 text-sm font-semibold tracking-wide text-[#F7F8F9] hover:text-[#F7F8F9] transition hover:bg-[#5B6067]"
          >
            Join Our Talent Pool
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#0B1F3A] transition hover:border-[#D4AF37] hover:text-[#D4AF37] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `border-b border-slate-200 py-4 text-sm font-medium tracking-wide transition ${
                    isActive
                      ? "text-[#0B1F3A]"
                      : "text-slate-700 hover:text-[#0B1F3A]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Join Button */}
            <Link
              to="/teacher/register"
              onClick={closeMobileMenu}
              className="mt-5 rounded-full bg-[#1B3A5C] px-6 py-4 text-center text-sm font-semibold tracking-wide text-[#F7F8F9] transition hover:bg-[#e1c45a]"
            >
              Join Our Talent Pool
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
