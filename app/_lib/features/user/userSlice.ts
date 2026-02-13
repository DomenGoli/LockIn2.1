"use client"
import { createSlice } from "@reduxjs/toolkit";

// types
type InitialStateType = {
    name: string;
    daysCollection: string;
}


// initial state
const initialState: InitialStateType = {
    name: "",
    daysCollection: "",
}

// reducer
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDaysCollection(state, action) {
            state.daysCollection = action.payload
        }
    }
})


// export
export default userSlice.reducer
export const {setDaysCollection} = userSlice.actions