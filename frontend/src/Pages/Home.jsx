import Category from '../Components/Catagory'
import Hero from '../Components/Hero'
import HowItWorks from '../Components/HowItWorks'
import Subscribe from '../Components/Suscribe'
import WhyChooseUs from '../Components/WhyChooseUs'


const Home = () => {
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
        <Hero />
        <Category />
        <HowItWorks />
        <WhyChooseUs />
        <Subscribe />
    </div>
  )
}

export default Home