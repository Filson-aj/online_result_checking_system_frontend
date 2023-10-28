import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { selectCurrentToken } from '../store/slice/authSlice'
import { useGetStudentsQuery } from '../store/apis/studentApiSlice'
import { useGetStaffsQuery } from '../store/apis/staffApiSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken),
        { data: students } = useGetStudentsQuery('getStudents'),
        { data: staffs } = useGetStaffsQuery('getStudents'),
        user = {
            id: '',
            userId: '',
            username: '',
            status: 'Student',
            roles: [],
        }
    let isLecturer = false,
        isAdmin = false,
        auth = false

    if(token){
        auth = true
        const decoded = jwtDecode(token),
            { id, username, roles } = decoded.user
            
        isLecturer = roles.includes('Lecturer')
        isAdmin = roles.includes('Admin')
        user.id = id
        user.username = username
        user.roles = roles

        if(isLecturer) user.status = 'Lecturer'
        if(isAdmin) user.status = 'Admin'

        if(user.status === 'Admin' || user.status === 'Lecturer'){
            const staffId = staffs?.ids?.filter(staffId => staffs?.entities[staffId]?.user?._id === id)
            const staff = staffs?.entities[staffId]
            user.userId = staff?._id
        }else{
            const studentId = students?.ids?.filter(studentId => students?.entities[studentId]?.user?._id === id)
            const student = students?.entities[studentId]
            user.userId = student?._id
        }
        return { auth, user, isLecturer, isAdmin }
    }

    return { auth, user, isLecturer, isAdmin }
}

export default useAuth