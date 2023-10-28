import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetCoursesQuery } from '../../store/apis/coursesApiSlice'

const Course = ({ courseId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { course } = useGetCoursesQuery('coursesList', {
            selectFromResult: ({ data }) => ({
                course: data?.entities[courseId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/courses/${courseId}`)

    return(
        <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{course?.code}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Title:</span> {course?.title}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Class: </span> {course?.level}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Semester:</span> {course?.semester}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Unit:</span>{course?.unit}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Course Lecturer:</span>{`${course?.lecturer?.name?.firstName} ${course?.lecturer?.name?.otherName} ${course?.lecturer?.name?.surname}`}</p>
                {status === 'Admin' && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedCourse = memo(Course)

export default memoizedCourse