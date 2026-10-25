import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <a href="/"><div className="flex items-center gap-2 mb-4">JC
                            <div className="text-xl font-semibold text-slate-900">Job<span className='text-blue-600'>Connect</span></div>
                        </div></a>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                            Connecting talent with opportunity
                            <br className='hidden md:block' />
                            Join us and Build your career,
                            <br className='hidden md:block' />
                            with JobConnect.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <a href="/" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/jobs" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-1 ml-3">Stay Connected Wtih Us</h3>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-full text-sm transition-colors cursor-pointer"
                            >
                                Subscribe now
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-600">
                        © {new Date().getFullYear()} JobConnect. All rights reserved
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-2">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-2">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer