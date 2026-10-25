import React from 'react'

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-[#0B2B61] to-[#1C4CD2] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="inline-flex mt-16 shrink-0 items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 border border-white/30 text-sm font-medium text-white">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>Your Next Opportunity Awaits
        </div>
        <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl mt-5 tracking-tight">
          Find Your <span className='text-[#06B6D4] '>Dream Job</span> <br />Build Your <span className='text-[#06B6D4] '>Future</span>
        </h1>
        <p className="mt-4 text-1xl md:text-xl  text-white/80 max-w-3xl mx-auto">
          Discover thousands Of Job Opportunities From Top Companies <br />Start Your Career Journey Today
        </p>
      </div>
    </section>
  )
}

export default Hero