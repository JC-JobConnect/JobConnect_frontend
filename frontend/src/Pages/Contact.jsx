import PageHero from "../Components/PageHero";
import { useState } from "react";
import { FiPhoneCall, FiMail, FiClock, FiMapPin } from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Web3Forms submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setIsSending(true);

    try {
      const formDataObj = new FormData(event.currentTarget);
      formDataObj.append(
        "access_key",
        "222dc648-0bef-4d2e-ab93-5bc9cc55e714"
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult("Success! Your message has been sent.");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setResult("Unable to send your message. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-3 py-3 text-base text-gray-800 placeholder:text-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-slate-700 dark:bg-[#04110F] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-teal-500";

  const contactTitleClass =
    "text-xl font-bold text-gray-900 dark:text-white";

  const contactTextClass =
    "mt-2 text-lg text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#071A19] dark:text-gray-100">
      <PageHero title="Contact Us" badgeText="Get In Touch" />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-16 lg:grid-cols-2">
        {/* Left column: Contact information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-4xl">
              You Will Grow, You Will Succeed. We Promise That
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Mauritius's leading job portal connecting talented professionals
              with top employers across the country. Connect talent with
              opportunity.
            </p>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 pt-4 sm:grid-cols-2">
            {/* Phone */}
            <div className="flex flex-col items-start gap-3">
              <FiPhoneCall className="mt-2 shrink-0 text-2xl text-teal-600 dark:text-teal-400" />
              <div>
                <h4 className={contactTitleClass}>Call for inquiry</h4>
                <p className={contactTextClass}>+880 1810000023</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start gap-3">
              <FiMail className="mt-2 shrink-0 text-2xl text-teal-600 dark:text-teal-400" />
              <div>
                <h4 className={contactTitleClass}>Send us email</h4>
                <a
                  href="mailto:juweanaoffice@gmail.com"
                  className="mt-2 inline-block text-lg text-gray-700 transition-colors hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  juweanaoffice@gmail.com
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex flex-col items-start gap-3">
              <FiClock className="mt-2 shrink-0 text-2xl text-teal-600 dark:text-teal-400" />
              <div>
                <h4 className={contactTitleClass}>Opening hours</h4>
                <p className={contactTextClass}>Mon - Fri: 9AM - 6PM</p>
              </div>
            </div>

            {/* Office */}
            <div className="flex flex-col items-start gap-3">
              <FiMapPin className="mt-2 shrink-0 text-2xl text-teal-600 dark:text-teal-400" />
              <div>
                <h4 className={contactTitleClass}>Office</h4>
                <p className={contactTextClass}>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Contact form card */}
        <div className="mx-auto w-full max-w-138 rounded-[20px] border border-slate-100 bg-linear-to-b from-white to-emerald-50/70 p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:from-[#102B2A]  dark:to-[#102B2A] sm:p-10">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Contact Info
            </h3>
            <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
              Please provide your contact information
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* First and last name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-base font-semibold text-gray-800 dark:text-gray-200"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Your name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-base font-semibold text-gray-800 dark:text-gray-200"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contactEmail"
                className="mb-1.5 block text-base font-semibold text-gray-800 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                id="contactEmail"
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                autoComplete="email"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contactMessage"
                className="mb-1.5 block text-base font-semibold text-gray-800 dark:text-gray-200"
              >
                Message
              </label>
              <textarea
                id="contactMessage"
                name="message"
                rows={5}
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
                required
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="cursor-pointer rounded-2xl bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-200 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* Submission status */}
            {result && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  result.startsWith("Success")
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {result}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;