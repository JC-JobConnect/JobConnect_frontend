import Hero from "../Assets/images/Hero.webp";

const PageHero = ({ title }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-100 dark:from-[#071A19] dark:via-[#0A2422] dark:to-[#0D3D38]">

        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end gap-6 px-5 pt-24 pb-0 sm:px-8 md:grid-cols-2 md:gap-8 md:pt-28 lg:px-10">

          {/* Left Side: Title */}
          <div className="relative z-20 flex flex-col items-center text-center md:items-start md:text-left md:pb-20">
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {title}
            </h1>

            <div className="mt-4 h-1.5 w-20 rounded-full bg-linear-to-r from-green-500 to-emerald-400" />

            <p className="mt-4 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
              Discover new opportunities, connect with leading employers, and
              take the next step toward your career goals.
            </p>
          </div>

          {/* Right Side: Illustration - Bigger */}
          <div className="relative z-10 flex items-end justify-center h-72 sm:h-80 md:h-70">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-green-400/15 blur-3xl" />

            <img
              src={Hero}
              alt="Job seeker exploring career opportunities"
              className="relative z-10 h-full w-auto max-w-none object-contain object-bottom scale-110 origin-bottom"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;