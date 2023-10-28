import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { icons } from '../../../assets/constants/data'

const DropdownMenu = ({ user, logout }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='flex items-center space-x-2 text-gray-600 focus:outline-none rounded-full 
            bg-gray-300 p-2'
          onClick={toggle} >
          <icons.user size={20} />
        </button>
      </div>

      {open && (
        <div className={`origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white 
            ring-1 ring-black ring-opacity-5 ${ open ? 'transition-opacity duration-500 opacity-100' : 
            'transition-opacity duration-500 opacity-0 pointer-events-none'} z-40`}
            style={{transitionDelay: `1000ms`}}>
          <div
            className='py-1 text-gray-700'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu' >
            <div className='flex flex-col border-b border-gray-200 mb-2 p-2 font-bold text-sm border-box'>
                <h2 className='hover:text-blue-600'>{user.username}</h2>
                <h2 className='hover:text-blue-600'>Status: {user.status}</h2>
            </div>
            <Link to='/profile'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg
                hover:opacity-75 hover:mx-2 hover:text-gray-800 hover:font-bold'
              role='menuitem'>
              Profile
            </Link>
            <Link to='/settings'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg
                hover:opacity-75 hover:mx-2 hover:text-gray-800 hover:font-bold'
              role='menuitem'>
              Settings
            </Link>
            <button type='button' onClick={logout}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg
                hover:opacity-75 hover:mx-2 text-left hover:text-gray-800 hover:font-bold w-3/4'
              role='menuitem'>
              Signout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu