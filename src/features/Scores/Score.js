import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetScoresQuery } from '../../store/apis/scoresApiSlice'

const Score = ({ scoreId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { score } = useGetScoresQuery('scoresList', {
            selectFromResult: ({ data }) => ({
                score: data?.entities[scoreId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/scores/${scoreId}`)

    return(
        <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{score?.student?.matricNo}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Code:</span> {score?.course?.code}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Unit:</span> {score?.course?.unit}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Title:</span> {score?.course.title}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>CA: </span> {score?.ca}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Exams:</span> {score?.exams}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Grade:</span>{score?.grade}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Points:</span>{score?.points}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Remark:</span>{score?.remark}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Class:</span>{score?.level}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Semester:</span>{score?.semester}</p>
                {(status === 'Admin' || status === 'Lecturer') && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedScore = memo(Score)

export default memoizedScore