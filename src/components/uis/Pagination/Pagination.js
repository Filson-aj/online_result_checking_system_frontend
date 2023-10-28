import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePreviousPage = () => {
        onPageChange(currentPage - 1)
    }

    const handleNextPage = () => {
        onPageChange(currentPage + 1)
    }

    return (
        <div className='flex justify-end mt-4'>
        <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className={`${
            currentPage <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500'
            } hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-2`} >
            <span><HiChevronLeft /></span>
        </button>
        <span className='mt-1 mr-2'>
            Page {currentPage} of {totalPages}
        </span>
        <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`${
            currentPage >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500'
            } hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg`} >
            <span><HiChevronRight /></span>
        </button>
        </div>
    )
}

export default Pagination
