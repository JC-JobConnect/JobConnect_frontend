import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 cursor-pointer right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all duration-300 hover:bg-teal-50 hover:text-teal-600 dark:border-teal-800 dark:bg-[#0F2A28] dark:text-teal-300 dark:hover:bg-teal-900 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTop;