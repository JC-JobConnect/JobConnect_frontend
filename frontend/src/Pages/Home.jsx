import Category from '../Components/Catagory'
import Hero from '../Components/Hero'
import HowItWorks from '../Components/HowItWorks'


const Home = () => {
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
        <Hero />
        <Category />
        <HowItWorks />
    </div>
  )
}

export default Home