import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { scoreSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'
import { useAddNewScoreMutation } from '../../store/apis/scoresApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewScoreForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(scoreSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewScore, {
        isSuccess, 
    }] = useAddNewScoreMutation()

    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)

    const onSave = async(data) =>{
        const payload = {
            ca: data?.ca,
            exams: data?.exams,
            level: data?.level,
            semester: data?.semester,
            session: data?.session,
            matricNo: data?.matricNo,
            code: data?.code,
        }
        const status = true
        let title = 'New Score Record', type, text
        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewScore(payload)   
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'Score records has been added successfully!'
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
           navigate('/dashboard/scores')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/scores')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>New Score</h2>
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
                <label htmlFor='matricNo' className='block font-bold mb-2 text-sm'>
                    Matric No.
                </label>
                <input type='text' name='matricNo' id='matricNo' className={styles.input} required
                    {...register('matricNo')} placeholder='Enter matricNo'
                    aria-invalid={errors.matricNo ? 'true' : 'false'} />
                {errors.matricNo && <p className='text-red-400 text-sm'>{errors.matricNo.message}</p>}
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='session' className='block font-bold mb-2 text-sm'>
                        Session
                    </label>
                    <input type='text' name='session' id='session' className={styles.input} required
                        {...register('session')} placeholder='Enter session'
                        aria-invalid={errors.session ? 'true' : 'false'} />
                    {errors.session && <p className='text-red-400 text-sm'>{errors.session.message}</p>}
                </div>
                <div className='mr-0 w-1/2'>
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
                    {errors.semester && <p className='text-red-400 text-sm'> {errors.semester.message}</p>}
                </div>
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='level' className='block font-bold mb-2 text-sm'>
                        Class
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
                <div className='mr-0 w-1/2'>
                    <label htmlFor='code' className='block font-bold mb-2 text-sm'>
                        Course
                    </label>
                    <input type='text' name='code' id='code' className={styles.input} required
                        {...register('code')} placeholder='Enter course code'
                        aria-invalid={errors.code ? 'true' : 'false'} />
                    {errors.code && <p className='text-red-400 text-sm'>{errors.code.message}</p>}
                </div>
              </div>
              <div className='mb-2 flex flex-row justify-between items-center'>
                  <div className='mr-4 w-1/2'>
                      <label htmlFor='ca' className='block font-bold mb-2 text-sm'>
                        CA
                      </label>
                      <input type='text' name='ca' id='ca' className={styles.input} required
                          {...register('ca')} aria-invalid={errors.ca ? 'true' : 'false'} />
                      {errors.ca && <p className='text-red-400 text-sm'>{errors.ca.message}</p>}
                  </div>
                  <div className='w-1/2'>
                      <label htmlFor='exams' className='block font-bold mb-2 text-sm'>
                        Exams
                      </label>
                      <input type='text' name='exams' id='exams' className={styles.input} required
                          {...register('exams')} aria-invalid={errors.exams ? 'true' : 'false'} />
                      {errors.exams && <p className='text-red-400 text-sm'>{errors.exams.message}</p>}
                  </div>
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

export default NewScoreForm