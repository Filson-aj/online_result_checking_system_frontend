import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { LEVELS } from '../../configs/level'
import { useGetResultsQuery, useDeleteResultMutation } from '../../store/apis/resultsApiSlice'
//import { useGetStudentsQuery } from '../../store/apis/studentApiSlice'
import useAuth from '../../hooks/useAuth'
import { selectCurrentMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import Result from './Result'
import StudentResult from './StudentResult'
import Pagination from '../../components/uis/Pagination/Pagination'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import ConfirmMessageBox from '../../components/uis/ConfirmMessageBox/ConfirmMessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const Results = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [params, setParams] = useState(''),
        [level, setLevel] = useState(''),
        [semester, setSemester] = useState(''),
        [session, setSession] = useState(''),
        [record, setRecord] = useState(''),
        { user } = useAuth(),
        status = user?.status,
        dispatch = useDispatch(),
        navigate = useNavigate(),
        [deleteRecord, setDeleteRecord] = useState(false),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const { 
        data: results,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetResultsQuery('results', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    //const { data: students } = useGetStudentsQuery('studentList')
    const [deleteResult, {
        isSuccess: isDelSuccess,
      }] = useDeleteResultMutation()

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }

    
    const handleDelete = async(id) =>{
        setDeleteRecord(false)
        dispatch(setSpinner({ visibility: true }))
    
        try {
          await deleteResult({ id: id })
  
          setTimeout(() => {
            dispatch(setSpinner({ visibility: false }))
          }, 500)
          navigate('/dashboard/results')
        } catch (err) {
          dispatch(setSpinner(false))
          let text
          if(!err.status){
              text = 'No Server Response'
          }else if(err.status === 400){
              text = 'Score Not Found'
          }else{
              text = err.data?.message || 'Something weng wrong'
          }
          console.log(text)
        }
      }
  
      const handleOndelete = id =>{
        setDeleteRecord(true)
        setRecord(id)
      }
      const handleDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || isDelSuccess || message.type === 'Success'){
           navigate('/dashboard/results')
        }
      }
    
    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = results
        let filteredIds = []
        //const student = students?.entities[user.userId]
        if(level && semester && session){
            filteredIds = ids.filter(id => results?.entities[id]?.level === level && results?.entities[id]?.semester === semester && results?.entities[id]?.session === session)
            if(status === 'Student'){
                filteredIds = filteredIds.filter(id => results?.entities[id]?.student?._id === user.userId)
                /* if(params){
                    filteredIds = filteredIds.filter(id => results?.entities[id]?.student?.matricNo === student?.matricNo && (results?.entities[id]?.course?.code.toLowerCase().includes(params) || results?.entities[id]?.course?.title.toLowerCase().includes(params)))
                } */
            }else{
                if(params){
                    filteredIds = filteredIds.filter(id => results?.entities[id]?.student?.matricNo.toLowerCase().includes(params))
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
                    <div className={`grid grid-cols-1 ${status !== 'Student' && 'md:grid-cols-3 lg:grid-cols-4'} gap-4 pt-4 px-4`}>
                        {status === 'Student' ? (<StudentResult resultId={filteredIds.length === 1 && filteredIds} level={level} semester={semester} session={session} />) : (
                            currentIds?.length > 0 && currentIds.map(resultId => <Result key={resultId} resultId={resultId} onDelete={() => handleOndelete(resultId)} />)
                        )}
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
        {spinner && <Spinner />}
        {message.status && <MessageBox open message={message.text} title={message.title} close={handleDismiss} />}
        {deleteRecord && <ConfirmMessageBox open message={`Do you really want to delete record?`}
          title={`Delete Score's Record`} close={() => setDeleteRecord(false)}
          confirm={() =>handleDelete(record)} />}
        <div className='border-b border-gray-200 pb-2 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-700 hover:text-gray-400 p-2 w-[70%]'>
               {'Results of the Departments of Computer Science '} </h2>
            {status === 'Admin' && <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by matric no...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>}
            {status === 'Admin' && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/results/new`} title='Book a result'>
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
            <div className='w-1/2 flex items-center'>
                <label htmlFor='session' className='block text-gray-700 text-sm font-bold'>
                    Session
                </label>
                <input
                    type='text'
                    placeholder='Enter session'
                    id='session'
                    name='session'
                    className='w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mx-4'
                    value={session}
                    onInput={(e) => setSession(e.target.value)}
                    />
            </div>
        </div>
        <main>
            {content}
        </main>
    </div>
  )
}

export default Results