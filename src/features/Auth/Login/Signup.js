import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { styles, urls } from '../../../assets/constants/data'
import { QUALIFICATIONS } from '../../../configs/qualifications'
import { staffSchema } from '../../../assets/schema/schema'
import { useRegisterUserMutation } from '../../../store/apis/usersApiSlice'
import { useAddNewStaffMutation } from '../../../store/apis/staffApiSlice'
import { setMessage, resetMessage, selectCurrentMessage } from '../../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../../store/slice/spinnerSlice'
import MessageBox from '../../../components/uis/MessageBox/MessageBox'
import Spinner from '../../../components/uis/Spinner/Spinner'

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({defaultValues: {
        roles: ['Student', 'Lecturer', 'Admin']
    }, resolver: yupResolver(staffSchema), mode: 'onBlur'})

    const [addNewStaff] = useAddNewStaffMutation()

    const [registerUser, {
        isSuccess: signupSuccess
    }] = useRegisterUserMutation()

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const qualifications = Object.values(QUALIFICATIONS).map(qualification =>{
        return (
            <option  key={qualification} value={qualification}>{qualification}</option>
        )
    })
    const onSave = async(data) =>{
        const status = true
        let title = 'User Authentication', type, text
        dispatch(setSpinner({ visibility: true }))

        try {
            const res = await registerUser({ username: data?.staffId, password: data?.password, confirm_password: data?.confirm_password, roles: data?.roles})
            if(signupSuccess || !res.data.error){
                const user = res?.data?.data
                const name = {
                    firstName: data?.firstName,
                    surname: data?.surname,
                    otherName: data?.otherName 
                }
                const contact = {
                    phone: data?.phone,
                    address: data?.address
                }
                const response = await addNewStaff({ staffId: data?.staffId, name, gender: data?.gender, qualification: data?.qualification, contact, user: user.id })

                if(response?.error){
                    type = 'Error'
                    console.log(response)
                    text = response?.error?.data?.message || 'User authentication error'
                }else{
                    type = 'Success'
                    text = 'Account has been setup successfully! Please proceed to login!!'
                }
            }else{
                type = 'Error'
                text = res?.data?.message || 'An error occured while authenticating user!'
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }
    
    const onDismiss = () =>{
        dispatch(resetMessage())
        if(message.type === 'Success'){
            navigate(`/${urls.signin}`)
        }
    }
    return (
        <div className='bg-gradient-to-r from-pink-500 via-red-400 to-pink-600 min-h-screen flex justify-center items-center'>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            <div className='container mx-auto flex justify-center items-center'>
                <div className='w-1/3 p-8 text-gray-800 bg-white border shadow rounded-lg mx-4'>
                    <h2 className='text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2'>Admin Authentication!</h2>
                    <p className='text-xl mb-2 font-semibold'>Please fill in the form to obtain your authentication credentials.</p>
                    <p className='text-lg text-justify'>
                        Please note that, your username will be the staff ID you provided.
                    </p>
                </div>

                <div className='w-1.5/3 bg-white p-8 rounded-lg shadow-lg text-gray-800 my-6'>
                    <h2 className='text-xl font-bold text-center mb-8 border-b border-gray-200 pb-2'>User Authenticaton</h2>
                    <form onSubmit={handleSubmit(onSave)}>
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
                        <div className='mb-2'>
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
                                <input type='tel' name='phone' id='phone' className={styles.input} required
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
                        <div className='mb-2 border-t border-gray-200 mt-4 pt-2'>
                            <label htmlFor='password' className='block font-bold mb-2 text-sm'>
                                Password
                            </label>
                            <input 
                                type='password' 
                                name='password' 
                                id='password' 
                                className={styles.input} 
                                required
                                {...register('password')} 
                                placeholder='••••••••'
                                aria-invalid={errors.password ? 'true' : 'false'} />
                            {errors.password && <p style={{color: 'red', fontSize: '10pt'}}>{errors.password.message}</p>}
                        </div>
                        <div className=''>
                            <label htmlFor='confirm_password' className='block font-bold mb-2 text-sm'>
                                Confirm Password
                            </label>
                            <input 
                                type='password' 
                                name='confirm_password' 
                                id='confirm_password' 
                                className={styles.input} 
                                required
                                {...register('confirm_password')} 
                                placeholder='••••••••'
                                aria-invalid={errors.confirm_password ? 'true' : 'false'} />
                            {errors.confirm_password && <p style={{color: 'red', fontSize: '10pt'}}>{errors.confirm_password.message}</p>}
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 
                            px-4 rounded-lg shadow mt-3'>
                            Signup
                        </button>
                    </form>
                    <p className='mt-4 text-center text-gray-500 text-gray-700'>
                        Already have an account?{' '}
                        <NavLink to={`/${urls.signin}`} className='text-blue-500 hover:text-blue-600 font-semibold'>
                            Log in
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup