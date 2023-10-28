import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'

import useAuth from '../../hooks/useAuth'
import { useGetUsersQuery } from '../../store/apis/usersApiSlice'

const User = ({ userId }) => {
    const { user: currentUser } = useAuth(),
        status = currentUser?.status

    const { user } = useGetUsersQuery('usersList', {
            selectFromResult: ({ data }) => ({
                user: data?.entities[userId]
            }),
        }),
        navigate = useNavigate()

    let role = 'Student'
  
    const handleEdit = () => navigate(`/dashboard/users/${userId}`)

    if(user?.roles?.includes('Lecturer')) role = 'Lecturer'
    if(user?.roles?.includes('Admin')) role = 'Admin'

    return(
        <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{user?.username}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Role:</span> {role}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Created On:</span> {moment(user?.createdAt).format('ddd D MMM,  YYYY')}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Last Modified:</span> {moment(user?.updatedAt).format('ddd D MMM,  YYYY')}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Status:</span>
                    {user?.active ? <span className='text-teal-500 font-semibold'>Active</span> : <span className='text-red-400'>Invactive</span>}
                </p>
                {status === 'Admin' && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedUser = memo(User)

export default memoizedUser