import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    isNoteOpen: boolean;
    isPlanOpen: boolean;
    note: string;
    dayId: string;
    date: Date | undefined;
    plan: string;
};

const initialState: initialStateType = {
    isNoteOpen: false,
    isPlanOpen: false,
    note: "",
    dayId: "",
    date: undefined,
    plan: ""
};

type DiaryItemType = {
    note: string;
    planData: string;
    dayId: string;
    date?: Date;
}

type NoteItemType = {
    dayId: string;
    date?: Date;
    text: string
}

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {
        toggleOpenDiary: {
            prepare(note: string, planData: string, dayId: string, date?: Date) {
                return { payload: { note, planData, dayId, date } };
            },
            reducer(state, action: PayloadAction<DiaryItemType>) {
                state.note = action.payload.note;
                if (state.isNoteOpen === false) {
                    state.isNoteOpen = true;
                    state.dayId = action.payload.dayId;
                    state.note = action.payload.note;
                    state.plan = action.payload.planData;
                    if(action.payload.date) state.date = action.payload.date;
                } else if (state.dayId === action.payload.dayId) {
                    state.isNoteOpen = false;
                    state.dayId = "";
                    state.note = "";
                    state.date = undefined;
                } else {
                    state.note = action.payload.note;
                    state.plan = action.payload.planData
                    state.dayId = action.payload.dayId;
                    if(action.payload.date) state.date = action.payload.date;
                }
            },
        },
        toggleOpenPlan: {
            prepare(text: string, dayId: string, date?: Date) {
                return { payload: { text, dayId, date } };
            },
            reducer(state, action: PayloadAction<NoteItemType>) {
                if(state.isPlanOpen === false) {
                    state.isPlanOpen = true
                    state.plan = action.payload.text
                }else{
                    state.isPlanOpen = false
                    state.plan = ""
                }
            }
        },
        closeDiary(state) {
            state.isNoteOpen = false
        }
    },
});

export default diarySlice.reducer;
export const { toggleOpenDiary, toggleOpenPlan, closeDiary } = diarySlice.actions;
