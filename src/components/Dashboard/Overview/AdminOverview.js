import { Link } from 'react-router-dom'
import { FaUser, FaBook, FaChalkboardTeacher, FaUsers, FaClipboard, FaPollH, FaCog } from 'react-icons/fa'

import { urls } from '../../../assets/constants/data'

const AdminOverview = () => {
  const modules = [
    {
      icon: <FaCog />,
      title: 'Dashboard',
      description: 'Overview of system activities and statistics.',
      link: `/${urls.dashboard}`
    },
    {
      icon: <FaBook />,
      title: 'Courses',
      description: 'Manage and update course information.',
      link: `/dashboard/${urls.courses}`
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Staff',
      description: 'Staff management module for administrative tasks.',
      link: `/dashboard/${urls.staffs}`
    },
    {
      icon: <FaUsers />,
      title: 'Students',
      description: 'Student management module for academic records.',
      link: `/dashboard/${urls.student}`
    },
    {
      icon: <FaClipboard />,
      title: 'Scores',
      description: 'Enter and manage student scores and grades.',
      link: `/dashboard/${urls.scores}`
    },
    {
      icon: <FaPollH />,
      title: 'Results',
      description: 'View and analyze overall academic results.',
      link: `/dashboard/${urls.results}`
    },
    {
      icon: <FaUser />,
      title: 'Users',
      description: 'User management for administrators and staff.',
      link: `/dashboard/${urls.settings}`
    },
  ]

  return (
    <div className='bg-gray-100 min-h-screen py-8 rounded shadow-xl border'>
      <h1 className='text-3xl font-semibold mb-8 border-b border-gray-200 pb-4 px-4'>Admin Dashboard</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8'>
        {modules.map((module, index) => (
          <Link key={index} to={module.link} className='p-6 bg-white rounded-lg shadow-md hover:border hover:border-blue-400 transform duration-500'>
            <div className='text-4xl text-blue-500 mb-2'>{module.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{module.title}</h3>
            <p className='text-gray-600'>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminOverview