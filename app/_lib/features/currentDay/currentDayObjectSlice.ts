"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet()

///////////////////////// TYPES /////////////////////////////////////////////
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
    betterPriority?: string;
    comment?: string;
    // curStreak: number;
    // longestCompletedStreak: number;
    // longestUntouchedStreak: number;
};

type InitialStateType = {
    date: string;
    actsArray: ActivityType[];
    note: string;
    plan: string;
    deltaScore?: number;
    actsStateHashMap: Map<any, any> | null;
};

type InputsType = {
    name: string;
    input: string;
    width: number;
    actState: string;
};
////////////////////////////////////////////////////////////////////////////

//// Loada data iz local storage
function loadLocalStoredData() {
    if(typeof window !== "undefined") {
        const storedValue = window?.localStorage?.getItem("currentDayObject");
        return storedValue ? JSON.parse(storedValue) : {};
        
    }
    else return {}
}

///////////////////////// Reducer //////////////////////////////////////////
const today = new Date();

const initialState: InitialStateType = {
    date: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
    actsArray: loadLocalStoredData().actsArray || [],
    note: loadLocalStoredData().note || "",
    plan: loadLocalStoredData().plan || "",
    actsStateHashMap: null,
};
const dayObjectSlice = createSlice({
    name: "dayObject",
    initialState,
    reducers: {
        addActivity(state, action) {
            state.actsArray.push(action.payload);
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({ ...state }));
            }
        },
        deleteActivity(state, action) {
            state.actsArray = state.actsArray.filter(
                (activity) => activity.id !== action.payload
            );
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({ ...state }));
            }
        },
        updateActivity(state, action) {
            state.actsArray.map(act => {
                if(act.id === action.payload.id) {
                    act.name = action.payload.name;
                    act.inputMode = action.payload.inputMode
                    act.target = action.payload.target
                    act.unit = action.payload.unit
                    act.overUnder = action.payload.overUnder
                    act.betterPriority = action.payload.betterPriority
                    act.comment = action.payload.comment
                }
            });
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({ ...state }));
            }
        },

        saveInputLocalStorage: {
            prepare(name, input, width, actState) {
                return { payload: { name, input, width, actState } };
            },
            reducer(state, action: PayloadAction<InputsType>) {
                state.actsArray.map((activity) => {
                    if (activity.name === action.payload.name) {
                        activity.input = action.payload.input;
                        activity.width = action.payload.width;
                        activity.actState = action.payload.actState;
                    }
                });
                if(typeof window !== "undefined") {
                    localStorage.setItem("currentDayObject", JSON.stringify({ ...state }));
            }
            },
        },
        saveDay(state) {
            state.actsArray.map((act) => {
                act.input = act.inputMode === "input" ? "0" : "Ne";
                act.actState = ""
            });
            state.note = ""
            state.plan = ""
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({ ...state }));
            }
        },
        deleteDay(state) {
            return state;
        },
        saveNoteToLocalStorage(state, action){
            state.note = action.payload
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({...state}))
            }
        },
        savePlanToLocalStorage(state, action) {
            state.plan = action.payload
            if(typeof window !== "undefined") {
                localStorage.setItem("currentDayObject", JSON.stringify({...state}))
            }
        },
        saveActsStateHashMap(state, action) {
            state.actsStateHashMap = action.payload
        },
        // updateStreak(state) {
        //     state.actsArray.map(activity => {
        //         if(activity.actState === "completed") {
        //             if(!activity.curStreak) activity.curStreak = 1;
        //             else activity.curStreak ++;
        //         }
        //         else if(activity.actState === "untouched") activity.curStreak = 0;
        //     })
        //     localStorage.setItem("currentDayObject", JSON.stringify({...state}))
        // }
    },
});



export default dayObjectSlice.reducer;
export const {saveDay, addActivity, deleteActivity, saveInputLocalStorage, updateActivity, saveNoteToLocalStorage, savePlanToLocalStorage, saveActsStateHashMap } =
    dayObjectSlice.actions;

