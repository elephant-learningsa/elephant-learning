import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Laptop,
  School,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: BriefcaseBusiness,
    title: "Teaching Opportunities",
    description:
      "Gain access to potential teaching opportunities with schools and education providers looking for capable educators.",
  },
  {
    icon: ClipboardCheck,
    title: "Professional Recruitment",
    description:
      "Go through a structured recruitment process designed to understand your qualifications, experience and teaching strengths.",
  },
  {
    icon: UserCheck,
    title: "Candidate Support",
    description:
      "Receive guidance throughout the recruitment journey, from application and verification through to potential placement.",
  },
  {
    icon: School,
    title: "Suitable Matching",
    description:
      "Be considered for opportunities that align with your teaching background, subjects, experience and availability.",
  },
  {
    icon: Laptop,
    title: "Online Opportunities",
    description:
      "Explore teaching opportunities that can be delivered remotely where the role and education provider support online teaching.",
  },
  {
    icon: Users,
    title: "Physical Opportunities",
    description:
      "Be considered for classroom-based opportunities with suitable schools and education providers.",
  },
];

const eligibleApplicants = [
  {
    icon: GraduationCap,
    title: "Qualified Teachers",
    description:
      "Educators with recognised teaching qualifications and relevant classroom experience.",
  },
  {
    icon: BookOpen,
    title: "University Graduates",
    description:
      "Graduates with relevant academic backgrounds who are interested in education opportunities.",
  },
  {
    icon: BadgeCheck,
    title: "TEFL / TESOL Educators",
    description:
      "Educators with TEFL, TESOL or other relevant teaching certifications.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Experienced Educators",
    description:
      "Professionals with teaching, tutoring, training or other relevant educational experience.",
  },
  {
    icon: BookOpen,
    title: "Subject Specialists",
    description:
      "Educators with strong subject knowledge in areas required by schools and education providers.",
  },
  {
    icon: Users,
    title: "South African Educators",
    description:
      "South African educators looking to connect with suitable teaching opportunities.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Application",
    description:
      "Create your educator profile and submit your application with your personal, education and experience information.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "CV Review",
    description:
      "Our team reviews your CV and application to understand your qualifications, experience and teaching background.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Qualification Verification",
    description:
      "Your relevant qualifications and submitted documentation are reviewed and verified.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Interview",
    description:
      "Suitable candidates may be invited to an interview to discuss their experience, teaching approach and goals.",
    icon: Users,
  },
  {
    number: "05",
    title: "Technical Readiness",
    description:
      "For relevant online teaching opportunities, we assess your ability to work effectively in a digital teaching environment.",
    icon: Laptop,
  },
  {
    number: "06",
    title: "Approval",
    description:
      "Candidates who successfully complete the required stages may be approved to join the Elephant Learning Network.",
    icon: CheckCircle2,
  },
  {
    number: "07",
    title: "Talent Pool",
    description:
      "Approved educators become part of our talent pool and can be considered for suitable teaching opportunities.",
    icon: UserCheck,
  },
  {
    number: "08",
    title: "Matching",
    description:
      "When a suitable opportunity becomes available, your profile may be matched with the requirements of the education provider.",
    icon: School,
  },
];

