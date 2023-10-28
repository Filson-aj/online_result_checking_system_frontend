import { testimonials } from '../../../assets/constants/data'

const Testimonials = () => {
  
  return (
    <div className='bg-gray-900 text-white py-16'>
      <div className='container mx-auto text-justify'>
        <h2 className='text-3xl font-semibold mb-8 text-center'>What Users Are Saying...</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 hover:border transform duration-500'>
              <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold'>{testimonial.name}</p>
                <p className='text-gray-400 text-justify'>{testimonial.position}</p>
              </div>
              <p className='text-xl mt-4'>{`'${testimonial.quote}'`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
