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
    <header className="sticky top-0 z-50 border-b border-[#DCEAF8] bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center"
          aria-label="Elephant Learning home"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-[#EAF2FB]">
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
                    ? "text-[#1F5EA8]"
                    : "text-[#334155] hover:text-[#1F5EA8]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Join Our Talent Pool */}
          <Link
            to="/teacher/register"
            className="rounded-full bg-[#1F5EA8] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition duration-300 hover:bg-[#2E73C5] hover:shadow-md"
          >
            Join Our Talent Pool
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-[#DCEAF8] bg-[#F3F7FC] text-[#0B1F3A] transition duration-300 hover:border-[#1F5EA8] hover:bg-[#EAF2FB] hover:text-[#1F5EA8] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-[#DCEAF8] bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `border-b border-[#EAF2FB] py-4 text-sm font-medium tracking-wide transition ${
                    isActive
                      ? "text-[#1F5EA8]"
                      : "text-[#334155] hover:text-[#1F5EA8]"
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
              className="mt-5 rounded-full bg-[#1F5EA8] px-6 py-4 text-center text-sm font-semibold tracking-wide text-white shadow-sm transition duration-300 hover:bg-[#2E73C5] hover:shadow-md"
            >
              Join Our Talent Pool
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}