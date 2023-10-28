import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { resultSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'
import { useAddNewResultMutation } from '../../store/apis/resultsApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewResultForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(resultSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewResult, {
        isSuccess, 
    }] = useAddNewResultMutation()

    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)

    const onSave = async(data) =>{
        const payload = {
            level: data?.level,
            semester: data?.semester,
            session: data?.session,
        }
        const status = true
        let title ='Generate Student Results', type, text
        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewResult(payload)   
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'Result records has been added successfully!'
            }   
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            //console.log(err)
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || message.type === 'Success'){
           navigate('/dashboard/results')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/results')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>New Result</h2>
                <div className='flex justify-end py-2 mb-2'>
                  <button
                      type='submit'
                      className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                      title='Save'>Generate</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-yellow-400 rounded-md disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                    title='Cancel'
                    onClick={onCancel}><span className='mr-2'><X size={20} /></span> Cancel</button>
                </div>
              </div>
              <div className='mb-2'>
                <label htmlFor='level' className='block font-bold mb-2 text-sm'>
                    Levels
                </label>
                <select
                id='level'
                name='level'
                className={`${styles.input}`}
                { ...register('level') } >
                    <option value={``}>--- Select ---</option>
                    {levels}
                </select>
                {errors.level && <p className='text-red-400 text-sm'>{errors.level.message}</p>}
              </div>
              <div className='mb-2'>
                <label htmlFor='semester' className='block font-bold mb-2 text-sm'>
                    Semester
                </label>
                <select
                    id='semester'
                    name='semester'
                    className={`${styles.input}`}
                    { ...register('semester') }>
                    <option value={``}>--- Select ---</option>
                    <option value={`1st Semester`}>1st Semester</option>
                    <option value={`2nd Semester`}>2nd Semester</option>
                </select>
                {errors.semester && <p className='text-red-400 text-sm'>{errors.semester.message}</p>}
              </div>
              <div className='mb-2'>
                <label htmlFor='session' className='block font-bold mb-2 text-sm'>
                    Session
                </label>
                <input type='text' name='session' id='session' className={styles.input} required
                    {...register('session')} placeholder='Enter Session'
                    aria-invalid={errors.session ? 'true' : 'false'} />
                {errors.session && <p className='text-red-400 text-sm'>{errors.session.message}</p>}
              </div>
            </form>
        </div>
    </div>)

    return (
        <>
            {spinner && <Spinner />}
            {message.status && <MessageBox open message={message.text} title={message.title} close={onDismiss} />}
            {content}
        </>
    )
}

export default NewResultForm