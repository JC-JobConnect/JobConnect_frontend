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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // web3form
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formDataObj = new FormData(event.target);
    formDataObj.append("access_key", "222dc648-0bef-4d2e-ab93-5bc9cc55e714");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataObj,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Success! Email sent.");

      // Clear the React state to empty out the input boxes
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });

      event.target.reset();
    } else {
      console.log("Error details:", data);
      setResult(data.message || "Error submitting form");
    }
  };

  return (
    <div>
      <PageHero title="Contact Us" badgeText="Get In Touch" />

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white">
        {/* --- left column: information --- */}

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              You Will Grow, You Will Succeed. We Promise That
            </h2>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-lg">
              Mauritius's leading job portal connecting talented professionals
              with top employers across the country. Connect talent with
              opportunity.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 pt-4">
            {/* Call */}
            <div className="flex flex-col items-start gap-3">
              <FiPhoneCall className="text-sky-400 text-2xl mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xl">
                  Call for inquiry
                </h4>
                <p className="text-gray-900 text-lg mt-2">+880 1810000023</p>
              </div>
            </div>

            {/* email */}
            <div className="flex flex-col items-start gap-3">
              <FiMail className="text-sky-400 text-2xl mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xl">
                  Send us email
                </h4>
                <a
                  href="mailto:juweanaoffice@gmail.com"
                  className="no-underline text-inherit"
                >
                  <p className="text-gray-900 text-lg mt-2">
                    juweanaoffice@gmail.com
                  </p>
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex flex-col items-start gap-3">
              <FiClock className="text-sky-400 text-2xl mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xl">
                  Opening hours
                </h4>
                <p className="text-gray-900 text-lg mt-2">
                  Mon - Fri: 9AM - 6PM
                </p>
              </div>
            </div>

            {/* Office */}
            <div className="flex flex-col items-start gap-3">
              <FiMapPin className="text-sky-400 text-2xl mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xl">Office</h4>
                <p className="text-gray-900 text-lg mt-2">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/*-right column: form card -*/}

        <div className="bg-[#F2F7FD] w-full max-w-[552px] mx-auto p-[40px] rounded-[20px] shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Contact Info</h3>
            <p className="text-base text-gray-500 mt-1">
              Please provide your contact information
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-base bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 placeholder-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-base bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 placeholder-gray-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your E-mail address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-base bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 placeholder-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-800 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 text-base bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 placeholder-gray-300 shadow-sm resize-none"
                required
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 text-white text-base font-medium py-2.5 px-6 rounded-md transition duration-200 shadow-sm"
              >
                Send Message
              </button>
            </div>

            {/* Display submission status */}
            {result && (
              <p className="text-sm text-gray-700 mt-2" role="status">
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
