import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { courseSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'
import { useAddNewCourseMutation } from '../../store/apis/coursesApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewCourseForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(courseSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewCourse, {
        isSuccess, 
    }] = useAddNewCourseMutation()

    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)

    const onSave = async(data) =>{
        const payload = {
            code: data?.code,
            title: data?.title,
            level: data?.level,
            semester: data?.semester,
            unit: data?.unit,
            staffId: data?.staffId,
        }
        const status = true
        let title = 'New Course Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewCourse(payload)   
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'Course records has been added successfully!'
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
           navigate('/dashboard/courses')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/courses')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>New Course</h2>
                <div className='flex justify-end py-2 mb-2'>
                  <button
                      type='submit'
                      className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                      title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-yellow-400 rounded-md disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                    title='Cancel'
                    onClick={onCancel}><span className='mr-2'><X size={20} /></span> Cancel</button>
                </div>
              </div>
              <div className='mb-2'>
                  <label htmlFor='code' className='block font-bold mb-2 text-sm'>
                    Course Code
                  </label>
                  <input type='text' name='code' id='code' className={styles.input} required
                    {...register('code')} placeholder='Enter Course' aria-invalid={errors.code ? 'true' : 'false'} />
                    {errors.code && <p className='text-red-400 text-sm'>{errors.code.message}</p>}
              </div>
              <div className='mb-2'>
                <label htmlFor='title' className='block font-bold mb-2 text-sm'>
                    Course Title
                </label>
                <input type='text' name='title' id='title' className={styles.input} required
                    {...register('title')} placeholder='Enter course title'
                    aria-invalid={errors.title ? 'true' : 'false'} />
                {errors.title && <p className='text-red-400 text-sm'>{errors.title.message}</p>}
              </div>
              <div className='mb-2'>
                    <label htmlFor='unit' className='block font-bold mb-2 text-sm'>
                       Course Unit
                    </label>
                    <input type='number' name='unit' id='unit' className={styles.input} required
                        {...register('unit')} placeholder='Enter Unit'
                        aria-invalid={errors.unit ? 'true' : 'false'} />
                    {errors.unit && <p className='text-red-400 text-sm'>{errors.unit.message}</p>}
                </div>
              <div className='mb-2'>
                <label htmlFor='level' className='block font-bold mb-2 text-sm'>
                    Class
                </label>
                <select
                    id='level'
                    name='level'
                    className={`${styles.input}`}
                    { ...register('level') }>{levels}</select>
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
                          <option value={`1st Semester`}>1st Semester</option>
                          <option value={`2nd Semester`}>2nd Semester</option>
                    </select>
                    {errors.semester && <p className='text-red-400 text-sm'>{errors.semester.message}</p>}
                </div>
                <div className=''>
                    <label htmlFor='assigned_to' className='block font-bold mb-2 text-sm'>
                      Assigned To
                    </label>
                    <input type='text' name='staffId' id='staffId' className={styles.input} { ...register('staffId') } placeholder='Enter staff ID' aria-invalid={errors.staffId ? 'true' : 'false'} />
                    {errors.staffId && <p className='text-red-400 text-sm'>{errors.staffId.message}</p>}
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

export default NewCourseForm