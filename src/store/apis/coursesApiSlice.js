import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const coursesAdapter = createEntityAdapter({})

const initialState = coursesAdapter.getInitialState()

export const coursesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getCourses: builder.query({
            query: () =>({ 
                url: '/courses',
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
                const loadedCourses = sortedData?.map(course =>{
                    course.id = course._id
                    course.sn = count++
                    return course
                })
                return coursesAdapter.setAll(initialState, loadedCourses)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Course', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Course', id }))
                    ]
                }else return [{ type: 'Courses', id: 'LIST'}]
            },
        }),
        addNewCourse: builder.mutation({
            query: initialCourseData =>({
                url: '/courses',
                method: 'POST', 
                body: {
                    ...initialCourseData,
                }
            }),
            invalidatesTags:  [
                { type: 'Course', id: 'LIST' }
            ]
        }),
        updateCourse: builder.mutation({
            query: initialCourseData =>({
                url: '/courses',
                method: 'PATCH', 
                body: {
                    ...initialCourseData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Course', id: arg.id }
            ]
        }),
        deleteCourse: builder.mutation({
            query: ({ id }) =>({
                url: `/courses/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Course', id: arg.id }
            ]
        }),
        deleteCourses: builder.mutation({
            query: () =>({
                url: '/courses',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Course', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCoursesQuery,
    useAddNewCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useDeleteCoursesMutation
} = coursesApiSlice

//returns the query result object
export const selectCourseResult= apiSlice.endpoints.getCourses.select()

//creates memoized selector
const selectCourseData = createSelector(
    selectCourseResult, 
    coursesResult => coursesResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCourses,
    selectById: selectCourseById,
    selectIds: selectCourseIds,
    //pass in a selector that returns the courses slice of state
} = coursesAdapter.getSelectors(state => selectCourseData(state) ?? initialState)