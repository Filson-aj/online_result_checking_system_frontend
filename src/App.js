import { Routes, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { urls } from './assets/constants/data'
import { ROLES } from './configs/roles'
import useTitle from './hooks/useTitle'
import Layout from './components/Layout/Layout'
import Landing from './components/Landing/Landing'
import Login from './features/Auth/Login/Login'
import Signup from './features/Auth/Login/Signup'
import PersistLogin from './features/Auth/Login/PersistLogin'
import RequireAuth from './features/Auth/Login/RequireAuth'
import Prefetch from './features/Auth/Prefetch'
import DashboardLayout from './components/Dashboard/DashboardLayout/DashboardLayout'
import Dashboard from './components/Dashboard/Dashboard'
import Users from './features/Users/Users'
import EditUser from './features/Users/EditUser'
import Staffs from './features/Staff/Staffs'
import EditStaff from './features/Staff/EditStaff'
import NewStaffForm from './features/Staff/NewStaffForm'
import Students from './features/Students/Students'
import EditStudent from './features/Students/EditStudent'
import NewStudentForm from './features/Students/NewStudentForm'
import Courses from './features/Courses/Courses'
import EditCourse from './features/Courses/EditCourse'
import NewCourseForm from './features/Courses/NewCourseForm'
import Scores from './features/Scores/Scores'
import EditScore from './features/Scores/EditScore'
import NewScoreForm from './features/Scores/NewScoreForm'
import Results from './features/Results/Results'
import NewResultForm from './features/Results/NewResultForm'

const App = () => {
  useTitle('The Department of Computer Science NACEST Makurdi')
  return (
    <Routes>
      <Route path={urls.root} element={<Layout />}>{/* root route */}
        {/* public routes */}
        <Route index element={<Landing />} />
        <Route path={`/${urls.signin}`} element={<Login />} />
        <Route path={`/register/admin`} element={<Signup />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              {/* dashboard routes */}
              <Route path='dashboard' element={<DashboardLayout />}>
                <Route index element={<Dashboard />} /> {/* dashboard landing */}

                {/* Users routing */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path='users'>
                    <Route index element={<Users />} />
                    <Route path=':id' element={<EditUser />} />
                  </Route>
                </Route>

                {/* Staffs routing */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path='staffs'>
                    <Route index element={<Staffs />} />
                    <Route path=':id' element={<EditStaff />} />
                    <Route path='new' element={<NewStaffForm />} />
                  </Route>
                </Route>

                {/* Students routing */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path='students'>
                    <Route index element={<Students />} />
                    <Route path=':id' element={<EditStudent />} />
                    <Route path='new' element={<NewStudentForm />} />
                  </Route>
                </Route>

                {/* Courses routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='courses'>
                    <Route index element={<Courses />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=':id' element={<EditCourse />} />
                      <Route path='new' element={<NewCourseForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Scores routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                  <Route path='scores'>
                    <Route index element={<Scores />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Lecturer]} />}>
                      <Route path=':id' element={<EditScore />} />
                      <Route path='new' element={<NewScoreForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Results routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                  <Route path='results'>
                    <Route index element={<Results />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=':id' element={<EditScore />} />
                      <Route path='new' element={<NewResultForm />} />
                    </Route>
                  </Route>
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App