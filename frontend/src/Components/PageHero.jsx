import { useState, useEffect } from "react";
import Hero_bg from "../Assets/images/Hero_bg2.webp";
import Hero_bg2 from "../Assets/images/Hero_bg.webp";

const PageHero = ({ title }) => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <section className="bg-black text-white">
      <div className=" relative h-64 md:h-80 bg-green-400 overflow-hidden">
        <img src={darkMode ? Hero_bg2 : Hero_bg} alt="" className="absolute inset-0 w-full h-full   object-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 text-center">

          <h1 className="text-3xl text-green-400 font-bold sm:text-4xl md:text-5xl mt-5 tracking-tight">
            {title}
          </h1>
        </div>


      </div>

    </section>
  );
};

export default PageHero;