import {
  ArrowRight,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  School,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="overflow-hidden bg-white text-[#0B1F3A]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F3F7FC] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Decorative blue shapes */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#1F5EA8]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#2E73C5]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#1F5EA8]">
              <MessageSquare size={17} />
              Contact Us
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl">
              Let&apos;s Start a{" "}
              <span className="text-[#1F5EA8]">Conversation</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Whether you are an educator looking for opportunities or a school
              looking for suitable teachers, we would be happy to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#1F5EA8] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2E73C5]"
              >
                Send Us a Message
                <ArrowRight size={18} />
              </a>

              <a
                href="tel:+27410000000"
                className="inline-flex items-center gap-2 rounded-full border border-[#1F5EA8]/25 bg-white px-6 py-3.5 font-semibold text-[#1F5EA8] transition hover:border-[#1F5EA8] hover:bg-[#EAF2FB]"
              >
                <Phone size={17} />
                Speak to Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT INFORMATION
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0B1F3A] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#1F5EA8]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#2E73C5]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {/* EMAIL */}
          <div className="group rounded-3xl border border-[#DCEAF8] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8] transition group-hover:bg-[#1F5EA8] group-hover:text-white">
              <Mail size={22} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F5EA8]">
              Email
            </p>

            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Get in touch
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Send us an email and our team will get back to you.
            </p>

            <a
              href="mailto:info@elephantlearning.co.za"
              className="mt-6 inline-block break-all text-sm font-semibold text-[#1F5EA8] transition hover:text-[#2E73C5]"
            >
              info@elephantlearning.co.za
            </a>
          </div>

          {/* CONTACT TEAM */}
          <div className="group rounded-3xl border border-[#DCEAF8] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8] transition group-hover:bg-[#1F5EA8] group-hover:text-white">
              <Phone size={22} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F5EA8]">
              Contact
            </p>

            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Speak to our team
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Have a question about teaching opportunities or recruitment?
              We are here to help.
            </p>

            <a
              href="tel:+27410000000"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1F5EA8] transition hover:text-[#2E73C5]"
            >
              <Phone size={16} />
              +27 41 000 0000
            </a>
          </div>

          {/* LOCATION */}
          <div className="group rounded-3xl border border-[#DCEAF8] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8] transition group-hover:bg-[#1F5EA8] group-hover:text-white">
              <MapPin size={22} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F5EA8]">
              Location
            </p>

            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Our location
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Visit us in Central, Gqeberha.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Central%2C%20Gqeberha%2C%20Eastern%20Cape%2C%20South%20Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-start gap-2 text-sm font-semibold leading-6 text-[#1F5EA8] transition hover:text-[#2E73C5]"
            >
              <MapPin size={17} className="mt-1 shrink-0" />
             
                Open Google maps
            </a>

            {/* <p className="mt-3 text-xs text-slate-400">
              Click the address for directions
            </p> */}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT FORM
      ========================================================= */}
      <section
        id="contact-form"
        className="relative bg-[#F8FBFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* LEFT */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1F5EA8]">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0B1F3A] sm:text-4xl">
              How Can We <span className="text-[#1F5EA8]">Help?</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Send us your enquiry and provide a few details about what you
              need. Our team will review your message and respond to you.
            </p>

            {/* CONTACT VISUAL */}
            <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#0B1F3A]">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#1F5EA8]/25 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#2E73C5]/15 blur-2xl" />

              <div className="relative flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1F5EA8]/20 text-[#8CC2FF] ring-1 ring-[#6EA8E8]/20">
                  <MessageSquare size={38} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  We&apos;re Here to Help
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                  Whether you are an educator or a school, connect with
                  Elephant Learning and let&apos;s find the right path forward.
                </p>

                <a
                  href="tel:+27410000000"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F5EA8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2E73C5]"
                >
                  <Phone size={16} />
                  +27 41 000 0000
                </a>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#DCEAF8] bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FB] text-[#1F5EA8]">
                <Clock3 size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#0B1F3A]">
                  Office Hours
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Monday – Friday
                  <br />
                  08:00 – 17:00
                </p>
              </div>
            </div>

            {/* LOCATION LINK */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Central%2C%20Gqeberha%2C%20Eastern%20Cape%2C%20South%20Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start gap-4 rounded-2xl border border-[#DCEAF8] bg-white p-5 shadow-sm transition hover:border-[#1F5EA8]/40 hover:bg-[#F3F7FC]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FB] text-[#1F5EA8]">
                <MapPin size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#0B1F3A]">
                  Find Us
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Central, Gqeberha
                  <br />
                  Eastern Cape, South Africa
                </p>

                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#1F5EA8]">
                  Get directions
                  <ArrowRight size={15} />
                </span>
              </div>
            </a>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-[#DCEAF8] bg-white p-7 shadow-xl shadow-[#0B1F3A]/5 sm:p-9">
            <div className="mb-7">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1F5EA8]">
                Contact Form
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Complete the form below and we&apos;ll get back to you.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-[#1F5EA8]/20 bg-[#EAF2FB] p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1F5EA8]/15 text-[#1F5EA8]">
                  <Send size={25} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#0B1F3A]">
                  Message Received
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Thank you for contacting Elephant Learning. Our team will
                  review your enquiry and get back to you.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-semibold text-[#1F5EA8] transition hover:text-[#2E73C5]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Enter your first name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="surname"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Surname
                    </label>

                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      required
                      placeholder="Enter your surname"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                    />
                  </div>
                </div>

                {/* EMAIL + PHONE */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+27 ..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                    />
                  </div>
                </div>

                {/* ENQUIRY TYPE */}
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Enquiry Type
                  </label>

                  <select
                    id="enquiryType"
                    name="enquiryType"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                  >
                    <option value="" disabled>
                      Select an enquiry type
                    </option>
                    <option value="teacher">
                      Teacher / Educator Enquiry
                    </option>
                    <option value="school">
                      School / Education Provider Enquiry
                    </option>
                    <option value="general">General Enquiry</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What is your enquiry about?"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1F5EA8] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2E73C5]"
                >
                  SEND MESSAGE
                  <Send size={18} />
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  By submitting this form, you agree that Elephant Learning
                  may use the information provided to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK PATHS
      ========================================================= */}
      <section className="bg-[#EAF2FB]/50 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1F5EA8]">
              Looking for Something Specific?
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
              Choose the Right <span className="text-[#1F5EA8]">Path</span>
            </h2>

            <p className="mt-4 text-slate-600">
              If you are ready to take the next step, go directly to the
              section that best matches your needs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* TEACHER */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3A] p-8 text-white">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#1F5EA8]/25 blur-2xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F5EA8]/20 text-[#8CC2FF]">
                  <GraduationCap size={28} />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Are You an Educator?
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Join the Elephant Learning Network and create your educator
                  profile to be considered for suitable teaching opportunities.
                </p>

                <Link
                  to="/teacher/register"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F5EA8] px-5 py-3 font-semibold text-white transition hover:bg-[#2E73C5]"
                >
                  Join Our Teacher Network
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* SCHOOL */}
            <div className="relative overflow-hidden rounded-3xl border border-[#DCEAF8] bg-white p-8 shadow-sm">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#EAF2FB]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FB] text-[#1F5EA8]">
                  <School size={28} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#0B1F3A]">
                  Are You a School?
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Tell us about your teaching requirement and let us help you
                  identify suitable educators from our talent pool.
                </p>

                <Link
                  to="/school/request"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-5 py-3 font-semibold text-white transition hover:bg-[#174A82]"
                >
                  Find a Teacher
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0B1F3A] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#1F5EA8]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#2E73C5]/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#6EA8E8]">
            Let&apos;s Connect
          </p>

          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            We Would Love to{" "}
            <span className="text-[#6EA8E8]">Hear From You</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Whether you are looking for your next teaching opportunity or
            searching for the right educator, Elephant Learning is here to help.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:info@elephantlearning.co.za"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F5EA8] px-7 py-3.5 font-semibold text-white transition hover:bg-[#2E73C5]"
            >
              <Mail size={18} />
              Contact Us
            </a>

            <a
              href="tel:+27410000000"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6EA8E8]/30 px-7 py-3.5 font-semibold text-white transition hover:border-[#6EA8E8]/60 hover:bg-[#1F5EA8]/10"
            >
              <Phone size={18} />
              +27 41 000 0000
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}