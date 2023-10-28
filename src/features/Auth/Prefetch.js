import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../store/store'
import { usersApiSlice } from '../../store/apis/usersApiSlice'
import { staffsApiSlice } from '../../store/apis/staffApiSlice'
import { studentsApiSlice } from '../../store/apis/studentApiSlice'
import { coursesApiSlice } from '../../store/apis/coursesApiSlice'
import { scoresApiSlice } from '../../store/apis/scoresApiSlice'

const Prefetch = () => {
    useEffect(() =>{
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(staffsApiSlice.util.prefetch('getStaffs', 'staffsList', { force: true }))
        store.dispatch(studentsApiSlice.util.prefetch('getStudents', 'studentsList', { force: true }))
        store.dispatch(coursesApiSlice.util.prefetch('getCourses', 'coursesList', { force: true }))
        store.dispatch(scoresApiSlice.util.prefetch('getScores', 'scoresList', { force: true }))
    }, [])
    return <Outlet />
}

export default Prefetch