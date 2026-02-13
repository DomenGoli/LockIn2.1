import { createSlice } from "@reduxjs/toolkit";


const STARTING_SCORE = 10
// Type
type InitialStateType = {
    resetDate: number;
    betterScoreNew: number;
}


function loadLocalStoredDataResetDate() {
    if(typeof window !== "undefined") {

        const storedScoreValue = localStorage.getItem("resetDate");
        return storedScoreValue ? JSON.parse(storedScoreValue) : 2674800000;
    }
    else return 2674800000
}

// Initial State
const initialState: InitialStateType = {
    resetDate: loadLocalStoredDataResetDate(),
    betterScoreNew: 0,
}

// Reducer
const resetBetterSlice = createSlice({
    name: "resetBetter",
    initialState,
    reducers: {
        resetScore(state, action) {
            state.resetDate = action.payload
            localStorage.setItem("resetDate", JSON.stringify(action.payload))
        },
        saveBetterScore(state, action) {
            state.betterScoreNew = action.payload + STARTING_SCORE
        }
    }
})

// Exports
export default resetBetterSlice.reducer;
export const {saveBetterScore, resetScore} = resetBetterSlice.actions