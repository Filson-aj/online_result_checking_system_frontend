import { Fragment, memo } from 'react'
/* import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom' */
import { BiTrash } from 'react-icons/bi'

import useAuth from '../../hooks/useAuth'
import { useGetResultsQuery } from '../../store/apis/resultsApiSlice'

const formatNumber = (number) => {
    if (isNaN(number)) {
        const formattedNumber = Number(number).toFixed(2)
        return Number(formattedNumber)
      /* console.error('Invalid input. Please provide a valid number.')
      return null */
    }
  
    const formattedNumber = Number(number).toFixed(2)
  
    return Number(formattedNumber)
}

const Result = ({ resultId, onDelete }) => {
    const { user } = useAuth(),
        status = user?.status

    const { result } = useGetResultsQuery('resultsList', {
            selectFromResult: ({ data }) => ({
                result: data?.entities[resultId]
            }),
        })
        //navigate = useNavigate()
  
    //const handleEdit = () => navigate(`/dashboard/results/${resultId}`)

    return(
        <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{result?.student?.matricNo}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Courses:</span> {result?.courses?.map(course =>`${course.code}: ${course.grade}, `)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Su:</span> {formatNumber(result?.su)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Sp:</span> {formatNumber(result?.sp)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>CU: </span> {formatNumber(result?.cu)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Cp:</span> {formatNumber(result?.cp)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Gpa:</span>{formatNumber(result?.gpa)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Cgpa:</span>{formatNumber(result?.cgpa)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Remark:</span>{result?.remark}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Class:</span>{result?.level}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Semester:</span>{result?.semester}</p>
                {status === 'Admin' && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                   {/*  <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button> */}
                    <button onClick={onDelete} className='hover:text-sky-600'>
                        <span className=''><BiTrash size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedResult = memo(Result)

export default memoizedResult