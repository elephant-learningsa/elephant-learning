import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/Logo.png";

const BUSINESS_ADDRESS =
  "Gqeberha, Eastern Cape, South Africa";

const BUSINESS_PHONE = "+27 00 000 0000";

const BUSINESS_EMAIL = "info@elephantlearning.co.za";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1F3A]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
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
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-xs font-semibold tracking-wide text-white/70 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-sm font-semibold text-white/70 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                f
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* For Educators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              For Educators
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/teacher/register"
                className="text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                Register as an Educator
              </Link>

              <Link
                to="/teacher/register"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-white"
              >
                Join Our Talent Pool
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* Address */}
              <div className="flex gap-3 text-sm leading-6 text-white/65">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#D4AF37]"
                />

                <span>{BUSINESS_ADDRESS}</span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                <Phone
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span>{BUSINESS_PHONE}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-3 text-sm text-white/65 transition hover:text-[#D4AF37]"
              >
                <Mail
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span>{BUSINESS_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Elephant Learning.
            All rights reserved.
          </p>

          {/* <div className="flex flex-wrap gap-6">
            <Link
              to="/terms"
              className="transition hover:text-[#D4AF37]"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy"
              className="transition hover:text-[#D4AF37]"
            >
              Privacy Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}