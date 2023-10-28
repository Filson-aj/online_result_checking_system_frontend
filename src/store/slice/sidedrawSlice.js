import { createSlice } from '@reduxjs/toolkit'

const sidedrawSlice = createSlice({
    name: 'sidedraw',
    initialState: { open: false },
    reducers: {
        setSidedraw: (state, action) =>{
            const { open } = action.payload
            state.open = open
        },
    }
})

export const { setSidedraw } = sidedrawSlice.actions

export default sidedrawSlice.reducer

export const selectCurrentSidedraw = state => state.sidedraw.open