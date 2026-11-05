
import { useState } from "react";
import PageHero from "../Components/PageHero";
import {
  FiChevronRight,
  FiArrowUp,
} from "react-icons/fi";

const sections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>Depending on how you use JobConnect, we may collect:</p>
        <h4 className="font-semibold text-slate-700">Personal Information</h4>
        <ul>
          <li>Full name, email address, phone number, and location.</li>
        </ul>
        <h4 className="font-semibold text-slate-700">Professional Information</h4>
        <ul>
          <li>Professional headline and biography.</li>
          <li>Education, work experience, skills, and qualifications.</li>
          <li>Uploaded CV or resume.</li>
          <li>Portfolio, LinkedIn, and GitHub links.</li>
        </ul>
        <h4 className="font-semibold text-slate-700">Account and Usage Information</h4>
        <ul>
          <li>Username, password credentials, account type, and authentication information.</li>
          <li>Basic technical information about your browser and device.</li>
          <li>Information needed to maintain platform security and performance.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <ul>
        <li>Create and manage user accounts.</li>
        <li>Display job seeker profiles to support recruitment.</li>
        <li>Allow job seekers to apply for available positions.</li>
        <li>Help employers review and manage applications.</li>
        <li>Communicate important account or platform updates.</li>
        <li>Improve website functionality and user experience.</li>
        <li>Detect and prevent fraud, abuse, and unauthorized access.</li>
      </ul>
    ),
  },
  {
    title: "Sharing of Information",
    content: (
      <>
        <p>JobConnect does not make users' private information publicly available by default.</p>
        <p>Information may be shared:</p>
        <ul>
          <li>With employers when a job seeker submits an application.</li>
          <li>When information is intentionally included in a public profile or job listing.</li>
          <li>With necessary service providers who help operate the platform.</li>
          <li>When disclosure is required by applicable law or necessary to protect users.</li>
        </ul>
        <p>
          Employers are responsible for handling applicant information
          appropriately and using it only for legitimate recruitment purposes.
        </p>
      </>
    ),
  },
  {
    title: "CV and Profile Information",
    content: (
      <p>
        Job seekers may upload CVs and add professional information to
        their profiles. This information may be used to support job
        applications and recruitment. Users should avoid including
        unnecessary sensitive personal information in their CVs.
        Access to private documents should be restricted to authorized
        users and legitimate platform functions.
      </p>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        We use reasonable technical and organizational measures to help
        protect user information from unauthorized access, alteration,
        disclosure, or destruction. However, no online platform or
        electronic storage method can guarantee complete security.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        We retain personal information for as long as necessary to
        provide our services, maintain user accounts, meet legitimate
        operational needs, and comply with applicable legal requirements.
        Users may contact us to request account or personal information
        deletion, subject to applicable requirements and technical limitations.
      </p>
    ),
  },
  {
    title: "Your Privacy Rights",
    content: (
      <ul>
        <li>Access and update your profile information.</li>
        <li>Correct inaccurate personal information.</li>
        <li>Remove uploaded CVs or profile details.</li>
        <li>Request deletion of your account and associated information.</li>
        <li>Ask questions about how your information is used.</li>
      </ul>
    ),
  },
  {
    title: "Cookies and Similar Technologies",
    content: (
      <p>
        JobConnect may use cookies or similar technologies where needed
        for essential website functionality, authentication, security,
        or user preferences. Browser settings may allow you to manage
        or block cookies, although some features may not work correctly afterward.
      </p>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        Our platform may contain links to external websites or services.
        JobConnect is not responsible for the privacy practices, content,
        or security of third-party websites. We encourage users to review
        their privacy policies before sharing information.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        JobConnect is designed for people seeking employment and is not
        intended to knowingly collect personal information from children
        in violation of applicable laws.
      </p>
    ),
  },
  {
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy as our platform or practices
        change. Any updates will be published on this page with a revised
        "Last Updated" date.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <p>
        If you have questions, concerns, or requests regarding this
        Privacy Policy, please contact the JobConnect team through the
        contact information provided on our website.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (index) => {
    setActiveSection(index);
    document.getElementById(`privacy-${index}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7fbfa] text-slate-800">
<PageHero title="Privacy Policy" />

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-teal-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-bold">On this page</h2>
          <nav className="space-y-1">
            {sections.map((section, index) => (
              <button
                key={section.title}
                onClick={() => scrollToSection(index)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeSection === index
                    ? "bg-teal-50 font-semibold text-teal-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{section.title}</span>
                <FiChevronRight />
              </button>
            ))}
          </nav>
        </aside>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-xl font-bold sm:text-2xl">
              Your Privacy at JobConnect
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              At JobConnect, we value your privacy and are committed
              to protecting your personal information. This policy
              explains what information we collect, how we use it,
              and how we handle it.
            </p>
          </div>

          <div className="space-y-9">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`privacy-${index}`}
                className="scroll-mt-28"
              >
                <h3 className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-800">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm text-teal-700">
                    {index + 1}
                  </span>
                  {section.title}
                </h3>
                <div className="legal-content space-y-3 text-sm leading-7 text-slate-600">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}
