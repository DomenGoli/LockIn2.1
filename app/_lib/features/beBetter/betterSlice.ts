import { createSlice } from "@reduxjs/toolkit";
//Types
type InitialStateType = {
    betterScore: number;
    deltaScore: number;
    lastDay: DayObjectType;
    lastDayChecked: Date 
};

type DayObjectType = {
    date: Date | string;
    actsArray: ActivityType[];
    id: string;
    note: string;
    plan: string;
    rating: string;
};

type ActivityType = {
    name: string;
    inputMode: "input" | "select";
    target: string;
    input: string;
    unit: string;
    id: string;
    overUnder: string;
    width: number;
    actState: string;
};

//// Loada data iz local storage
function loadLocalStoredData() {
    const storedScoreValue = localStorage.getItem("betterScore");
    return storedScoreValue ? JSON.parse(storedScoreValue) : 10;
}
function loadDateReference() {
    const storedDateReference = localStorage.getItem("lastDayChecked")
    return storedDateReference ? JSON.parse(storedDateReference) : "1970, 1, 1"
}


//Initial State
const initialState: InitialStateType = {
    betterScore: loadLocalStoredData(),
    deltaScore: 0,
    lastDay: {
        date: "1970, 1, 1",
        actsArray: [],
        id: "",
        note: "",
        plan: "",
        rating: "",
    },
    lastDayChecked: new Date(loadDateReference())
};

//Reducer

const betterSlice = createSlice({
    name: "better",
    initialState,
    reducers: {
        updateBetterScore(state, action) {
            state.betterScore = state.betterScore + action.payload;
            state.deltaScore = action.payload;
            localStorage.setItem("betterScore", JSON.stringify(state.betterScore));
        },
        saveLastDay(state, action) {
            state.lastDay = action.payload;
        },
        resetScore(state){
            state.betterScore = 10
            state.deltaScore = 0
            localStorage.setItem("betterScore", JSON.stringify(10))
        },
        saveLastDateReference(state, action){
            state.lastDayChecked = action.payload
            localStorage.setItem("lastDayChecked", JSON.stringify(action.payload))
        }
    },
});

//Exports
export default betterSlice.reducer;
export const { updateBetterScore, saveLastDay, resetScore, saveLastDateReference } =
    betterSlice.actions;
