import elephantHero from "../../assets/images/homeimage.png";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Clock3,
  FileCheck,
  FileText,
  Globe2,
  GraduationCap,
  Laptop,
  MessageSquare,
  School,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const teacherJourney = [
  {
    number: "01",
    title: "Apply",
    description: "Submit your educator application.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Get Verified",
    description: "We review your qualifications and experience.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Join the Talent Pool",
    description: "Your approved profile joins our educator network.",
    icon: Users,
  },
  {
    number: "04",
    title: "Get Matched",
    description: "We identify opportunities aligned with your profile.",
    icon: SearchCheck,
  },
  {
    number: "05",
    title: "Get Placed",
    description: "Move forward with a suitable school or provider.",
    icon: BriefcaseBusiness,
  },
];

const schoolJourney = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description:
      "Share your subject, grade, experience, location and teaching requirements.",
  },
  {
    number: "02",
    title: "We Find Suitable Educators",
    description:
      "We review our talent pool and identify educators who may match your needs.",
  },
  {
    number: "03",
    title: "Review & Interview",
    description:
      "Review suitable candidates and meet the educators you are interested in.",
  },
  {
    number: "04",
    title: "Make Your Selection",
    description:
      "Select the educator who best fits your school's teaching requirement.",
  },
  {
    number: "05",
    title: "Placement",
    description:
      "Complete the relevant arrangements and move forward with placement.",
  },
];

const benefits = [
  {
    icon: BadgeCheck,
    title: "Vetted Educators",
    description:
      "Access educators who have gone through a structured screening and approval process.",
  },
  {
    icon: Clock3,
    title: "Less Recruitment Time",
    description:
      "Spend less time searching for suitable educators by accessing an organised talent pool.",
  },
  {
    icon: SearchCheck,
    title: "Structured Screening",
    description:
      "Our recruitment process provides a consistent approach to reviewing educator applications.",
  },
  {
    icon: FileCheck,
    title: "Qualification Verification",
    description:
      "Relevant qualifications and supporting documentation are reviewed as part of the process.",
  },
  {
    icon: Laptop,
    title: "Online Teaching Readiness",
    description:
      "Where relevant, educators can be assessed for the technical requirements needed for online teaching.",
  },
  {
    icon: Users,
    title: "Educator Support",
    description:
      "We build relationships with educators and support them throughout their recruitment journey.",
  },
];

const values = [
  {
    title: "Strength",
    description:
      "Building confident educators and strong partnerships with schools.",
    icon: ShieldCheck,
  },
  {
    title: "Wisdom",
    description:
      "Using experience, knowledge and thoughtful processes to create better matches.",
    icon: GraduationCap,
  },
  {
    title: "Memory",
    description:
      "Learning from every educator and school interaction to improve our approach.",
    icon: FileCheck,
  },
  {
    title: "Good Fortune",
    description:
      "Creating opportunities that allow educators and schools to grow together.",
    icon: BriefcaseBusiness,
  },
];

