import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { resultSchema } from '../../assets/schema/schema'
import { LEVELS } from '../../configs/level'

const EditResultForm = ({ result, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
      id: result?.id, 
      matricNo: result?.student?.matricNo, 
      ca: result?.ca, 
      exams: result?.exams,
      grade: result?.grade,
      points: result?.points,
      remark: result?.remark,
      result: parseInt(result?.ca) + parseInt(result?.exams),
      session: result?.session,
      level: result?.level,
      semester: result?.semester,
      code: result?.course?.code,
      unit: result?.course?.unit,
  }, resolver: yupResolver(resultSchema), mode: 'onBlur'})

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
                <h2 className='text-xl font-bold text-center pb-2 '>Update Result's Records</h2>
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
                  <label htmlFor='matricNo' className='block font-bold mb-2 text-sm'>
                      Matric No.
                  </label>
                  <input type='text' name='matricNo' id='matricNo' className={styles.input} required
                      {...register('matricNo')} placeholder='Enter matricNo'
                      aria-invalid={errors.matricNo ? 'true' : 'false'} disabled />
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
                        <option value={`1st Semester`}>1st Semester</option>
                        <option value={`2nd Semester`}>2nd Semester</option>
                      </select>
                    {errors.semester && <p className='text-red-400 text-sm'> {errors.semester.message}</p>}
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
                { ...register('level') } disabled>{levels}</select>{errors.level && <p className='text-red-400 text-sm'>{errors.level.message}</p>}
              </div>
              <div className='mb-2 flex flex-row justify-between'>
                <div className='mr-4 w-1/2'>
                    <label htmlFor='code' className='block font-bold mb-2 text-sm'>
                        Course
                    </label>
                    <input type='text' name='code' id='code' className={styles.input} required
                        {...register('code')} placeholder='Enter course code'
                        aria-invalid={errors.code ? 'true' : 'false'} disabled />
                    {errors.code && <p className='text-red-400 text-sm'>{errors.code.message}</p>}
                </div>
                <div className='mr-0 w-1/2'>
                    <label htmlFor='unit' className='block font-bold mb-2 text-sm'>
                      Course Unit
                    </label>
                    <input type='number' name='unit' id='unit' className={styles.input} required
                        {...register('unit')} placeholder='Enter Unit'
                        aria-invalid={errors.unit ? 'true' : 'false'} disabled  />
                    {errors.unit && <p className='text-red-400 text-sm'>{errors.unit.message}</p>}
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
                  <div className='mr-4 w-1/2'>
                      <label htmlFor='exams' className='block font-bold mb-2 text-sm'>
                        Exams
                      </label>
                      <input type='text' name='exams' id='exams' className={styles.input} required
                          {...register('exams')} aria-invalid={errors.exams ? 'true' : 'false'} />
                      {errors.exams && <p className='text-red-400 text-sm'>{errors.exams.message}</p>}
                  </div>
              </div>
              <div className='mb-2 flex flex-row justify-between items-center'>
                  <div className='mr-4 w-1/2'>
                      <label htmlFor='result' className='block font-bold mb-2 text-sm'>
                        Result
                      </label>
                      <input type='text' name='result' id='result' className={styles.input} required
                          {...register('result')} aria-invalid={errors.result ? 'true' : 'false'} disabled />
                      {errors.result && <p className='text-red-400 text-sm'>{errors.result.message}</p>}
                  </div>
                  <div className='mr-4 w-1/2'>
                      <label htmlFor='grade' className='block font-bold mb-2 text-sm'>
                        Grade
                      </label>
                      <input type='text' name='grade' id='grade' className={styles.input} required
                          {...register('grade')} aria-invalid={errors.grade ? 'true' : 'false'} disabled />
                      {errors.grade && <p className='text-red-400 text-sm'>{errors.grade.message}</p>}
                  </div>
              </div>
              <div className='mb-2 flex flex-row justify-between items-center'>
                  <div className='mr-4 w-1/2'>
                      <label htmlFor='points' className='block font-bold mb-2 text-sm'>
                        Points
                      </label>
                      <input type='text' name='points' id='points' className={styles.input} required
                          {...register('points')} aria-invalid={errors.points ? 'true' : 'false'} disabled />
                      {errors.points && <p className='text-red-400 text-sm'>{errors.points.message}</p>}
                  </div>
                  <div className='w-1/2'>
                      <label htmlFor='remark' className='block font-bold mb-2 text-sm'>
                        Remark
                      </label>
                      <input type='text' name='remark' id='remark' className={styles.input} required
                          {...register('remark')} aria-invalid={errors.remark ? 'true' : 'false'} disabled />
                      {errors.remark && <p className='text-red-400 text-sm'>{errors.remark.message}</p>}
                  </div>
              </div>
            </form>
        </div>
    </div>)

  return content
}

export default EditResultForm