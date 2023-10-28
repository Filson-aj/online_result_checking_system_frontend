import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { studentSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'
import { ROLES } from '../../configs/roles'
import { useAddNewStudentMutation } from '../../store/apis/studentApiSlice'
import { useAddNewUserMutation } from '../../store/apis/usersApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewStudentForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(studentSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewStudent, {
        isSuccess, 
    }] = useAddNewStudentMutation()

    const [addNewUser, {
        isSuccess: signupSuccess
    }] = useAddNewUserMutation()

    const rolesOptions = Object.values(ROLES).map(role => <option key={role} value={role}>{role}</option>)

    const levels = Object.values(LEVELS).map(level => <option  key={level} value={level}>{level}</option>)

    const onSave = async(data) =>{
        const payload = {
            matricNo: data?.matricNo,
            name: {
                firstName: data?.firstName,
                surname: data?.surname,
                otherName: data?.otherName,
            },
            gender: data?.gender,
            level: data?.level,
            contact: {
                phone: data?.phone,
                address: data?.address,
            },
        }
        const status = true
        let title = 'New Student Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const res = await addNewUser({ username: data?.matricNo, password: 'password', confirm_password: 'password', roles: data?.roles})
            const user = res?.data?.data
            payload.user = user?.id
            
            if(signupSuccess || !res.data?.error){
                const response = await addNewStudent(payload)
                
                if(response?.error){
                    type = 'Error'
                    text = response?.error?.data?.message || 'Something went wrong'
                }else{
                    type = 'Success'
                    text = response?.data?.message || 'Student records has been added successfully!'
                }
            }else{
                type = 'Error'
                text = res?.data?.message || 'An error occured while saving Student records!'
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
           navigate('/dashboard/students')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/students')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>New Student</h2>
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
                    {...register('matricNo')} placeholder='Enter Student ID' aria-invalid={errors.matricNo ? 'true' : 'false'} />
                    {errors.matricNo && <p className='text-red-400 text-sm'>{errors.matricNo.message}</p>}
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='firstName' className='block font-bold mb-2 text-sm'>
                        First Name
                    </label>
                    <input type='text' name='firstName' id='firstName' className={styles.input} required
                        {...register('firstName')} placeholder='Enter First Name'
                        aria-invalid={errors.firstName ? 'true' : 'false'} />
                    {errors.firstName && <p className='text-red-400 text-sm'>{errors.firstName.message}</p>}
                </div>
                <div className='mr-0 w-1/2'>
                    <label htmlFor='surname' className='block font-bold mb-2 text-sm'>
                        Surname
                    </label>
                    <input type='text' name='surname' id='surname' className={styles.input} required
                        {...register('surname')} placeholder='Enter Surname'
                        aria-invalid={errors.surname ? 'true' : 'false'} />
                    {errors.surname && <p className='text-red-400 text-sm'>{errors.surname.message}</p>}
                </div>
              </div>
              <div className='mb-2'>
                  <label htmlFor='otherName' className='block font-bold mb-2 text-sm'>
                      Other name
                  </label>
                  <input type='text' name='otherName' id='otherName' className={styles.input}
                      {...register('otherName')} placeholder='Enter Other Name' />
              </div>
              <div className='mb-2 flex flex-row justify-between items-center'>
                    <div className='inline-flex items-center text-sm ml-2'>
                        <label htmlFor='gender' className='block font-bold text-sm
                            mr-6'>
                            Gender
                        </label>
                        <input type='radio' name='gender' id='male' value='Male' {...register('gender')} />
                        <label className='font-semibold px-2' 
                            htmlFor='male'>Male</label>
                        <input type='radio' name='gender' id='female' value='Female'
                            {...register('gender')} />
                        <label className='font-semibold px-2' 
                            htmlFor='female'>Female</label>
                        {errors.gender && <p style={{color: 'red', fontSize: '10pt'}}>{errors.gender.message}</p>}
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
                    { ...register('level') }>
                        <option value={``}>--- Select ---</option>
                        {levels}
                    </select>
                      {errors.level && <p className='text-red-400 text-sm'>
                        {errors.level.message}</p>}
                  </div>
                  <div className='mr-0 w-1/2'>
                      <label htmlFor='phone' className='block font-bold mb-2 text-sm'>
                          Phone Number
                      </label>
                      <input type='text' name='phone' id='phone' className={styles.input} required
                          {...register('phone')} placeholder='Your Phone Number'
                          aria-invalid={errors.phone ? 'true' : 'false'} />
                      {errors.phone && <p className='text-red-400 text-sm'>{errors.phone.message}</p>}
                  </div>
              </div>
              <div className='mb-2'>
                  <label htmlFor='address' className='block font-bold mb-2 text-sm'>
                      Address
                  </label>
                  <textarea name='address' id='address' rows={4} className={styles.input} 
                    {...register('address')}
                    placeholder='Enter Contact Address' 
                    aria-invalid={errors.address ? true : false}></textarea>
                {errors.address && <p style={{color: 'red', fontSize: '10pt'}}>
                    {errors.address.message}</p>}
              </div>
              <div className=''>
                  <label className='block mb-2 font-bold text-md' htmlFor='roles'>Roles</label>
                  <select 
                      id='roles'
                      name='roles'
                      className={`${styles.input}`}
                      multiple={true}
                      size={3}
                      /* value={roles} */
                      {...register('roles')}>{rolesOptions}</select>
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

export default NewStudentForm