const visionItems = [
  "Build a network of 500 educators",
  "Partner with 50 schools and education providers",
  "Expand across multiple countries",
  "Support online and physical teaching placements",
  "Provide teacher training opportunities",
  "Support educator career development",
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-white">
        {/* Soft background decoration */}
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-50/70" />
        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-slate-50" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid min-h-[650px] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
            {/* LEFT CONTENT */}
            <div className="relative z-10 max-w-2xl">
              <h1 className="font-serif text-5xl font-bold leading-[1.02] tracking-tight text-[#0B1F3A] sm:text-6xl lg:text-[3.7rem]">
                Connecting
                <span className="block">Great Educators</span>
                <span className="block text-[#1F5EA8]">
                  with Greater
                  Opportunities
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Elephant Learning is an education recruitment and placement
                company focused on connecting schools and education providers
                with capable, vetted educators.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/teacher/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0B1F3A]/25 bg-white px-7 py-4 font-semibold text-[#0B1F3A] transition duration-300 hover:border-[#1F5EA8] hover:text-[#1F5EA8]"
                >
                  <Users className="h-5 w-5" />
                  I'm an Educator
                </Link>

                <Link
                  to="/schools"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-7 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-[#132F4C]"
                >
                  <School className="h-5 w-5" />
                  I'm a School
                </Link>
              </div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Soft blue shape behind elephant */}
              <div className="absolute right-0 top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full bg-[#F1F6FC] sm:h-[520px] sm:w-[520px]" />

              {/* Elephant illustration */}
              <div className="relative z-10 w-full max-w-[620px]">
                <img
                  src={elephantHero}
                  alt="Elephant Learning education"
                  className="w-full object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* =====================================================
              TRUST / BENEFIT STRIP
          ===================================================== */}
          <div className="relative z-20 -mb-1 grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(11,31,58,0.08)] sm:grid-cols-2 lg:grid-cols-4">
            {/* Item 1 */}
            <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-7 sm:border-r lg:border-b-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8]">
                <Users className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">
                  Vetted Educators
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Qualified, experienced and ready to teach.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-7 lg:border-b-0 lg:border-r">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8]">
                <Clock3 className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">Save Time</h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  A faster, simpler recruitment process.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-7 sm:border-r lg:border-b-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8]">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">Trusted</h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Verified credentials and skills.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 px-6 py-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-[#1F5EA8]">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">Better Outcomes</h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  The right educator for the right environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================= */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left heading */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
                Welcome to Elephant Learning
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0B1F3A] sm:text-4xl lg:text-5xl">
                Helping Great Educators Find the Right Opportunities
              </h2>
            </div>

            {/* Right content */}
            <div>
              <p className="text-lg leading-8 text-slate-600">
                Elephant Learning is an education recruitment and placement
                company focused on connecting schools and education providers
                with capable, vetted educators.
              </p>

              <p className="mt-5 leading-8 text-slate-600">
                We believe that the right educator can make a meaningful
                difference in a learner's experience, while the right
                opportunity can help an educator build a rewarding career.
              </p>

              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[#0B1F3A] transition hover:text-[#1F5EA8]"
              >
                Learn More About Elephant Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Values */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-xl"
                >
                  <span className="absolute right-5 top-4 text-6xl font-black text-slate-100">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#1F5EA8] transition duration-300 group-hover:bg-[#1F5EA8] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[#0B1F3A]">
                      {value.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOR EDUCATORS / FOR SCHOOLS
      ========================================================= */}
      <section className="bg-[#F8FAFC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
              Who We Serve
            </p>

            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
              One Platform. Two Sides of Education.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We bring educators and schools together through a structured
              recruitment and placement journey.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Educators */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0B1F3A] p-8 shadow-xl sm:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#1F5EA8]/20" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F5EA8] text-white">
                  <GraduationCap className="h-8 w-8" />
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#63A4E8]">
                  For Educators
                </p>

                <h3 className="mt-3 max-w-lg text-3xl font-bold text-white">
                  Build Your Teaching Career
                </h3>

                <p className="mt-5 max-w-xl leading-8 text-slate-300">
                  Join our educator network and become part of a structured
                  recruitment process designed to connect qualified educators
                  with suitable teaching opportunities.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Submit your application",
                    "Complete screening and verification",
                    "Join the educator talent pool",
                    "Be considered for suitable opportunities",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-slate-200"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F5EA8] text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/teachers"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1F5EA8] px-6 py-3.5 font-bold text-white transition hover:bg-[#174A85]"
                >
                  Explore Educator Opportunities
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Schools */}
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#1F5EA8]/5" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#1F5EA8]">
                  <School className="h-8 w-8" />
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
                  For Schools
                </p>

                <h3 className="mt-3 max-w-lg text-3xl font-bold text-[#0B1F3A]">
                  Find Educators Who Match Your Needs
                </h3>

                <p className="mt-5 max-w-xl leading-8 text-slate-600">
                  Tell us what you need and we help identify suitable
                  educators from our network, reducing the time spent on the
                  initial recruitment process.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Submit your teaching requirement",
                    "Tell us about your school and role",
                    "Review suitable candidate profiles",
                    "Interview and select your preferred educator",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/schools"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3.5 font-bold text-white transition hover:bg-[#132F4C]"
                >
                  Find a Teacher
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
              Simple Steps. Meaningful Connections.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We create a clear journey from recruitment to placement for
              both educators and schools.
            </p>
          </div>

          {/* Educator Journey */}
          <div className="mt-14">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#1F5EA8]">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
                  Educator Journey
                </p>

                <h3 className="text-2xl font-bold text-[#0B1F3A]">
                  From Application to Opportunity
                </h3>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {teacherJourney.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#1F5EA8]">
                        {step.number}
                      </span>

                      <Icon className="h-5 w-5 text-[#0B1F3A]" />
                    </div>

                    <h4 className="mt-5 font-bold text-[#0B1F3A]">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* School Journey */}
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F5EA8] text-white">
                <School className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
                  School Journey
                </p>

                <h3 className="text-2xl font-bold text-[#0B1F3A]">
                  From Requirement to Placement
                </h3>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {schoolJourney.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1F3A] text-sm font-bold text-[#1F5EA8]">
                    {step.number}
                  </div>

                  <h4 className="mt-5 font-bold text-[#0B1F3A]">
                    {step.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 font-bold text-[#0B1F3A] transition hover:text-[#1F5EA8]"
            >
              Explore How It Works
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY ELEPHANT LEARNING
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 sm:py-24">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-[#1F5EA8]/20" />

        <div className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#63A4E8]">
                Why Elephant Learning
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Recruitment Built Around People and Process
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              We combine structured recruitment with a relationship-driven
              approach to help educators and schools find meaningful
              opportunities and suitable matches.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/40 hover:bg-white/10"
                >
                  <span className="absolute right-5 top-4 text-5xl font-black text-white/[0.03]">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#1F5EA8] text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR VISION
      ========================================================= */}
      <section className="bg-[#F4F8FC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5EA8]">
                Our Vision
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0B1F3A] sm:text-4xl">
                Building a Wider Education Network
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our vision is to create an education recruitment network that
                connects talented educators with schools and education
                providers across different regions and countries.
              </p>

              <p className="mt-5 leading-8 text-slate-600">
                As the network grows, Elephant Learning aims to support
                educators beyond placement through training, development and
                opportunities for long-term career growth.
              </p>

              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3.5 font-bold text-white transition hover:bg-[#132F4C]"
              >
                Discover Our Vision
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Vision Items */}
            <div className="grid gap-4 sm:grid-cols-2">
              {visionItems.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#1F5EA8]/15 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1F5EA8]/30 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-[#63A4E8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="pt-1 font-semibold leading-6 text-[#0B1F3A]">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision stats */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-[#0B1F3A] shadow-xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-b border-white/10 p-8 text-center sm:border-r lg:border-b-0">
                <p className="text-4xl font-black text-[#1F5EA8]">500</p>

                <p className="mt-2 text-sm text-slate-300">Educators</p>
              </div>

              <div className="border-b border-white/10 p-8 text-center lg:border-b-0 lg:border-r">
                <p className="text-4xl font-black text-[#1F5EA8]">50</p>

                <p className="mt-2 text-sm text-slate-300">
                  Schools & Providers
                </p>
              </div>

              <div className="border-b border-white/10 p-8 text-center sm:border-r lg:border-b-0">
                <Globe2 className="mx-auto h-9 w-9 text-[#1F5EA8]" />

                <p className="mt-3 text-sm text-slate-300">
                  Multiple Countries
                </p>
              </div>

              <div className="p-8 text-center">
                <GraduationCap className="mx-auto h-9 w-9 text-[#1F5EA8]" />

                <p className="mt-3 text-sm text-slate-300">
                  Career Development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-white px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0B1F3A] px-7 py-14 text-center sm:px-12 sm:py-16">
          {/* Decoration */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#1F5EA8]/20" />

          <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full border border-white/5" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1F5EA8]/10 text-[#63A4E8] ring-1 ring-[#1F5EA8]/30">
              <MessageSquare className="h-7 w-7" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#63A4E8]">
              Your Next Opportunity Starts Here
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Make the Connection?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Whether you are an educator looking for your next opportunity or
              a school looking for the right teacher, Elephant Learning is
              here to help.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/teacher/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F5EA8] px-7 py-4 font-bold text-white transition hover:bg-[#174A85]"
              >
                Join Our Talent Pool
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/schools"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Find a Teacher
                <School className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}