export default function ForTeachers() {
  return (
    <main className="overflow-hidden bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-[#0B1F3A]">
        {/* Decorative background */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Hero content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
                <GraduationCap size={17} />
                For Educators
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build Your Teaching Career With{" "}
                <span className="text-[#F7F8F9]">Elephant Learning</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Join our network of educators and connect with potential
                teaching opportunities that match your qualifications,
                experience and availability.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/teacher/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#DCE0E3] px-7 py-4 font-semibold text-[#0B1F3A] transition duration-300 hover:text-[#DCE0E3] hover:bg-[#5B6067]"
                >
                  Join Our Teacher Network
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition duration-300 hover:border-[#5B6067] hover:bg-white/5"
                >
                  View the Process
                </a>
              </div>

              {/* Small trust points */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D4AF37]" />
                  Structured recruitment
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D4AF37]" />
                  Candidate support
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D4AF37]" />
                  Talent opportunities
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#132F4C] to-[#08182d]">

                  <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/30">
                      <GraduationCap size={46} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      Your Next Opportunity
                    </h3>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                      Connect your skills, experience and passion for education
                      with potential opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1F3A] text-[#D4AF37]">
                    <UserCheck size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Educator Network
                    </p>
                    <p className="font-semibold text-[#0B1F3A]">
                      Your profile matters
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          WHY JOIN
      ========================================================= */}
      <section className="bg-[#F8FAFC] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Why Join Elephant Learning?
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              More Than Just a Teaching Application
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Elephant Learning connects educators with schools and education
              providers while supporting candidates through a structured
              recruitment process.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-xl"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#D4AF37]/5 blur-2xl transition group-hover:bg-[#D4AF37]/10" />

                  <div className="relative">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#0B1F3A] text-[#D4AF37] transition duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#0B1F3A]">
                      <Icon size={24} />
                    </div>

                    <div className="mt-6 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                      0{index + 1}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold text-[#0B1F3A]">
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

      {/* =========================================================
          WHO CAN APPLY
      ========================================================= */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            {/* Left */}
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Who Can Apply?
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0B1F3A] sm:text-4xl">
                Educators From Different Backgrounds Are Welcome
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our teacher network is open to educators with different
                qualifications, experiences and areas of expertise.
              </p>

              <div className="mt-8 rounded-3xl bg-[#0B1F3A] p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Users size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  Your experience has value
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Whether you are an experienced teacher, graduate, tutor,
                  trainer or subject specialist, your background can form part
                  of your educator profile.
                </p>

                <Link
                  to="/teacher/register"
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-[#D4AF37] transition hover:text-[#e6c45c]"
                >
                  Create Your Profile
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="grid gap-4 sm:grid-cols-2">
              {eligibleApplicants.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0B1F3A] transition group-hover:bg-[#0B1F3A] group-hover:text-[#D4AF37]">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-5 font-semibold text-[#0B1F3A]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}
      <section
        id="process"
        className="bg-[#F8FAFC] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              How the Process Works
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              From Application to Opportunity
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our recruitment journey helps us understand your experience,
              verify your information and identify suitable opportunities.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="relative mt-16 hidden lg:block">

            <div className="absolute left-[6%] right-[6%] top-8 h-px bg-[#D4AF37]/30" />

            <div className="grid grid-cols-4 gap-7">
              {processSteps.slice(0, 4).map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#F8FAFC] bg-[#0B1F3A] text-[#D4AF37] shadow-lg">
                      <Icon size={24} />
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <span className="text-xs font-bold tracking-widest text-[#D4AF37]">
                        STEP {step.number}
                      </span>

                      <h3 className="mt-2 text-lg font-bold text-[#0B1F3A]">
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

            <div className="my-10 flex justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37] bg-white text-[#D4AF37]">
                <ArrowRight className="rotate-90" size={19} />
              </div>
            </div>

            <div className="absolute bottom-[calc(50%-1px)] left-[6%] right-[6%] h-px bg-[#D4AF37]/30" />

            <div className="grid grid-cols-4 gap-7">
              {processSteps.slice(4).reverse().map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#F8FAFC] bg-[#0B1F3A] text-[#D4AF37] shadow-lg">
                      <Icon size={24} />
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <span className="text-xs font-bold tracking-widest text-[#D4AF37]">
                        STEP {step.number}
                      </span>

                      <h3 className="mt-2 text-lg font-bold text-[#0B1F3A]">
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

          {/* Mobile timeline */}
          <div className="mt-12 lg:hidden">
            <div className="relative ml-4 border-l-2 border-[#D4AF37]/30 pl-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className={index === processSteps.length - 1 ? "" : "pb-8"}
                  >
                    <div className="absolute -left-[21px] flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A] text-[#D4AF37] ring-8 ring-[#F8FAFC]">
                      <Icon size={18} />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <span className="text-xs font-bold tracking-widest text-[#D4AF37]">
                        STEP {step.number}
                      </span>

                      <h3 className="mt-2 text-lg font-semibold text-[#0B1F3A]">
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

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 lg:py-24">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/20">
            <GraduationCap size={32} />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Start Your Journey
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Join the Elephant Learning Network?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Create your educator profile and take the first step towards being
            considered for suitable teaching opportunities.
          </p>

          <Link
            to="/teacher/register"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-[#0B1F3A] transition duration-300 hover:bg-[#e6c45c]"
          >
            Join Our Teacher Network
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

    </main>
  );
}

