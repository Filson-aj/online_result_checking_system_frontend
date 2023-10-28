import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { LEVELS } from '../../configs/level'
import { useGetScoresQuery } from '../../store/apis/scoresApiSlice'
import { useGetStudentsQuery } from '../../store/apis/studentApiSlice'
import useAuth from '../../hooks/useAuth'
import Score from './Score'
import Pagination from '../../components/uis/Pagination/Pagination'

const Scores = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [params, setParams] = useState(''),
        [level, setLevel] = useState(''),
        [semester, setSemester] = useState(''),
        { user } = useAuth(),
        status = user?.status

    const { 
        data: scores,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetScoresQuery('scores', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    const { data: students } = useGetStudentsQuery('studentList')

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }
    
    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = scores
        let filteredIds = []
        if(level && semester){
            filteredIds = ids.filter(id => scores?.entities[id]?.level === level && scores?.entities[id]?.semester === semester)
            if(status === 'Student'){
                const student = students?.entities[user.userId]
                filteredIds = filteredIds.filter(id => scores?.entities[id]?.student?.matricNo === student?.matricNo)
                if(params){
                    filteredIds = filteredIds.filter(id => scores?.entities[id]?.student?.matricNo === student?.matricNo && (scores?.entities[id]?.level.toLowerCase().includes(params) || scores?.entities[id]?.semester.toLowerCase().includes(params) || scores?.entities[id]?.course?.code.toLowerCase().includes(params) || scores?.entities[id]?.course?.title.toLowerCase().includes(params)))
                }
            }else{
                if(params){
                    filteredIds = filteredIds.filter(id => scores?.entities[id]?.level.toLowerCase().includes(params) || scores?.entities[id]?.semester.toLowerCase().includes(params) || scores?.entities[id]?.course?.code.toLowerCase().includes(params) || scores?.entities[id]?.course?.title.toLowerCase().includes(params))
                }
            }  
        }
        

        if(filteredIds?.length > 0){
            const PAGE_SIZE = 8, // Number of rows per page
            totalPages = Math.ceil(filteredIds?.length / PAGE_SIZE),
            startIndex = (currentPage - 1) * PAGE_SIZE,
            endIndex = currentPage * PAGE_SIZE,
            currentIds = filteredIds.slice(startIndex, endIndex)

            content = (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 px-4'>
                        {currentIds?.length > 0 && currentIds.map(scoreId => <Score key={scoreId} scoreId={scoreId} />)}
                    </div>
                    <div className='py-4 pr-4'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
                    </div>
                </>
            ) 
        }else{
            content = <div className='w-full bg-white text-gray-900 p-4'>No record found</div>
        }
    }

  return (
    <div className='container mx-auto bg-white text-gray-800 rounded-lg border shadow-lg w-full'>
        <div className='border-b border-gray-200 pb-2 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-700 hover:text-gray-400 p-2 w-[70%]'>
               {'Scores of the Departments of Computer Science '} </h2>
            <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by course title, code, class, semeter...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>
            {(status === 'Admin' || status === 'Lecturer') && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/scores/new`} title='Book a score'>
                <span><HiOutlinePlusSm /></span>
            </Link>}
        </div>
        <div className='w-full flex items-center border-b border-gray-200 pb-2'>
            <div className='w-1/2 flex items-center my-4'>
                <label htmlFor='level' className='block text-gray-700 text-sm font-bold ml-2'>
                    Class
                </label>
                <select
                    id='level'
                    name='level'
                    className='w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mx-4'
                    placeholder='Enter level (e.g., 100)'
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    >
                    <option value=''>--- Selec ---</option>
                    {levels}
                </select>
            </div>
            <div className='w-1/2 flex items-center'>
                <label htmlFor='semester' className='block text-gray-700 text-sm font-bold'>
                    Semester
                </label>
                <select
                    id='semester'
                    name='semester'
                    className='w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mx-4'
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    >
                    <option value=''>--- Selec ---</option>
                    <option value={`1st Semester`}>1st Semester</option>
                    <option value={`2nd Semester`}>2nd Semester</option>
                </select>
            </div>
        </div>
        <main>
            {content}
        </main>
    </div>
  )
}

export default Scores