import useAuth from "../../../hooks/useAuth"

const Dashboard = () => {
  const { status } = useAuth()

  let content = <div className='bg-green-500 text-white py-16'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-semibold mb-4'>Welcome to the Nigerian Railway Service Commission - Passenger Portal</h1>
        <p className='text-lg mb-8'>Your gateway to accessing and managing your railway journeys and services in Nigeria.</p>
        <button className='bg-white text-green-500 hover:bg-green-700 hover:text-white font-semibold py-2 px-4 rounded-full'>
          Get Started
        </button>
      </div>
    </div>
  if(status === 'Admin'){
    content =  <div className='bg-blue-500 text-white py-16'>
        <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-semibold mb-4'>Welcome to the Nigerian Railway Service Commission</h1>
        <p className='text-lg mb-8'>Your central hub for managing and overseeing railway operations in Nigeria.</p>
        <button className='bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-semibold py-2 px-4 rounded-full'>
            Get Started
        </button>
        </div>
    </div>
  }
  return content
}

export default Dashboard