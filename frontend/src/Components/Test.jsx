
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Img from "../Assets/images/searchjob.webp"

export default function HiringCTACard({
  title = "WE ARE HIRING",
  subtitle = "Apply Today!",
  description = "Hellow All",
  buttonText = "Jobs",
  buttonLink = "/jobs",
  backgroundImage = Img,
}) {
  return (
    <div
      className="group relative mt-4 h-65 w-full overflow-hidden
                 rounded-xl bg-linear-to-br from-gray-500 via-gray-400 to-slate-500
                 shadow-sm transition-all duration-300 hover:shadow-lg
                 dark:from-teal-950 dark:via-[#0E2928] dark:to-slate-900"
    >
      {/* Optional background image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover
                     opacity-40 blur-[2px] transition-transform
                     duration-500 group-hover:scale-105"
        />
      )}

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/40 dark:from-black/20 dark:to-black/50" />

      {/* Decorative blurred background */}
      <div
        className="absolute -bottom-9 left-1/2 h-36 w-36
                   -translate-x-1/2 rounded-full bg-white/20 blur-3xl
                   transition-transform duration-500 group-hover:scale-125"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-4 text-white">
        <h3 className="text-xl font-extrabold tracking-wide sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-sm font-medium text-white/95">
          {subtitle}
        </p>

        {description && (
          <p className="mt-2 max-w-50 text-xs leading-5 text-white/80">
            {description}
          </p>
        )}

        {/* Optional CTA button */}
        {buttonText && (
          <Link
            to={buttonLink}
            className="mt-auto inline-flex w-fit items-center gap-2
                       rounded-full bg-white px-4 py-2 text-xs
                       font-bold text-teal-700 transition-all
                       hover:bg-teal-50 hover:shadow-md
                       dark:text-teal-900"
          >
            {buttonText}
            <FiArrowUpRight className="text-sm" />
          </Link>
        )}
      </div>
    </div>
  );
}
