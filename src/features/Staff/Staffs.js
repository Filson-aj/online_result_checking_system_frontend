import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { useGetStaffsQuery } from '../../store/apis/staffApiSlice'
import useAuth from '../../hooks/useAuth'
import Staff from './Staff'
import Pagination from '../../components/uis/Pagination/Pagination'

const Staffs = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [params, setParams] = useState(''),
        { user } = useAuth(),
        status = user?.status

    const { 
        data: staffs,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetStaffsQuery('staffs', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }
    
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = staffs
        let filteredIds = ids
        if(params){
            filteredIds = ids.filter(id => staffs.entities[id]?.staffId.toLowerCase().includes(params) || staffs.entities[id]?.name?.firstName.toLowerCase().includes(params) || staffs.entities[id]?.name?.surname.toLowerCase().includes(params) || staffs.entities[id]?.name?.otherName.toLowerCase().includes(params) || staffs.entities[id]?.gender.toLowerCase().includes(params) || staffs.entities[id]?.contact?.phone.toLowerCase().includes(params))
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
                        {currentIds?.length > 0 && currentIds.map(staffId => <Staff key={staffId} staffId={staffId} />)}
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
               {'Staff of The Department of Computer Science'} </h2>
            <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by name, gender, phone, ID...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>
            {status === 'Admin' && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/staffs/new`} title='Book a staff'>
                <span><HiOutlinePlusSm /></span>
            </Link>}
        </div>
        <main>
            {content}
        </main>
    </div>
  )
}

export default Staffs