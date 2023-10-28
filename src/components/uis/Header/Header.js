import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { urls, images } from '../../../assets/constants/data'
import useAuth from '../../../hooks/useAuth'
import { useLogoutMutation } from '../../../store/apis/authApiSlice'
import ConfirmMessageBox from '../ConfirmMessageBox/ConfirmMessageBox'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import Navigations from '../Navigations/Navigations'

const Header = () => {
    const [onLogout, setOnLogout] = useState(false),
        [logout] = useLogoutMutation(),
        { auth, user } = useAuth(),
        navigate = useNavigate()
    
    //handle user's logout click event
    const handleConfirm = () =>{
        setOnLogout(false)
        logout()
        navigate(urls.root)
    }
  return (
    <header className='bg-gray-800 text-gray-200 shadow-lg w-full'>
        {onLogout && <ConfirmMessageBox open message={`Do you want to logout?`} title={`System Logout`} close={ () => setOnLogout(false)} confirm={handleConfirm} />}
        <div className='container mx-auto flex flex-col justify-between items-center'>
            <div className='w-full flex justify-between items-center'>
                <Link to={urls.root} className='flex items-center mr-6 justify-start w-[150px]'>
                    <img src={images.logo} alt='NACEST Logo' className='w-24 h-24 rounded-full shadow py-2 px-2' />
                </Link>
                <div className='flex flex-col justify-center items-center flex-grow pt-4'>
                    <h1 className='font-bold text-xl uppercase text-center text-teal-400'>The Department of Computer Science, NACEST. Makurdi</h1>
                    <p className='font-semibold text-red-500 text-xl mb-8 italic'>
                        Dicipline, Knowledge & Strength
                    </p>
                </div>
            </div>
            <nav className='w-full space-x-4 flex justify-between items-center pb-4'>
                <div className='flex justify-start items-center flex-grow'>
                    <Navigations />
                </div>
                {!auth && (<div className='flex px-4 py-2 justify-end w-1/4'>
                    <Link className='bg-blue-400 px-6 py-2 rounded-full shadow-xl hover:bg-blue-600 text-gray-900 font-bold transform duration-500' to={`/${urls.signin}`}>Log in</Link>
                </div>)}
                {auth && <div className='flex px-4 py-2 justify-end w-1/4'>
                    <DropdownMenu user={user} logout={() => setOnLogout(true)} />
                </div>}
            </nav>
        </div>
    </header>
  )
}

export default Header