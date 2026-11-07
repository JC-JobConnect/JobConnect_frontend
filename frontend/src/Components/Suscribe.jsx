import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoSend } from "react-icons/io5";

const Subscribe = () => {
  // state hooks
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState("");
  const [email, setEmail] = useState("");

  // Web3Forms submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setIsSending(true);

    try {
      const formDataObj = new FormData(event.currentTarget);
      formDataObj.append("access_key", "222dc648-0bef-4d2e-ab93-5bc9cc55e714");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult("Success! Your message has been sent.");
        setEmail(""); // Reset input field
      } else {
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setResult(
        "Unable to send your message. Please check your connection and try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-12 px-4 dark:bg-[#071A19]">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-teal-600 dark:bg-teal-800 px-6 py-14 text-center shadow-lg">
        {/* Decorative dots (left) */}
        <div className="absolute left-6 bottom-6 grid grid-cols-4 gap-1.5 opacity-30">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-200"
            />
          ))}
        </div>

        {/* Decorative plus */}
        <div className="absolute top-6 left-1/2 -translate-x-20 text-white/40 text-2xl font-light">
          +
        </div>

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
          onSubmit={onSubmit} //
          className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <div className="flex w-full items-center gap-2 bg-white dark:bg-slate-200 rounded-full px-4 py-3 shadow-sm">
            <HiOutlineMail className="text-gray-400 text-xl shrink-0" />
            <input
              type="email"
              name="email" //
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail address"
              required
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="flex items-center gap-2 bg-white dark:bg-slate-200 hover:bg-gray-300 text-teal-600 font-semibold px-6 py-3 rounded-full transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            <IoSend className="text-sm" />
            {isSending ? "Sending..." : "Subscribe"}
          </button>
        </form>

        {/* Result message display */}
        {result && (
          <p className="relative z-10 mt-4 text-white text-sm font-medium">
            {result}
          </p>
        )}
      </div>
    </section>
  );
};

export default Subscribe;
