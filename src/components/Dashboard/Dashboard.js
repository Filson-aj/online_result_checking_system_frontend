import useAuth from '../../hooks/useAuth'
import AdminOverview from './Overview/AdminOverview'
import StudentOverview from './Overview/StudentOverview'
import LecturerOverview from './Overview/LecturerOverview'

const Dashboard = () => {
  const { user } = useAuth()

  let content = <LecturerOverview />
  if(user?.status === 'Admin'){
    content =  <AdminOverview />
  }else if(user?.status === 'Student'){
    content = <StudentOverview />
  }
  return content
}

export default Dashboard