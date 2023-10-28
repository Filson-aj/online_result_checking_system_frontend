import { Fragment, memo, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'

import { useGetResultsQuery } from '../../store/apis/resultsApiSlice'
import ResultSlip from './ResultSlip'

const formatter = (number) => {
    if (isNaN(number)) {
        const formattedNumber = Number(number).toFixed(2)
        return Number(formattedNumber)
      /* console.error('Invalid input. Please provide a valid number.')
      return null */
    }
  
    const formattedNumber = Number(number).toFixed(2)
  
    return Number(formattedNumber)
}

const StudentResult = ({ resultId, level, semester, session }) => {
    const [isPrint, setIsPrint] = useState(false),
        [myResult, setResult] = useState([])

    const { result } = useGetResultsQuery('resultsList', {
            selectFromResult: ({ data }) => ({
                result: data?.entities[resultId]
            }),
        })

    const handlePrint = (result) => {
       setIsPrint(true)
       setResult(result)
    }
    let content
    if(isPrint){
        content = (
            <div className='w-full h-full'>
                <PDFViewer width='100%' height='600px'>
                    <ResultSlip result={myResult} level={level} semester={semester} session={session} />
                </PDFViewer>
            </div>
        )
    }else{
        content = (
            <Fragment>
            <div className='bg-white shadow-lg border rounded hover:border-blue-500 transition duration-500' id='pdf-content'>
                <div className='text-gray-800 bg-white border-b border-gray-200 p-2'>
                    <p className='text-center uppercase font-bold text-lg'>
                        nigerian army college of environmental science & technology, makurdi.<br/>
                        the department of computer science<br/>
                        student's result slip
                    </p>
                    <p>
                        <span className='italic font-bold mx-4'>Matric Number:</span> {result?.student?.matricNo}
                        <span className='italic font-bold ml-4'>Name:</span> {`${result?.student?.name?.firstName} ${result?.student?.name?.otherName} ${result?.student?.name?.surname}`}
                        <span className='italic font-bold ml-4'>Level:</span> {level}
                        <span className='italic font-bold ml-4'>Semester:</span> {semester}
                        <span className='italic font-bold ml-4'>Session:</span> {session}
                    </p>
                </div>
                <div className='flex justify-between border-b border-gray-200 font-bold p-2'>
                    <p className='text-left w-1/3'>S/N</p>
                    <p className='text-left w-1/3'>Code</p>
                    <p className='text-left w-2/3'>Title</p>
                    <p className='text-left w-1/3'>Unit</p>
                    <p className='text-left w-1/3'>Grade</p>
                </div>
                <div>
                    {result?.courses?.map((course, index) =>(
                        <div key={course?.code} className='flex justify-between border-b border-gray-200 p-2'>
                            <p className='w-1/3 text-left'>{++index}</p>
                            <p className='w-1/3 text-left'>{course?.code}</p>
                            <p className='w-2/3 text-left'>{course?.title}</p>
                            <p className='w-1/3 text-left'>{course?.unit}</p>
                            <p className='w-1/3 text-left'>{course?.grade}</p>
                        </div>   
                    ))}
                </div>
                <div className='flex items-center justify-between font-bold p-2 border-b border-gray-200'>
                    <p><span className='italic uppercase mr-2'>Su:</span> {formatter(result?.su)}</p>
                    <p><span className='italic uppercase mr-2'>Sp:</span> {formatter(result?.sp)}</p>
                    <p><span className='italic uppercase mr-2'>Cu:</span> {formatter(result?.cu)}</p>
                    <p><span className='italic uppercase mr-2'>Cp:</span> {formatter(result?.cp)}</p>
                    <p><span className='italic uppercase mr-2'>Gpa:</span> {formatter(result?.gpa)}</p>
                    <p><span className='italic uppercase mr-2'>Cgpa:</span> {formatter(result?.cgpa)}</p>
                </div>
                <div className='font-bold p-2 flex justify-end items-center border-b border-gray-200'>
                    <span className='italic mr-4'>Remark:</span> {result?.remark}
                </div>
                <div className='flex items-center justify-start p-2'>
                    <button className='px-5 py-2 text-white rounded-lg shadow bg-blue-400 hover:bg-blue-500 hover:text-lg transform duration-500' onClick={() => handlePrint(result)}>Print</button>
                </div>
            </div>
            </Fragment>
        )
    }

    return content
}

const memoizedResult = memo(StudentResult)

export default memoizedResult