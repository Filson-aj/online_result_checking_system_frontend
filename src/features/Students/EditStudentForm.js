import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { studentSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'

const EditStudentForm = ({ student, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
    id: student?.id,
    matricNo: student?.matricNo,
    firstName: student?.name?.firstName,
    surname: student?.name?.surname,
    otherName: student?.name?.otherName,
    gender: student?.gender,
    level: student?.level,
    phone: student?.contact?.phone,
    address: student?.contact?.address
  }, resolver: yupResolver(studentSchema), mode: 'onBlur'})

  const options = Object.values(LEVELS).map(level =>{
      return (
          <option key={level} value={level}>{level}</option>
      )
  })
  
  const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>Update Student's Records</h2>
                <div className='flex justify-end py-2 mb-2'>
                  <button
                      type='submit'
                      className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                      title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-400 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed flex items-center text-white'
                    title='Delete'
                    onClick={onDelete}><span className='mr-2'><HiTrash size={20} /></span> Delete</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-yellow-400 rounded-md disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                    title='Cancel'
                    onClick={onCancel}><span className='mr-2'><X size={20} /></span> Cancel</button>
                </div>
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='firstName' className='block font-bold mb-2 text-sm'>
                        First name
                    </label>
                    <input type='text' name='firstName' id='firstName' className={styles.input} required
                        {...register('firstName')} placeholder='Enter First Name'
                        aria-invalid={errors.firstName ? 'true' : 'false'} />
                    <input type='hidden' name='id' id='id' {...register('id')} />
                    <input type='hidden' name='studentId' id='studentId' {...register('studentId')} />
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
                    {...register('otherName')} placeholder='Enter Other name' />
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
                    { ...register('level') }>{options}</select>
                      {errors.level && <p className='text-red-400 text-sm'>{errors.level.message}</p>}
                  </div>
                  <div className='mr-0 w-1/2'>
                      <label htmlFor='phone' className='block font-bold mb-2 text-sm'>
                          Phone Number
                      </label>
                      <input type='text' name='phone' id='phone' className={styles.input} required
                          {...register('phone')} placeholder='Enter Phone Number'
                          aria-invalid={errors.phone ? 'true' : 'false'} />
                      {errors.phone && <p className='text-red-400 text-sm'>{errors.phone.message}</p>}
                  </div>
              </div>
              <div className="mb-4">
                  <label htmlFor="address" className="block font-bold mb-2 text-sm">
                      Address
                  </label>
                  <textarea name='address' id='address' rows={4} className={styles.input} 
                    {...register('address')}
                    placeholder='Enter Contact Address' 
                    aria-invalid={errors.address ? true : false}></textarea>
                {errors.address && <p style={{color: 'red', fontSize: '10pt'}}>{errors.address.message}</p>}
              </div>
            </form>
        </div>
    </div>)

  return content
}

export default EditStudentForm