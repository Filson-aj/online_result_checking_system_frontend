import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'   

import { useRefreshMutation } from '../../../store/apis/authApiSlice'
import usePersist from '../../../hooks/usePersist'
import { selectCurrentToken } from '../../../store/slice/authSlice'
import { urls } from '../../../assets/constants/data'

const PersistLogin = () =>{
    const [persist] = usePersist(),
        token = useSelector(selectCurrentToken),
        location = useLocation(),
        effectRan = useRef(false),
        [isSuccessful, setIsSuccessful] = useState(false),
        [refresh, {
            isUninitialized,
            isSuccess,
            isError,
        }] = useRefreshMutation()

    useEffect(() =>{
        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){//take care of React 18 strict mode
            const verifyRefreshToken = async() =>{
                try {
                    await refresh()
                    setIsSuccessful(true)
                } catch (err) {
                    console.log(err)
                }
            }

            if(!token && persist) verifyRefreshToken()
        }
        
        return () => effectRan.current = true

        //eslint-disable-next-line
    }, [])

    let content
    if(!persist){//login state should not be persist
        content = <Outlet />
    }else if(isError){//state should be persist, but an error occured
        content = <Navigate to={urls.signin} state={{ from: location }} replace />
    }else if(isSuccess && isSuccessful){//state should be persisted and token is available
        content = <Outlet />
    }else if(token && isUninitialized){//state should be persisted and token is available
        content = <Outlet />
    }

    return content
}

export default PersistLogin