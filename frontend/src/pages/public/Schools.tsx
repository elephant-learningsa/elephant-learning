import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  Laptop,
  MessageSquare,
  Search,
  School,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Vetted Candidates",
    description:
      "Access educators who have gone through the relevant stages of our recruitment and screening process.",
  },
  {
    icon: ClipboardCheck,
    title: "Reduced Recruitment Time",
    description:
      "Spend less time searching through applications by allowing us to help identify suitable educators for your requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Screening",
    description:
      "Candidates are assessed through a structured process designed to provide a clearer understanding of their background and suitability.",
  },
  {
    icon: GraduationCap,
    title: "Qualification Verification",
    description:
      "Relevant qualifications and supporting documentation are reviewed as part of the candidate verification process.",
  },
  {
    icon: Laptop,
    title: "Technical Readiness",
    description:
      "Where relevant, schools can receive information about a candidate's readiness for online and digitally supported teaching.",
  },
  {
    icon: UserCheck,
    title: "Candidate Matching",
    description:
      "We help connect schools with educators whose qualifications, experience, subjects and availability align with their requirements.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description:
      "Share your teaching requirements, including subjects, grade levels, experience, location, teaching format and availability.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Search Talent Pool",
    description:
      "Our team reviews the available educator network to identify candidates who may align with your requirements.",
    icon: Search,
  },
  {
    number: "03",
    title: "Identify Candidates",
    description:
      "Potential candidates are shortlisted based on the information available and the requirements of your school.",
    icon: FileSearch,
  },
  {
    number: "04",
    title: "School Reviews",
    description:
      "Your school receives relevant candidate information so that you can review qualifications, experience and suitability.",
    icon: School,
  },
  {
    number: "05",
    title: "Interviews",
    description:
      "The school interviews selected candidates and determines who is suitable for the teaching opportunity.",
    icon: Users,
  },
  {
    number: "06",
    title: "Placement",
    description:
      "Once a candidate has been selected and the relevant arrangements are completed, the educator can proceed to placement.",
    icon: CheckCircle2,
  },
];

const requirements = [
  "Subject or teaching area",
  "Grade or age group",
  "Required qualifications or experience",
  "Online or physical teaching",
  "Location and availability",
  "Other requirements specific to your school",
];

