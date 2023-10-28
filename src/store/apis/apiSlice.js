import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PORT } from '../../assets/constants/data'
import { setCredentials } from '../slice/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState}) =>{
        const token = getState().auth.token

        token && headers.set('authorization', `Bearer ${token}`)

        return headers
    }
})

const baseQueryWithReauth = async(args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403){
        //end refresh token to get new access token
        const refreshedResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshedResult?.data){
            //store new access token
            api.dispatch(setCredentials({ ...refreshedResult.data }))

            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }else{
            if (refreshedResult?.error?.status === 403) refreshedResult.error.data.message = 'Your login session has expired'

            return refreshedResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users', 'Courses', 'Scores', 'Results', 'Staffs', 'Students'],
    endpoints: builder => ({})
})