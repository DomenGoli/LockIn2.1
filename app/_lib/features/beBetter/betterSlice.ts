"use client"

import { createSlice } from "@reduxjs/toolkit";
//Types
type InitialStateType = {
    betterScore: number;
    deltaScore: number;
    lastDay: DayObjectType;
    lastDailyCheck: Date;
    betterScoreSC: number;
    // resetDate: Date 
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
    if(typeof window !== "undefined") {

        const storedScoreValue = localStorage.getItem("resetDate");
        return storedScoreValue ? JSON.parse(storedScoreValue) : "1970, 0, 1";
    }
    else return "1970, 0, 1"
}
function loadLastDailyCheckFromLocalStorage() {
    if(typeof window !== "undefined") {

        const storedDateReference = localStorage?.getItem("lastDailyCheck")
        return storedDateReference ? JSON.parse(storedDateReference) : ""
    }
    else return ""
}


//Initial State
const initialState: InitialStateType = {
    betterScore: loadLocalStoredData(),
    betterScoreSC: 0,
    deltaScore: 0,
    lastDay: {
        date: "",
        actsArray: [],
        id: "",
        note: "",
        plan: "",
        rating: "",
    },
    lastDailyCheck: new Date(loadLastDailyCheckFromLocalStorage()),
    // resetDate: loadLocalStoredData()
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
        // resetScore(state, action){
        //     state.betterScoreSC = 10
        //     state.deltaScore = 0
        //     state.resetDate = action.payload
        //     localStorage.setItem("resetDate", JSON.stringify(action.payload))
        // },
        saveLastDailyCheckTime(state, action){
            state.lastDailyCheck = action.payload
            localStorage.setItem("lastDailyCheck", JSON.stringify(action.payload))
        },
        // saveBetterScore(state, action) {
        //     state.betterScoreSC = action.payload
        // }
    },
});

//Exports
export default betterSlice.reducer;
export const { updateBetterScore, saveLastDay, saveLastDailyCheckTime } =
    betterSlice.actions;
