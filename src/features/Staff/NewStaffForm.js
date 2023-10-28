import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { staffsSchema } from '../../assets/schema/schema'
import { QUALIFICATIONS } from '../../configs/qualifications'
import { ROLES } from '../../configs/roles'
import { useAddNewStaffMutation } from '../../store/apis/staffApiSlice'
import { useAddNewUserMutation } from '../../store/apis/usersApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewStaffForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(staffsSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewStaff, {
        isSuccess, 
    }] = useAddNewStaffMutation()

    const [addNewUser, {
        isSuccess: signupSuccess
    }] = useAddNewUserMutation()

    const rolesOptions = Object.values(ROLES).map(role => <option key={role} value={role}>{role}</option>)

    const qualifications = Object.values(QUALIFICATIONS).map(qualification => <option  key={qualification} value={qualification}>{qualification}</option>)

    const onSave = async(data) =>{
        const payload = {
            staffId: data?.staffId,
            name: {
                firstName: data?.firstName,
                surname: data?.surname,
                otherName: data?.otherName,
            },
            gender: data?.gender,
            qualification: data?.qualification,
            contact: {
                phone: data?.phone,
                address: data?.address,
            },
        }
        const status = true
        let title = 'New Staff Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const res = await addNewUser({ username: data?.staffId, password: 'password', confirm_password: 'password', roles: data?.roles})
            const user = res?.data?.data
            payload.user = user?.id
            
            if(signupSuccess || !res.data?.error){
                const response = await addNewStaff(payload)
                
                if(response?.error){
                    type = 'Error'
                    text = response?.error?.data?.message || 'Something went wrong'
                }else{
                    type = 'Success'
                    text = response?.data?.message || 'Staff records has been added successfully!'
                }
            }else{
                type = 'Error'
                text = res?.data?.message || 'An error occured while saving Staff records!'
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
           navigate('/dashboard/staffs')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/staffs')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>New Staff</h2>
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
                  <label htmlFor='staffId' className='block font-bold mb-2 text-sm'>
                      Staff ID
                  </label>
                  <input type='text' name='staffId' id='staffId' className={styles.input} required
                    {...register('staffId')} placeholder='Enter Staff ID' aria-invalid={errors.staffId ? 'true' : 'false'} />
                    {errors.staffId && <p className='text-red-400 text-sm'>{errors.staffId.message}</p>}
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='firstName' className='block font-bold mb-2 text-sm'>
                        First name
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
                      <label htmlFor='qualification' className='block font-bold mb-2 text-sm'>
                          Qualifications
                      </label>
                      <select
                        id='qualification'
                        name='qualification'
                        className={`${styles.input}`}
                    { ...register('qualification') }>
                        <option value={``}>--- Select ---</option>
                        {qualifications}
                    </select>
                      {errors.qualification && <p className='text-red-400 text-sm'>
                        {errors.qualification.message}</p>}
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

export default NewStaffForm