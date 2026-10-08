import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/Logo.png";

const BUSINESS_ADDRESS =
  "Central, Gqeberha, Eastern Cape, South Africa";

const BUSINESS_PHONE = "+27 41 000 0000";

const BUSINESS_EMAIL = "info@elephantlearning.co.za";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Central%2C%20Gqeberha%2C%20Eastern%20Cape%2C%20South%20Africa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1F3A]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* =====================================================
              BRAND
          ===================================================== */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-1.5 shadow-lg shadow-black/10">
                <img
                  src={logo}
                  alt="Elephant Learning"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
              Connecting exceptional educators with schools that need them,
              creating opportunities for educators and supporting schools
              with quality talent.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-xs font-semibold tracking-wide text-white/60 transition duration-300 hover:border-[#1F5EA8] hover:bg-[#1F5EA8] hover:text-white"
              >
                li
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-sm font-semibold text-white/60 transition duration-300 hover:border-[#1F5EA8] hover:bg-[#1F5EA8] hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-sm font-semibold text-white/60 transition duration-300 hover:border-[#1F5EA8] hover:bg-[#1F5EA8] hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-sm font-semibold text-white/60 transition duration-300 hover:border-[#1F5EA8] hover:bg-[#1F5EA8] hover:text-white"
              >
                x
              </a>
            </div>
          </div>

          {/* =====================================================
              NAVIGATION
          ===================================================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6EA8E8]">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                Contact
              </Link>

              <Link
                to="/teachers"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                For Educators
              </Link>

              <Link
                to="/schools"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                For Schools
              </Link>

              <Link
                to="/resources"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                Resources
              </Link>
            </div>
          </div>

          {/* =====================================================
              FOR EDUCATORS
          ===================================================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6EA8E8]">
              For Educators
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/teacher/register"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                Register as an Educator
              </Link>

              <Link
                to="/teacher/login"
                className="text-sm text-white/60 transition hover:text-[#6EA8E8]"
              >
                Educator Login
              </Link>

              <Link
                to="/teacher/register"
                className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#1F5EA8] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#2E73C5]"
              >
                Join Our Talent Pool

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* =====================================================
              CONTACT
          ===================================================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6EA8E8]">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">
              {/* Address */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 text-sm leading-6 text-white/60 transition hover:text-white"
              >
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#6EA8E8] transition group-hover:text-[#8CC2FF]"
                />

                <span>
                  Central
                  <br />
                  Gqeberha, Eastern Cape
                  <br />
                  South Africa
                  <span className="mt-1 block text-xs text-[#6EA8E8]">
                    Get directions
                  </span>
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Phone
                  size={18}
                  className="text-[#6EA8E8] transition group-hover:text-[#8CC2FF]"
                />

                <span>{BUSINESS_PHONE}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Mail
                  size={18}
                  className="text-[#6EA8E8] transition group-hover:text-[#8CC2FF]"
                />

                <span className="break-all">{BUSINESS_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Elephant Learning. All rights
            reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F5EA8]" />
            <span>Connecting Educators With Opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}