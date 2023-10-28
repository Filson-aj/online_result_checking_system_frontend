import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidedraw from '../../Sidedraw/Sidedraw'

import useAuth from '../../../hooks/useAuth'
import { menus } from '../../../assets/constants/data'
import { setSidedraw, selectCurrentSidedraw } from '../../../store/slice/sidedrawSlice'

const DashboardLayout = () => {
    const { user } = useAuth(),
        dispatch = useDispatch(),
        open = useSelector(selectCurrentSidedraw)
    let menu = [...menus?.student]
    if(user?.status === 'Admin'){
        menu = [...menus.admin]
    }
    if(user?.status === 'Lecturer'){
        menu = [...menus.lecturer]
    }
    return (
        <div className='flex pag-6 bg-gray-100 text-gray-800'>
            <Sidedraw menus={menu} open={open} onOpen={() => dispatch(setSidedraw({ open: !open }))} />
            <main className='m-3 text-gray-900 flex-grow'>
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout