import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { userSchema } from '../../assets/schema/schema'
import { ROLES } from '../../configs/roles'

const EditUserForm = ({ user, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
    username: user?.username,
    roles: user?.roles,
    active: user?.active,
  }, resolver: yupResolver(userSchema), mode: 'onBlur'})

    
  const options = Object.values(ROLES).map(role =>{
        return (
            <option key={role} value={role}>{role}</option>
        )
    })
  
    const content = (
        <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
            <div className='w-full px-6 py-6 bg-white dark:text-gray-800
                border rounded-lg shadow-lg'>
                <form onSubmit={handleSubmit(onSave)}>
                  <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>Update User's Record</h2>
                    <div className='flex justify-end py-2 mb-2'>
                      <button
                          type='submit'
                          className='mr-4 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                          title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                      <button
                        type='button'
                        className='px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-400 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed flex items-center text-white'
                        title='Delete'
                        onClick={onDelete}><span className='mr-2'><HiTrash size={20} /></span> Delete</button>
                      <button
                        type='button'
                        className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-red-400 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                        title='Cancel'
                        onClick={onCancel}><span><X size={20} /></span> Cancel</button>
                    </div>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='username' className='block font-bold mb-2 text-sm'>
                            Username
                        </label>
                        <input 
                            type='text' 
                            name='username' 
                            id='username' 
                            className={styles.input} 
                            required
                            disabled
                            {...register('username')} 
                            placeholder='Enter username'
                            aria-invalid={errors.username ? 'true' : 'false'} />
                        {errors.username && <p style={{color: 'red', fontSize: '10pt'}}>{errors.username.message}</p>}
                    </div>
                    <div className='mb-2'>
                        <label className='flex items-center font-bold text-md' htmlFor='active'>Active:
                            <input
                                className={`w-4 h-4 border border-gray-300 rounded dark:bg-white focus:rign-3 focus:ring-primary-300 ml-4`}
                                id='active'
                                name='active'
                                type='checkbox'
                                /* checked={active} */
                                {...register('active')}  />
                        </label>
                    </div>
                    <div className=''>
                        <label className='block mb-2 font-bold text-md' htmlFor='roles'>Assigned Roles:</label>
                        <select 
                            id='roles'
                            name='roles'
                            className={`${styles.input}`}
                            multiple={true}
                            size={3}
                            /* value={roles} */
                            {...register('roles')}>{options}</select>
                    </div>
                </form>
            </div>
        </div>)

  return content
}

export default EditUserForm