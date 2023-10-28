
const MessageBox = props => {
    const { open, message, title, close } = props
  
    return (
        <div>
            {open && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='fixed inset-0 bg-gray-800 opacity-90'></div>
                <div className='relative bg-white w-full max-w-md rounded-lg shadow-lg z-10'>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold mb-4 border-b py-2 text-gray-800 text-center'>{title}</h2>
                        <p className='text-gray-700 mb-4'>{message}</p>
                        <div className='flex justify-center p-2'>
                            <button
                                onClick={close}
                                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 
                                    rounded-lg mr-2' >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default MessageBox
