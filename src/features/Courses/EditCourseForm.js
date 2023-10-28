import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { courseSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'

const EditCourseForm = ({ course, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
    id: course?.id,
    code: course?.code,
    title: course?.title,
    level: course?.level,
    semester: course?.semester,
    unit: course?.unit,
    staffId: course?.lecturer?.staffId
  }, resolver: yupResolver(courseSchema), mode: 'onBlur'})

  const levels = Object.values(LEVELS).map(level =>{
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
                <h2 className='text-xl font-bold text-center pb-2 '>Update Course's Records</h2>
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

  return content
}

export default EditCourseForm