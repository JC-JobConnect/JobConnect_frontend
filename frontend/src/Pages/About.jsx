import PageHero from "../Components/Common/PageHero";
import { useState } from "react";

import aboutHeroImg from "../Assets/images/image_1_about_us.webp";
import cardImg1 from "../Assets/images/image_2_about_us.webp";
import cardImg2 from "../Assets/images/image_3_about_us.webp";
import cardImg3 from "../Assets/images/image_4_about_us.webp";
import cardImg4 from "../Assets/images/image_5_about_us.webp";

import {
  FiUser,
  FiFileText,
  FiBriefcase,
  FiCheckCircle,
  FiPlus,
  FiX,
  FiThumbsUp,
  FiAward,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const HowItWorks = [
  {
    icon: <FiUser className="w-8 h-8 text-teal-500" />,
    title: "Create Account",
    desc: "Register in seconds to build your professional profile and unlock personalized career opportunities.",
  },
  {
    icon: <FiFileText className="w-8 h-8 text-teal-500" />,
    title: "Upload Resume",
    desc: "Upload your latest CV so recruiters can discover your candidate profile directly.",
  },
  {
    icon: <FiBriefcase className="w-8 h-8 text-teal-500" />,
    title: "Find Jobs",
    desc: "Explore curated job opportunities tailored to your skills, experience, and location preference.",
  },
  {
    icon: <FiCheckCircle className="w-8 h-8 text-teal-500" />,
    title: "Apply Job",
    desc: "Instantly connect with top employers and take the next step in advancing your career.",
  },
];

const faqs = [
  {
    id: 1,
    question: "Can I upload a CV?",
    answer: "Yes, you can upload your cv while creating your profile.",
  },
  {
    id: 2,
    question: "How long will the recruitment process take?",
    answer:
      "The recruitment process typically takes 2-4 weeks depending on the role and number of applicants.",
  },
  {
    id: 3,
    question: "What does the recruitment and selection process involve?",
    answer:
      "It usually includes CV screening, interviews, technical assessments, and final offer stage.",
  },
  {
    id: 4,
    question: "Do you recruit for Graduates, Apprentices and Students?",
    answer:
      "Yes, we actively recruit graduates, apprentices and students across multiple industries.",
  },
  {
    id: 5,
    question:
      "Can I receive notifications for any future jobs that may interest me?",
    answer:
      "Absolutely. You can set job alerts based on your preferences and receive email notifications.",
  },
];

const features = [
  { icon: <FiThumbsUp className="w-5 h-5" />, title: "Quality Job" },
  { icon: <FiUsers className="w-5 h-5" />, title: "Freshers" },
  { icon: <FiAward className="w-5 h-5" />, title: "Top Companies" },
  { icon: <FiStar className="w-5 h-5" />, title: "Top Talents" },
];

function AboutUs() {
  const [openFaq, setOpenFaq] = useState(1);
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#071A19] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <PageHero title="About Us" badgeText="Who We Are" />

      {/* Connecting Talent */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Connecting Talent with
            <br />
            Possibilities
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            JobConnect began its journey in 2026 as a tech startup with a
            vision to connect job seekers and employers on one platform. It
            offers job seekers an easy way to showcase their skills and apply
            for desired jobs, while helping employers make hiring simpler,
            transparent, and cost-effective.
          </p>
        </div>

        <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-linear-to-br from-gray-300 via-gray-400 to-gray-500 transition-transform duration-300 ease-in-out hover:scale-[1.01]">
          <img
            src={aboutHeroImg}
            alt="JobConnect team"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            How it works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Our platform makes job searching smarter and more efficient.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HowItWorks.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#102B2A] border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm dark:shadow-black/20 hover:shadow-xl hover:-translate-y-1.5 hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="FAQ" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Clear answers to common questions about JobConnect.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "bg-teal-50 border-teal-200 dark:bg-[#102B2A] dark:border-teal-800"
                    : "bg-white border-gray-200 hover:border-teal-300 dark:bg-[#04110F] dark:border-slate-700 dark:hover:border-teal-600"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between cursor-pointer gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-sm font-medium text-gray-400 dark:text-gray-500 w-6 shrink-0">
                      {String(faq.id).padStart(2, "0")}
                    </span>

                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </span>
                  </div>

                  {isOpen ? (
                    <FiX className="w-5 h-5 text-teal-500 shrink-0" />
                  ) : (
                    <FiPlus className="w-5 h-5 text-teal-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pl-16">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* We're Only Working With The Best */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-48 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={cardImg1}
                  alt="Professionals collaborating"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>

              <div className="h-32 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={cardImg2}
                  alt="Professional team"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="h-40 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={cardImg3}
                  alt="Team working together"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>

              <div className="h-36 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={cardImg4}
                  alt="Professional collaboration"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              We’re Only Working
              <br />
              With The Best
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-justify">
              Empowering leading organizations by bridging the gap with
              high-performing industry professionals.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-[#103A43] flex items-center justify-center text-teal-600 dark:text-teal-400">
                    {item.icon}
                  </div>

                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
