import { Link } from 'react-router-dom'

import { urls } from '../../../assets/constants/data'

const Hero = () => {
  return (
    <div className='bg-blue-600 text-white py-16'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to the Computer Science Department's Result Checker</h1>
        <p className='text-lg mb-8'>Check your grades and academic progress online</p>
        <div className='flex justify-center'>
          <Link to={`/${urls.signin}`} className='bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out'>
            Check Results
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero