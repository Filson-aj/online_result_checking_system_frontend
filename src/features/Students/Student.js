import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetStudentsQuery } from '../../store/apis/studentApiSlice'

const Student = ({ studentId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { student } = useGetStudentsQuery('studentsList', {
            selectFromResult: ({ data }) => ({
                student: data?.entities[studentId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/students/${studentId}`)

    return(
        <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{`${student?.name?.firstName} ${student?.name?.otherName} ${student?.name?.surname}`}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Matric No:</span> {student?.matricNo}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Gender: </span> {student?.gender}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Class:</span> {student?.level}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Phone:</span>
                    {student?.contact?.phone}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Address:</span>
                    {student?.contact?.address}
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

const memoizedStudent = memo(Student)

export default memoizedStudent