import { useState } from "react";
import {
  FaStar,
  FaQuoteRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Alex Sohag",
    role: "Frontend Developer",
    company: "Google",
    rating: 5,
    text: "JobConnect made my job search so much easier! I discovered great opportunities that matched my skills and landed my dream job.",
    image: "/images/testimonials/person-1.jpg",
    color: "from-teal-400 to-emerald-500",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    role: "UI/UX Designer",
    company: "Creative Studio",
    rating: 5,
    text: "I found an amazing opportunity through JobConnect. The platform is easy to use, and the application process was incredibly smooth.",
    image: "/images/testimonials/person-2.jpg",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: 3,
    name: "Hasan Mahmud",
    role: "Frontend Developer",
    company: "TechNova",
    rating: 5,
    text: "I had been searching for the right position for months. JobConnect helped me discover relevant openings and move forward in my career.",
    image: "/images/testimonials/person-3.jpg",
    color: "from-cyan-400 to-teal-500",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Product Designer",
    company: "DesignHub",
    rating: 5,
    text: "The personalized job opportunities saved me so much time. I could focus on applying for positions that really suited my experience.",
    image: "/images/testimonials/person-4.jpg",
    color: "from-teal-300 to-emerald-500",
  },
  {
    id: 5,
    name: "Rahim Uddin",
    role: "Software Engineer",
    company: "NextGen Technologies",
    rating: 5,
    text: "JobConnect helped me take the next step in my professional journey. I especially love how simple it is to track my applications.",
    image: "/images/testimonials/person-5.jpg",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: 6,
    name: "Mim Akter",
    role: "Digital Marketer",
    company: "GrowthLab",
    rating: 5,
    text: "A fantastic platform for discovering career opportunities. The clean interface and relevant listings made my search much easier.",
    image: "/images/testimonials/person-6.jpg",
    color: "from-cyan-400 to-emerald-500",
  },
  {
    id: 7,
    name: "Tanvir Hasan",
    role: "Backend Developer",
    company: "CloudSoft",
    rating: 5,
    text: "From finding suitable jobs to keeping track of applications, everything feels organized. I would recommend JobConnect to other job seekers.",
    image: "/images/testimonials/person-7.jpg",
    color: "from-teal-400 to-cyan-600",
  },
  {
    id: 8,
    name: "Farhana Islam",
    role: "HR Specialist",
    company: "PeopleFirst",
    rating: 5,
    text: "JobConnect provides a straightforward way to explore new career possibilities. It helped me connect with opportunities I might otherwise have missed.",
    image: "/images/testimonials/person-8.jpg",
    color: "from-emerald-400 to-teal-500",
  },
];

