import Hero from './Hero/Hero'
import Features from './Features/Features'
import Testimonials from './Testimonials/Testimonials'

const Landing = () => {
  return (
    <article className='flex flex-col w-full bg-gray-100 text-gray-900'>
        <Hero />
        <Features />
        <Testimonials />
    </article>
  )
}

export default Landing