import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const resultsAdapter = createEntityAdapter({})

const initialState = resultsAdapter.getInitialState()

export const resultsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getResults: builder.query({
            query: () =>({ 
                url: '/results',
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
                const loadedResults = sortedData?.map(result =>{
                    result.id = result._id
                    result.sn = count++
                    return result
                })
                return resultsAdapter.setAll(initialState, loadedResults)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Result', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Result', id }))
                    ]
                }else return [{ type: 'Results', id: 'LIST'}]
            },
        }),
        addNewResult: builder.mutation({
            query: initialResultData =>({
                url: '/results',
                method: 'POST', 
                body: {
                    ...initialResultData,
                }
            }),
            invalidatesTags:  [
                { type: 'Result', id: 'LIST' }
            ]
        }),
        updateResult: builder.mutation({
            query: initialResultData =>({
                url: '/results',
                method: 'PATCH', 
                body: {
                    ...initialResultData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Result', id: arg.id }
            ]
        }),
        deleteResult: builder.mutation({
            query: ({ id }) =>({
                url: `/results/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Result', id: arg.id }
            ]
        }),
        deleteResults: builder.mutation({
            query: () =>({
                url: '/results',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Result', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetResultsQuery,
    useAddNewResultMutation,
    useUpdateResultMutation,
    useDeleteResultMutation,
    useDeleteResultsMutation
} = resultsApiSlice

//returns the query result object
export const selectResultResult= apiSlice.endpoints.getResults.select()

//creates memoized selector
const selectResultData = createSelector(
    selectResultResult, 
    resultsResult => resultsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllResults,
    selectById: selectResultById,
    selectIds: selectResultIds,
    //pass in a selector that returns the results slice of state
} = resultsAdapter.getSelectors(state => selectResultData(state) ?? initialState)