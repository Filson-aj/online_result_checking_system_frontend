import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const scoresAdapter = createEntityAdapter({})

const initialState = scoresAdapter.getInitialState()

export const scoresApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getScores: builder.query({
            query: () =>({ 
                url: '/scores',
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
                const loadedScores = sortedData?.map(score =>{
                    score.id = score._id
                    score.sn = count++
                    return score
                })
                return scoresAdapter.setAll(initialState, loadedScores)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Score', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Score', id }))
                    ]
                }else return [{ type: 'Scores', id: 'LIST'}]
            },
        }),
        addNewScore: builder.mutation({
            query: initialScoreData =>({
                url: '/scores',
                method: 'POST', 
                body: {
                    ...initialScoreData,
                }
            }),
            invalidatesTags:  [
                { type: 'Score', id: 'LIST' }
            ]
        }),
        updateScore: builder.mutation({
            query: initialScoreData =>({
                url: '/scores',
                method: 'PATCH', 
                body: {
                    ...initialScoreData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Score', id: arg.id }
            ]
        }),
        deleteScore: builder.mutation({
            query: ({ id }) =>({
                url: `/scores/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Score', id: arg.id }
            ]
        }),
        deleteScores: builder.mutation({
            query: () =>({
                url: '/scores',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Score', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetScoresQuery,
    useAddNewScoreMutation,
    useUpdateScoreMutation,
    useDeleteScoreMutation,
    useDeleteScoresMutation
} = scoresApiSlice

//returns the query result object
export const selectScoreResult= apiSlice.endpoints.getScores.select()

//creates memoized selector
const selectScoreData = createSelector(
    selectScoreResult, 
    scoresResult => scoresResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllScores,
    selectById: selectScoreById,
    selectIds: selectScoreIds,
    //pass in a selector that returns the scores slice of state
} = scoresAdapter.getSelectors(state => selectScoreData(state) ?? initialState)