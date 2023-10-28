import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const studentsAdapter = createEntityAdapter({})

const initialState = studentsAdapter.getInitialState()

export const studentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getStudents: builder.query({
            query: () =>({ 
                url: '/students',
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

                let count = 0
                const loadedStudents = sortedData?.map(student =>{
                    student.id = student._id
                    student.sn = count++
                    return student
                })
                return studentsAdapter.setAll(initialState, loadedStudents)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Student', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Student', id }))
                    ]
                }else return [{ type: 'Students', id: 'LIST'}]
            },
        }),
        addNewStudent: builder.mutation({
            query: initialStudentData =>({
                url: '/students',
                method: 'POST', 
                body: {
                    ...initialStudentData,
                }
            }),
            invalidatesTags:  [
                { type: 'Student', id: 'LIST' }
            ]
        }),
        updateStudent: builder.mutation({
            query: initialStudentData =>({
                url: '/students',
                method: 'PATCH', 
                body: {
                    ...initialStudentData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Student', id: arg.id }
            ]
        }),
        deleteStudent: builder.mutation({
            query: ({ id }) =>({
                url: `/students/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Student', id: arg.id }
            ]
        }),
        deleteStudents: builder.mutation({
            query: () =>({
                url: '/students',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Student', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetStudentsQuery,
    useAddNewStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useDeleteStudentsMutation
} = studentsApiSlice

//returns the query result object
export const selectStudentResult= apiSlice.endpoints.getStudents.select()

//creates memoized selector
const selectStudentData = createSelector(
    selectStudentResult, 
    studentsResult => studentsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectIds: selectStudentIds,
    //pass in a selector that returns the students slice of state
} = studentsAdapter.getSelectors(state => selectStudentData(state) ?? initialState)