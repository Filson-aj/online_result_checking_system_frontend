import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { styles } from '../../../assets/constants/data'
import { signinSchema } from '../../../assets/schema/schema'
import { setCredentials } from '../../../store/slice/authSlice'
import { useLoginMutation } from '../../../store/apis/authApiSlice'
import { setMessage, resetMessage, selectCurrentMessage } from '../../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../../store/slice/spinnerSlice'
import usePersist from '../../../hooks/usePersist'
import MessageBox from '../../../components/uis/MessageBox/MessageBox'
import Spinner from '../../../components/uis/Spinner/Spinner'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(signinSchema), mode: 'onBlur'})

    const [ login ] = useLoginMutation(),
        [persist, setPersist] = usePersist(),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const onSignin = async(data) =>{
        const status = true
        let title = 'User Authentication', type, text
        dispatch(setSpinner({ visibility: true }))

        try {
            type = 'Success'
            text = 'Authentication succeeded!'
            const { accessToken } = await login(data).unwrap()
            dispatch(setSpinner({ visibility: false }))
            dispatch(setCredentials({ accessToken }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            if(!err.status){
                text = 'No Server Response'
            }else if(err.status === 400){
                text = 'Invalid username or password'
            }else if(err.status === 401){
                text = 'Invalid username or password'
            }else{
                text = err.data?.message || 'Something weng wrong'
            }
            dispatch(setMessage({ status, type, text, title }))
        }
    }
    
    const onDismiss = () =>{
        dispatch(resetMessage())
        if(message.type === 'Success'){
            navigate('/dashboard')
        }
    }
    return (
        <div className='bg-gradient-to-r from-pink-500 via-red-400 to-pink-600 min-h-screen flex justify-center items-center'>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            <div className='container mx-auto flex justify-center items-center'>
                <div className='w-1/3 p-8 text-gray-800 bg-white border shadow rounded-lg mx-4'>
                    <h2 className='text-4xl font-bold mb-4 text-center border-b border-gray-200 pb-2'>Welcome Back!</h2>
                    <p className='text-xl mb-2 font-semibold'>Please login to access your results.</p>
                    <p className='text-lg text-justify'>
                        Staff members, please use your Staff ID for username. Students, please use your Matriculation Number for username.
                    </p>
                </div>

                <div className='w-1/3 bg-white p-8 rounded-lg shadow-lg text-gray-800'>
                    <h2 className='text-xl font-bold text-center mb-8 border-b border-gray-200 pb-2'>User Authenticaton</h2>
                    <form onSubmit={handleSubmit(onSignin)}>
                    <div className='mb-6'>
                        <label htmlFor='username' className='block font-bold mb-2'>
                            Username
                        </label>
                        <input type='text' name='username' id='username' className={styles.input} required
                            {...register('username')} placeholder='Enter username'
                            aria-invalid={errors.username ? 'true' : 'false'} />
                        {errors.username && <p style={{color: 'red', fontSize: '10pt'}}>{errors.username.message}</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='password' className='block font-bold mb-2'>
                            Password
                        </label>
                        <input type='password' name='password' id='password' className={styles.input} required
                            {...register('password')} placeholder='••••••••'
                            aria-invalid={errors.password ? 'true' : 'false'} />
                        {errors.password && <p style={{color: 'red', fontSize: '10pt'}}>{errors.password.message}</p>}
                    </div>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-start mr-2'>
                            <div className='flex items-center h-5'>
                            <input id='remember' name='remember' aria-describedby='remember' type='checkbox'
                                checked={persist} 
                                onChange={() => setPersist(prev => !prev)}
                                className='w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3
                                    focus:ring-primary-300' />
                            </div>
                            <div className='ml-3 text-sm'>
                                <label htmlFor='remember' className='text-gray-500 text-gray-800'>
                                    Remember me</label>
                            </div>
                        </div>
                        <NavLink to='/forget-password' className='text-sm font-medium text-primary-600 
                            hover:underline text-primary-500'>Forgot password?</NavLink>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 
                        px-4 rounded-lg shadow'>
                        Login
                    </button>
                    </form>
                    <p className='mt-4 text-center text-gray-500 text-gray-700'>
                        Don't have an account?{' '} Please contact the department
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login