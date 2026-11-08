import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Img1 from "../../Assets/images/register.webp";
import Img2 from "../../Assets/images/uploadcv.webp";
import Img3 from "../../Assets/images/searchjob.webp";
import Img4 from "../../Assets/images/status.webp";

const HowItWorks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(sessionStorage.getItem("access_token")),
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("access_token")));
    };

    window.addEventListener("authChanged", syncAuth);
    return () => window.removeEventListener("authChanged", syncAuth);
  }, []);

  const steps = [
    {
      id: 1,
      title: isLoggedIn ? "Prepare Your Profile" : "Create Your Free Account",
      description: isLoggedIn
        ? "Upload your CV or fill in your information to complete your profile."
        : "Sign up for free in just a few minutes.",
      image: isLoggedIn ? Img2 : Img1,
      path: isLoggedIn ? "/profile" : "/register",
    },
    {
      id: 2,
      title: isLoggedIn
        ? "Search & Apply Your Dream Job"
        : "Search Your Dream Job",
      description: isLoggedIn
        ? "Browse thousands of opportunities all at one place apply with one click."
        : "Browse thousands of opportunities.",
      image: Img3,
      path: "/jobs",
    },
    {
      id: 3,
      title: isLoggedIn ? "See Application Status" : "Choose & Apply",
      description: isLoggedIn
        ? " Find your all applications in one place and track there status "
        : "Choose your dream job and apply with one click.",
      image: isLoggedIn ? Img4 : Img2,
      path: isLoggedIn ? "/my-applications" : "/login",
    },
  ];

  return (
    <section className="py-16 bg-[#F0FDFA] dark:bg-[#071A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Find a Job in <span className="text-teal-500">3 Steps</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Just a few simple steps to get started
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Dashed line (desktop only) */}
          <div className="hidden md:block absolute top-28 left-[16%] right-[16%] border-t-2 border-dashed border-teal-200 dark:border-teal-800 z-0" />

          {steps.map((step) => (
            <Link
              key={step.id}
              to={step.path}
              className="relative z-10 bg-white dark:bg-[#0F2A28] rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-teal-900/40 hover:shadow-md hover:translate-y-1 duration-300 transition-all block"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center shadow-md">
                {step.id}
              </div>

              {/* Image */}
              <div className="mt-4 mb-5 flex justify-center h-40">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="h-full w-32 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-400 text-sm">
                    Image
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-md"
          >
            Get Started Now
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