export default function ForSchools() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F3A]">
        {/* Decorative elements */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* HERO CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE0E3]/30 bg-white/5 px-4 py-2 text-sm font-semibold text-[#DCE0E3] backdrop-blur-sm">
                <School size={16} />
                For Schools & Education Providers
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#1F5EA8] sm:text-5xl lg:text-5xl">
                Find the Right
                <span className="block">
                  Educator for Your School
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Elephant Learning helps schools and education providers
                connect with suitable educators through a structured
                recruitment and matching process.
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Tell us what you need and we can help identify educators whose
                qualifications, experience and availability align with your
                requirements.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/school/request"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DCE0E3] px-7 py-3.5 font-bold text-[#1B3A5C] transition duration-300 hover:bg-[#5B6067] hover:text-[#DCE0E3] hover:shadow-lg hover:shadow-[#5B6067]/20"

                >
                  Find a Teacher
                  <ArrowRight size={19} />
                </Link>

                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-[#5B6067]/50 hover:bg-white/5"
                >
                  How it Works
                </a>
              </div>

              {/* TRUST POINTS */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#5B6067]" />
                  Structured recruitment
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#5B6067]" />
                  Candidate screening
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#5B6067]" />
                  Educator matching
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
                <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#132F4C] via-[#0B1F3A] to-[#071525]">
                  {/* Decorative circles */}
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#D4AF37]/20" />
                  <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#D4AF37]/10" />
                  <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-white/5" />

                  {/* Main visual */}
                  <div className="flex min-h-[430px] flex-col items-center justify-center px-8 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#DCE0E3]/10 text-[#DCE0E3] ring-1 ring-[#DCE0E3]/30">
                      <School size={52} strokeWidth={1.5} />
                    </div>

                    <h2 className="mt-7 text-2xl font-bold text-white">
                      Your School.
                    </h2>

                    <h3 className="text-2xl font-bold text-[#DCE0E3]">
                      The Right Educator.
                    </h3>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                      Connect your school's requirements with educators from
                      the Elephant Learning talent pool.
                    </p>
                  </div>

                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#] text-[#DCE0E3]">
                        <BadgeCheck size={21} />
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          Structured Candidate Matching
                        </p>

                        <p className="mt-0.5 text-xs text-slate-300">
                          Based on your school's requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small floating badge */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A] text-[#DCE0E3]">
                    <UserCheck size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Talent Pool
                    </p>
                    <p className="text-sm font-bold text-[#0B1F3A]">
                      Educators Ready to Connect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SCHOOLS USE ELEPHANT LEARNING */}
      <section className="bg-[#F8FAFC] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B6067]">
              Why Schools Use Elephant Learning
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              A More Structured Way to Find Educators
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We help education providers navigate the early stages of
              educator recruitment so they can focus on reviewing and
              selecting suitable candidates.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Number */}
                  <div className="absolute right-5 top-5 text-5xl font-black text-[#5B6067]/20">
                    0{index + 1}
                  </div>

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#DCE0E3] transition duration-300 group-hover:bg-[#5B6067] group-hover:text-[#DCE0E3]">
                      <Icon size={25} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[#0B1F3A]">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="overflow-hidden bg-white py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B6067]">
              Recruitment Process
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              From Your Requirement to Placement
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our process is designed to make it easier for schools to
              communicate their needs, review suitable educators and move
              towards placement.
            </p>
          </div>

          {/* DESKTOP PROCESS */}
          <div className="mt-16 hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[8%] right-[8%] top-12 h-px bg-[#D4AF37]/40" />

              <div className="grid grid-cols-6 gap-4">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.number} className="relative">
                      {/* Icon */}
                      <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-[#0B1F3A] text-[#DCE0E3] shadow-lg">
                        <Icon size={27} />
                      </div>

                      {/* Arrow */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute -right-3 top-9 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#5B6067] text-[#DCE0E3] shadow-md">
                          <ArrowRight size={14} />
                        </div>
                      )}

                      {/* Card */}
                      <div className="mt-6 h-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 transition duration-300 hover:border-[#D4AF37]/40 hover:shadow-md">
                        <div className="text-xs font-bold tracking-widest text-[#5B6067]">
                          STEP {step.number}
                        </div>

                        <h3 className="mt-2 text-lg font-bold leading-6 text-[#0B1F3A]">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE PROCESS */}
          <div className="mt-12 lg:hidden">
            <div className="relative ml-5 border-l-2 border-[#D4AF37]/30 pl-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className={
                      index === processSteps.length - 1 ? "" : "pb-8"
                    }
                  >
                    <div className="absolute -left-[21px] flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A] text-[#D4AF37] ring-8 ring-white">
                      <Icon size={17} />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm">
                      <div className="text-xs font-bold tracking-widest text-[#D4AF37]">
                        STEP {step.number}
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-[#0B1F3A]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS SECTION */}
      <section className="bg-[#F8FAFC] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {/* VISUAL PANEL */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#0B1F3A] p-8 shadow-xl sm:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#D4AF37]/20" />
                <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-white/5" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCE0E3]/10 text-[#DCE0E3] ring-1 ring-[#DCE0E3]/20">
                    <ClipboardCheck size={30} />
                  </div>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#DCE0E3]">
                    Start With Your Requirement
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    The More We Know,
                    <span className="block text-[#DCE0E3]">
                      The Better We Can Match
                    </span>
                  </h2>

                  <p className="mt-5 leading-7 text-slate-300">
                    Give us the information we need to understand the
                    opportunity and identify educators who may align with your
                    school's requirements.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <GraduationCap
                        size={22}
                        className="text-[#5B6067]"
                      />
                      <p className="mt-3 text-sm font-semibold text-white">
                        Qualifications
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <School size={22} className="text-[#5B6067]" />
                      <p className="mt-3 text-sm font-semibold text-white">
                        Teaching Needs
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Laptop size={22} className="text-[#5B6067]" />
                      <p className="mt-3 text-sm font-semibold text-white">
                        Teaching Format
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Users size={22} className="text-[#5B6067]" />
                      <p className="mt-3 text-sm font-semibold text-white">
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B6067]">
                Tell Us What You Need
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0B1F3A] sm:text-4xl">
                Help Us Understand Your Requirement
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                The more information you provide about your teaching
                requirement, the easier it is for us to identify educators
                whose profiles may align with your needs.
              </p>

              <div className="mt-8 space-y-4">
                {requirements.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#5B6067]/40 hover:shadow-sm"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                      <CheckCircle2
                        size={16}
                        className="text-[#5B6067]"
                      />
                    </div>

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/school/request"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-7 py-3.5 font-bold text-white transition duration-300 hover:bg-[#132F4C] hover:shadow-lg"
              >
                Find a Teacher
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 lg:py-24">
        {/* Decorative circles */}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-[#D4AF37]/10" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full border border-[#D4AF37]/10" />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCE0E3]/10 text-[#DCE0E3] ring-1 ring-[#DCE0E3]/20">
            <School size={30} />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#5B6067]">
            Ready to Get Started?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Looking for the Right Educator?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Tell us about your teaching requirement and let Elephant Learning
            help you identify suitable educators from our network.
          </p>

          <Link
            to="/school/request"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#DCE0E3] px-8 py-4 font-bold text-[#1B3A5C] transition duration-300 hover:bg-[#5B6067] hover:text-[#DCE0E3] hover:shadow-xl hover:shadow-[#5B6067]/20"

          >
            Find a Teacher
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}