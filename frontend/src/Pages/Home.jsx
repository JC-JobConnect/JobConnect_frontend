import Category from '../Components/Catagory'
import TopCompanies from '../Components/TopCompanies'
import Hero from '../Components/Hero'
import HowItWorks from '../Components/HowItWorks'
import Subscribe from '../Components/Suscribe'
import WhyChooseUs from '../Components/WhyChooseUs'
import FeaturedJobs from '../Components/FeaturedJobs'
import Testimonials from '../Components/Testimonial'
import HomePageJobs from '../Components/HomePageJobs'


const Home = () => {
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
        <Hero />
        <FeaturedJobs />
        <TopCompanies />
        <Category />
        <HomePageJobs />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <Subscribe />
    </div>
  )
}

export default Home