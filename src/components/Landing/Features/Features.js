import { features } from '../../../assets/constants/data'

const Features = () => {

  return (
    <div className='bg-gray-100 py-16'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-semibold mb-8'>The Online Result Checker Provides</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='p-6 bg-white rounded-lg shadow-md hover:border hover:border-blue-500 transform duration-500'>
              <h3 className='text-xl font-semibold mb-4'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
