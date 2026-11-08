import Category from '../Components/Home/Catagory'
import TopCompanies from '../Components/Home/TopCompanies'
import Hero from '../Components/Home/Hero'
import HowItWorks from '../Components/Home/HowItWorks'
import Subscribe from '../Components/Home/Suscribe'
import WhyChooseUs from '../Components/Home/WhyChooseUs'
import FeaturedJobCard from '../Components/Home/FeaturedJobCard'
import Testimonials from '../Components/Home/Testimonial'
import HomePageJobs from '../Components/Home/JobCards'


const Home = () => {
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
        <Hero />
        <FeaturedJobCard />
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