// Positions of the profile pictures around the circle.
const orbitSlots = [
  "top-0 left-1/2 -translate-x-1/2",
  "top-[16%] right-[10%]",
  "top-1/2 right-0 -translate-y-1/2",
  "bottom-[16%] right-[10%]",
  "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-[16%] left-[10%]",
  "top-1/2 left-0 -translate-y-1/2",
  "top-[16%] left-[10%]",
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const activeTestimonial = testimonials[activeIndex];
  const orbitPeople = testimonials
    .map((person, index) => ({ ...person, originalIndex: index }))
    .filter((person) => person.originalIndex !== activeIndex);

  const selectTestimonial = (index) => {
    setActiveIndex(index);
    setAnimationKey((previous) => previous + 1);
  };

  const showPrevious = () => {
    selectTestimonial(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const showNext = () => {
    selectTestimonial((activeIndex + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F9FAFB] py-20 transition-colors duration-300 dark:bg-[#071A19] sm:py-24"
    >
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
            Testimonials
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            What Our Jobholders{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Are Saying
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Discover how JobConnect helps job seekers find opportunities,
            build confidence, and take the next step in their careers.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* LEFT: Interactive Avatar Circle */}
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-107.5">
              {/* Outer Orbit */}
              <div className="absolute inset-[8%] rounded-full border border-dashed border-teal-300/60 dark:border-teal-700/60" />

              {/* Middle Orbit */}
              <div className="absolute inset-[20%] rounded-full border border-teal-200/70 dark:border-teal-800/60" />

              {/* Soft Circle Background */}
              <div className="absolute inset-[27%] rounded-full bg-linear-to-br from-teal-50 via-white to-emerald-50 shadow-[0_15px_60px_rgba(13,148,136,0.08)] dark:from-teal-950/60 dark:via-[#0A2422] dark:to-emerald-950/40" />

              {/* Decorative Center Glow */}
              <div className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/10 blur-2xl" />

              {/* Orbiting Profiles */}
              {orbitPeople.map((person, position) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() =>
                    selectTestimonial(person.originalIndex)
                  }
                  aria-label={`View testimonial from ${person.name}`}
                  aria-pressed={false}
                  title={person.name}
                  className={`absolute z-20 ${orbitSlots[position]} group flex h-13.5 w-13.5 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-teal-500/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/40 dark:border-[#153A36] dark:bg-[#153A36] sm:h-15.5 sm:w-15.5 cursor-pointer`}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  {/* Hover Indicator */}
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-teal-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}

              {/* Selected Person in the Center */}
              <div
                key={animationKey}
                className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center animate-testimonial-center"
              >
                <div
                  className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br ${activeTestimonial.color} p-1 shadow-[0_12px_35px_rgba(13,148,136,0.22)] sm:h-36 sm:w-36`}
                >
                  <div className="h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-[#0A2422]">
                    <img
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </div>

                  {/* Quote Badge */}
                  <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#F9FAFB] bg-teal-500 text-white dark:border-[#071A19]">
                    <FaQuoteRight className="text-sm" />
                  </div>
                </div>

                <span className="mt-3 max-w-36 truncate rounded-full border border-teal-200 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm dark:border-teal-800 dark:bg-[#102A27] dark:text-teal-300">
                  {activeTestimonial.name}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Testimonial Details */}
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <div
              key={`content-${animationKey}`}
              className="animate-testimonial-content"
            >
              {/* Company Name - Text Only, No Logo Image */}
              <div className="mb-7">
                <span className="text-3xl font-extrabold tracking-tight text-teal-700 dark:text-teal-400 sm:text-4xl">
                  {activeTestimonial.company}
                </span>

                <div className="mt-3 h-1 w-14 rounded-full bg-linear-to-r from-teal-500 to-emerald-400" />
              </div>

              {/* Testimonial Text */}
              <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_15px_50px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-white/10 dark:bg-[#0B2422]/70 sm:p-8">
                <FaQuoteRight className="absolute right-6 top-6 text-3xl text-teal-500/15 sm:text-4xl" />

                <p className="relative z-10 pr-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  "{activeTestimonial.text}"
                </p>

                {/* Rating */}
                <div
                  className="mt-6 flex items-center gap-1.5"
                  aria-label={`${activeTestimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < activeTestimonial.rating
                          ? "text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      }
                    />
                  ))}

                  <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {activeTestimonial.rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Reviewer Details and Navigation */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {activeTestimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {activeTestimonial.role}
                    <span className="mx-2 text-teal-500">•</span>
                    {activeTestimonial.company}
                  </p>
                </div>

                {/* Previous / Next */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/30 dark:border-white/10 dark:bg-[#102A27] dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-900/40"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next testimonial"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/40 dark:bg-teal-500 dark:hover:bg-teal-400 dark:hover:text-[#071A19]"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* Testimonial Counter */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex gap-1.5">
                  {testimonials.map((person, index) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => selectTestimonial(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={
                        index === activeIndex ? "true" : undefined
                      }
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-8 bg-teal-500"
                          : "w-3 bg-slate-300 hover:bg-teal-300 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
