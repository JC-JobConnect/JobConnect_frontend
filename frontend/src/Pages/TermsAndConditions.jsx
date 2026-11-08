import { useState } from "react";
import {FiChevronRight, FiArrowUp } from "react-icons/fi";
import PageHero from "../Components/Common/PageHero";

const sections = [
    {
        title: "Acceptance of Terms",
        content: (
            <p>
                By creating an account or using JobConnect, you confirm that you
                have read, understood, and agreed to these Terms & Conditions.
                If you do not agree, please discontinue using our services.
            </p>
        ),
    },
    {
        title: "About JobConnect",
        content: (
            <p>
                JobConnect is an online job portal that connects job seekers
                with employers. The platform allows users to explore job
                opportunities, create professional profiles, submit applications,
                and share job listings.
            </p>
        ),
    },
    {
        title: "User Accounts",
        content: (
            <ul>
                <li>You must provide accurate and up-to-date information when registering.</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You are responsible for activities performed through your account.</li>
                <li>You must notify us if you suspect unauthorized access.</li>
                <li>You must not create accounts using false identities.</li>
            </ul>
        ),
    },
    {
        title: "Job Seekers",
        content: (
            <>
                <p>As a job seeker, you agree to:</p>
                <ul>
                    <li>Provide truthful information in your profile, CV, and applications.</li>
                    <li>Apply only for positions you are genuinely interested in.</li>
                    <li>Avoid submitting misleading, fraudulent, or inappropriate content.</li>
                    <li>Keep your professional information reasonably up to date.</li>
                </ul>
            </>
        ),
    },
    {
        title: "Employers",
        content: (
            <>
                <p>As an employer, you agree to:</p>
                <ul>
                    <li>Provide accurate company and job information.</li>
                    <li>Publish genuine and lawful job opportunities.</li>
                    <li>Avoid discriminatory, misleading, or fraudulent job advertisements.</li>
                    <li>Use applicant information only for legitimate recruitment purposes.</li>
                    <li>Respect the privacy and rights of job applicants.</li>
                </ul>
            </>
        ),
    },
    {
        title: "Prohibited Activities",
        content: (
            <ul>
                <li>Using JobConnect for illegal, fraudulent, or harmful activities.</li>
                <li>Submitting false information or impersonating another person.</li>
                <li>Uploading malicious files, viruses, or harmful content.</li>
                <li>Attempting to access another user's account or private information.</li>
                <li>Interfering with the platform's security or normal operation.</li>
                <li>Copying or misusing platform content without permission.</li>
            </ul>
        ),
    },
    {
        title: "Job Listings and Applications",
        content: (
            <p>
                JobConnect provides a platform for job seekers and employers to
                connect. We do not guarantee that a job listing will result in
                an interview, employment offer, or successful recruitment.
                Employers are responsible for the accuracy of their job listings
                and recruitment decisions. Users should independently verify
                opportunities and exercise caution when sharing personal information.
            </p>
        ),
    },
    {
        title: "Account Suspension or Termination",
        content: (
            <p>
                We reserve the right to restrict, suspend, or terminate accounts
                that violate these Terms & Conditions, misuse the platform, or
                create risks for other users. Where appropriate, users may contact
                us to ask about an account restriction.
            </p>
        ),
    },
    {
        title: "Intellectual Property",
        content: (
            <p>
                The JobConnect name, branding, design, and original platform
                content may be protected by intellectual property laws. Users
                may not reproduce or distribute protected content without
                appropriate permission. Users remain responsible for content
                they upload.
            </p>
        ),
    },
    {
        title: "Limitation of Liability",
        content: (
            <p>
                JobConnect is provided on an "as available" basis. To the extent
                permitted by applicable law, we are not responsible for losses
                arising from inaccurate job listings, employer or applicant
                conduct, hiring decisions, or temporary service interruptions.
            </p>
        ),
    },
    {
        title: "Changes to These Terms",
        content: (
            <p>
                We may update these Terms & Conditions when necessary. Updated
                versions will be published on this page with a revised
                "Last Updated" date. Continued use of the platform after changes
                are published means you accept the updated terms.
            </p>
        ),
    },
    {
        title: "Contact Us",
        content: (
            <p>
                If you have questions about these Terms & Conditions, please
                contact the JobConnect team through the contact information
                provided on our website.
            </p>
        ),
    },
];

const TermsAndConditions = () => {

    const [activeSection, setActiveSection] = useState(0);

    const scrollToSection = (index) => {
        setActiveSection(index);
        document.getElementById(`terms-${index}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <div className="min-h-screen bg-[#f7fbfa] text-slate-800">
                    <PageHero title="Terms & Conditions" />
                <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[280px_1fr]">
                    <aside className="h-fit rounded-2xl border border-teal-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                        <h2 className="mb-4 text-lg font-bold">On this page</h2>
                        <nav className="space-y-1">
                            {sections.map((section, index) => (
                                <button
                                    key={section.title}
                                    onClick={() => scrollToSection(index)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${activeSection === index
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
                                Welcome to JobConnect
                            </h2>
                            <p className="mt-3 leading-7 text-slate-600">
                                By accessing or using our website and services, you agree
                                to comply with these Terms & Conditions. Please read them
                                carefully before using the platform.
                            </p>
                        </div>

                        <div className="space-y-9">
                            {sections.map((section, index) => (
                                <section
                                    key={section.title}
                                    id={`terms-${index}`}
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
        </>
    );
};

export default TermsAndConditions;