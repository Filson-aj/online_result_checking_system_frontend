import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUsers: builder.query({
            query: () =>({ 
                url: '/users',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            /* keepUnusedDataFor: 5, */
            transformResponse: responseData =>{
                const loadedUsers = responseData?.data?.map(user =>{
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'User', id: 'List'},
                        ...result.ids.map(id =>({ type: 'User', id }))
                    ]
                }else return [{ type: 'Users', id: 'List'}]
            },
        }),
        addNewUser: builder.mutation({
            query: initialUserData =>({
                url: '/users',
                method: 'POST', 
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        registerUser: builder.mutation({
            query: initialUserData =>({
                url: '/register',
                method: 'POST', 
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData =>({
                url: '/users',
                method: 'PATCH', 
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) =>({
                url: `/users/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUsers: builder.mutation({
            query: () =>({
                url: '/users',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Users'}
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

//returns the query result object
export const selectUserResult= apiSlice.endpoints.getUsers.select()

//creates memoized selector
const selectUserData = createSelector(
    selectUserResult, 
    usersResult => usersResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    //pass in a selector that returns thhe users slice of state
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)