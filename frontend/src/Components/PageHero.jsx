
import Hero from "../Assets/images/Hero.webp";

const PageHero = ({ title }) => {
  return (
    <section className="relative overflow-hidden">

      <div className="relative isolate overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-100 dark:from-[#071A19] dark:via-[#0A2422] dark:to-[#0D3D38]">

        {/* Decorative backgrounds */}
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

        {/* DESKTOP HERO */}
        <div className="relative z-10 mx-auto hidden max-w-7xl grid-cols-2 items-end gap-8 px-8 pt-28 pb-0 md:grid lg:px-10">

          {/* Left: Content */}
          <div className="relative z-20 flex flex-col items-start text-left pb-20">
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-4 h-1.5 w-20 rounded-full bg-linear-to-r from-green-500 to-emerald-400" />

            <p className="mt-4 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
              Discover new opportunities, connect with leading employers, and
              take the next step toward your career goals.
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative z-10 flex h-72 items-end justify-center sm:h-80 md:h-70">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-green-400/15 blur-3xl" />

            <img
              src={Hero}
              alt="Job seeker exploring career opportunities"
              className="relative z-10 h-full w-auto max-w-none object-contain object-bottom scale-110 origin-bottom"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* MOBILE HERO */}
        <div className="relative mx-auto flex min-h-61 max-w-xl items-center overflow-hidden px-5 pt-20 pb-5 md:hidden">

          {/* Soft background glow */}
          <div className="pointer-events-none absolute right-0 bottom-0 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />

          {/* Mobile text */}
          <div className="relative z-20 w-[65%] py-5">

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>

            <div className="mt-3 h-1.5 w-14 rounded-full bg-linear-to-r from-green-500 to-emerald-400" />

            <p className="mt-3 max-w-58text-sm leading-6 text-gray-600 dark:text-gray-300">
              Discover opportunities and take the next step toward your career goals.
            </p>

          </div>

          {/* Mobile illustration */}
          <div className="pointer-events-none absolute -right-4 bottom-0 z-10 flex h-48 w-[58%] items-end justify-end">

            <img
              src={Hero}
              alt="Job seeker exploring career opportunities"
              className="h-full w-full object-contain object-bottom-right"
              fetchPriority="high"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default PageHero;
