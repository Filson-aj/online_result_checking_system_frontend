import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { urls } from '../../../assets/constants/data'
import useAuth from '../../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { user } = useAuth()

    const content = (
        user?.roles?.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to={`/${urls.signin}`} state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth