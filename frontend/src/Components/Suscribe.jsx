import { HiOutlineMail } from "react-icons/hi";
import { IoSend } from "react-icons/io5";

const Subscribe = () => {
  return (
    <section className="py-12 px-4 dark:bg-[#071A19]">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-teal-600 dark:bg-teal-800 px-6 py-14 text-center shadow-lg">

        {/* Decorative dots (left) */}
        <div className="absolute left-6 bottom-6 grid grid-cols-4 gap-1.5 opacity-30">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-200" />
          ))}
        </div>

        {/* Decorative plus */}
        <div className="absolute top-6 left-1/2 -translate-x-20 text-white/40 text-2xl font-light">
          +
        </div>

        {/* Soft wave decoration (right) */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20">
          <div className="absolute right-10 top-8 h-40 w-40 rounded-full border border-white/40" />
          <div className="absolute right-0 top-20 h-56 w-56 rounded-full border border-white/30" />
        </div>

        {/* Content */}
        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-white leading-snug max-w-lg mx-auto">
          Subscribe to get info about the world of work
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <div className="flex w-full items-center gap-2 bg-white dark:bg-slate-200 rounded-full px-4 py-3 shadow-sm">
            <HiOutlineMail className="text-gray-400 text-xl shrink-0" />
            <input
              type="email"
              placeholder="Enter your mail address"
              required
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-white dark:bg-slate-200 hover:bg-gray-300 text-teal-600 font-semibold px-6 py-3 rounded-full transition-colors shrink-0 cursor-pointer"
          >
            <IoSend className="text-sm" />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;