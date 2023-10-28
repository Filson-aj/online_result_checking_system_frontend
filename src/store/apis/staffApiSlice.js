import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const staffsAdapter = createEntityAdapter({})

const initialState = staffsAdapter.getInitialState()

export const staffsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getStaffs: builder.query({
            query: () =>({ 
                url: '/staffs',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            /* keepUnusedDataFor: 5, */
            transformResponse: responseData =>{
                const sortedData = responseData?.data
                sortedData?.sort((a, b) => {
                    const idA = parseInt(a._id, 16),
                        idB = parseInt(b._id, 16)
                    return idB - idA
                })

                let count = 1
                const loadedStaffs = sortedData?.map(staff =>{
                    staff.id = staff._id
                    staff.sn = count++
                    return staff
                })
                return staffsAdapter.setAll(initialState, loadedStaffs)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Staff', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Staff', id }))
                    ]
                }else return [{ type: 'Staffs', id: 'LIST'}]
            },
        }),
        addNewStaff: builder.mutation({
            query: initialStaffData =>({
                url: '/staffs',
                method: 'POST', 
                body: {
                    ...initialStaffData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Staff', id: arg.id }
            ]
        }),
        updateStaff: builder.mutation({
            query: initialStaffData =>({
                url: '/staffs',
                method: 'PATCH', 
                body: {
                    ...initialStaffData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Staff', id: arg.id }
            ]
        }),
        deleteStaff: builder.mutation({
            query: ({ id }) =>({
                url: `/staffs/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Staff', id: arg.id }
            ]
        }),
        deleteStaffs: builder.mutation({
            query: () =>({
                url: '/staffs',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Staff', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetStaffsQuery,
    useAddNewStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
    useDeleteStaffsMutation
} = staffsApiSlice

//returns the query result object
export const selectStaffResult= apiSlice.endpoints.getStaffs.select()

//creates memoized selector
const selectStaffData = createSelector(
    selectStaffResult, 
    staffsResult => staffsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStaffs,
    selectById: selectStaffById,
    selectIds: selectStaffIds,
    //pass in a selector that returns the staffs slice of state
} = staffsAdapter.getSelectors(state => selectStaffData(state) ?? initialState)